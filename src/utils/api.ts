// API rate limit configuration
const API_CONFIG = {
  retries: 3,
  baseDelay: 2000,
  maxDelay: 10000,
  backoffFactor: 2,
  timeout: 30000,
  maxRequestsPerMinute: 30 // CoinGecko free tier limit
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Queue for managing API requests
class RequestQueue {
  private queue: (() => Promise<void>)[] = [];
  private processing = false;
  private interval = 2000;
  private maxRetries = 3;
  private requestCount = 0;
  private lastRequestTime = Date.now();

  private resetRequestCount() {
    const now = Date.now();
    if (now - this.lastRequestTime >= 60000) {
      this.requestCount = 0;
      this.lastRequestTime = now;
    }
  }

  async add<T>(request: () => Promise<T>, priority = false): Promise<T> {
    return new Promise((resolve, reject) => {
      const queueItem = async () => {
        this.resetRequestCount();

        if (this.requestCount >= API_CONFIG.maxRequestsPerMinute) {
          const waitTime = 60000 - (Date.now() - this.lastRequestTime);
          await sleep(waitTime);
          this.resetRequestCount();
        }

        let retries = 0;
        let delay = API_CONFIG.baseDelay;

        while (retries < this.maxRetries) {
          try {
            await sleep(Math.random() * 1000);
            const result = await request();
            this.requestCount++;
            this.lastRequestTime = Date.now();
            resolve(result);
            return;
          } catch (error) {
            retries++;
            if (retries === this.maxRetries) {
              reject(error);
              return;
            }
            delay = Math.min(delay * API_CONFIG.backoffFactor, API_CONFIG.maxDelay);
            await sleep(delay);
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
      await sleep(this.interval);
      this.process();
    }
  }
}

export const requestQueue = new RequestQueue();

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  config = API_CONFIG
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        ...options.headers,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}