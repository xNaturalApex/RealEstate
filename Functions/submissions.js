// functions/submission.js
exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    // Your logic for email subscription goes here
    // Example: Save the email to a database

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription successful' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Subscription failed' }),
    };
  }
};
