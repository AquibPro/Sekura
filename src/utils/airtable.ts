import Airtable from 'airtable';
import { sendThankYouEmail } from './email';

const base = new Airtable({
  apiKey: 'patSBZWwd6EZ2K5fy.b8a8d699646b4d5260484d1626d56706f8014b86e557a2bf5ca21c90f01ce8fb'
}).base('apptO4ASdOdkeNRSP');

interface ContributionData {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  countryCode: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  walletAddress: string;
  transactionHash: string;
  screenshot?: string;
}

export const submitContribution = async (data: ContributionData): Promise<void> => {
  try {
    // Create contribution record
    const record = await base('Info').create([
      {
        fields: {
          'Name': `${data.firstName} ${data.lastName}`,
          'Email': data.email,
          'Phone': `${data.countryCode} ${data.phone}`,
          'Date of Birth': data.dob,
          'Full Address': `${data.address}, ${data.city}, ${data.state} ${data.zipcode}`,
          'Wallet Address': data.walletAddress,
          'Payment Proof': data.screenshot || '',
          'Transaction Hash': data.transactionHash,
          'Created At': new Date().toISOString()
        }
      }
    ]);

    if (!record || record.length === 0) {
      throw new Error('Failed to create contribution record');
    }

    // Send thank you email
    await sendThankYouEmail({
      to: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    });
  } catch (error) {
    console.error('Error in submitContribution:', error);
    if (error instanceof Error) {
      throw new Error(`Contribution submission failed: ${error.message}`);
    } else {
      throw new Error('Contribution submission failed: Unknown error');
    }
  }
};