const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    // Parse the form submission data from the event
    const { name, email } = JSON.parse(event.body);

    // Create a transporter for sending email (configure your email service's SMTP settings)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'felipefranco@naturalapex.com ',
        pass: 'csnf jtpi bxgh wtbj',
      },
    });

    // Create email message
    const mailOptions = {
      from: 'felipefranco@naturalapex.com',
      to: email,
      subject: `Thank you, ${name}, for your interest!`,
      text: 'Thank you for your interest in our service.',
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email not sent' }),
    };
  }
};
