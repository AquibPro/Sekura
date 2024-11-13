import { EmailTemplate } from './emailTemplate';

interface SendEmailProps {
  to: string;
  firstName: string;
  lastName: string;
}

export const sendThankYouEmail = async ({ to, firstName, lastName }: SendEmailProps): Promise<void> => {
  try {
    const response = await fetch('https://api.airtable.com/v0/apptO4ASdOdkeNRSP/Emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer patSBZWwd6EZ2K5fy.b8a8d699646b4d5260484d1626d56706f8014b86e557a2bf5ca21c90f01ce8fb',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              To: to,
              From: 'support@sekurachain.com',
              Subject: 'Thank You for Contributing to Sekura',
              HTML: EmailTemplate({ firstName, lastName }),
              Status: 'Pending'
            }
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Email API error: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error('Error in sendThankYouEmail:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to send thank you email: ${error.message}`);
    } else {
      throw new Error('Failed to send thank you email: Unknown error');
    }
  }
};