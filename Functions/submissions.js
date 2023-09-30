// functions/submissions.js

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ error: 'Invalid HTTP method' }),
    };
  }

  try {
    const data = JSON.parse(event.body); // Parse form data

    // Process and handle the form data here
    // Replace this with your actual logic

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission successful' }),
    };
  } catch (error) {
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
