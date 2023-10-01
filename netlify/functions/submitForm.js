// functions/submitForm.js
exports.handler = async (event) => {
  try {
    const formData = JSON.parse(event.body);
    // Process the form data, send emails, store data, etc.

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Form submission failed' }),
    };
  }
};
