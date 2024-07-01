import sendEmail from '../utils/emailUtil.js';

const sendEmailController = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    await sendEmail(to, subject, text, html);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Error sending email: ' + error.message);
  }
};

export { sendEmailController };