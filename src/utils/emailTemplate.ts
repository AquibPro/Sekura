interface EmailTemplateProps {
  firstName: string;
  lastName: string;
}

export const EmailTemplate = ({ firstName, lastName }: EmailTemplateProps): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contributing to Sekura</title>
  <style>
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 20px !important;
      }
      .logo {
        width: 80px !important;
        height: 80px !important;
      }
      .header {
        font-size: 24px !important;
      }
      .content {
        font-size: 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f5">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="padding: 40px;">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_2kkCFZ-eIjABcSfu94wiu-gSoz4QJynk_iJCfoNSV2nJCwS1KK6YcOOTDzGkz8YxJ-2e7Tmkj6nDLgTaR4in4sF5wxQhET7ahMk8Ox_-pS8wgW_ikj8DuV0eAbza3ZhRAdJZ0Ybld3uLjl0tHeWPiRjPtaV75GPNkG95MHJZ7EqnTAj4AxcW4Lf31k74/s499/sekura.png" 
                alt="Sekura Logo" 
                class="logo"
                width="100" 
                height="100" 
                style="border-radius: 50%;"
              >
              <h1 class="header" style="color: #27b4d0; font-size: 28px; margin: 20px 0;">Thank You for Contributing!</h1>
              <p class="content" style="color: #4b5563; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                Dear ${firstName} ${lastName},
              </p>
              <p class="content" style="color: #4b5563; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for contributing to Sekura! We've received your submission and are reviewing it. Your support helps us build a more secure and transparent digital finance ecosystem.
              </p>
              <p class="content" style="color: #4b5563; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                We'll process your contribution and update you on the next steps. In the meantime, stay connected with us:
              </p>
              <table border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                <tr>
                  <td>
                    <a href="https://twitter.com/sekurachain" style="background-color: #27b4d0; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 10px;">Follow us on Twitter</a>
                  </td>
                  <td>
                    <a href="https://t.me/sekurachain" style="background-color: #27b4d0; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 10px;">Join Telegram</a>
                  </td>
                </tr>
              </table>
              <p class="content" style="color: #4b5563; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                If you have any questions, feel free to reach out to us at <a href="mailto:support@sekurachain.com" style="color: #27b4d0; text-decoration: none;">support@sekurachain.com</a>
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="color: #6b7280; font-size: 14px;">
                Best regards,<br>
                The Sekura Team
              </p>
            </td>
          </tr>
        </table>
        <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
          © ${new Date().getFullYear()} Sekura Chain. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;