import notifyClient from '../gateways/govNotify';

async function sendConfirmationEmail(id, emailAddress) {
  try {
    await notifyClient.sendEmail(
      process.env.EMAIL_APPLICATION_RECEIVED_TEMPLATE_ID,
      emailAddress,
      {
        personalisation: {
          applicationId: id
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export default sendConfirmationEmail;
