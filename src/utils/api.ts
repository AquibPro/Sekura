// API rate limit configuration
const API_CONFIG = {
  retries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
  timeout: 30000, // 30 seconds timeout
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  config = API_CONFIG
): Promise<Response> {
  let lastError: any;
  let delay = config.baseDelay;

  for (let i = 0; i < config.retries; i++) {
    try {
      // Add random delay before each request to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          ...options.headers,
        }
      });

      clearTimeout(timeoutId);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.min(delay * config.backoffFactor, config.maxDelay);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error: any) {
      lastError = error;
      
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      
      if (i < config.retries - 1) {
        delay = Math.min(delay * config.backoffFactor, config.maxDelay);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Failed to fetch data after multiple retries');
}

// Queue for managing API requests
class RequestQueue {
  private queue: (() => Promise<void>)[] = [];
  private processing = false;
  private interval = 1500; // 1.5 seconds between requests
  private maxRetries = 3;

  async add<T>(request: () => Promise<T>, priority = false): Promise<T> {
    return new Promise((resolve, reject) => {
      const queueItem = async () => {
        let retries = 0;
        while (retries < this.maxRetries) {
          try {
            const result = await request();
            resolve(result);
            return;
          } catch (error) {
            retries++;
            if (retries === this.maxRetries) {
              reject(error);
              return;
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * retries));
          }
        }
      };

      if (priority) {
        this.queue.unshift(queueItem);
      } else {
        this.queue.push(queueItem);
      }

      if (!this.processing) {
        this.process();
      }
    });
  }

  private async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const request = this.queue.shift();

    if (request) {
      try {
        await request();
      } catch (error) {
        console.error('Queue processing error:', error);
      }
      await new Promise(resolve => setTimeout(resolve, this.interval));
      this.process();
    }
  }
}

export const requestQueue = new RequestQueue();