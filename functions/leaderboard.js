const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  
  const dbUser = process.env.MOGODB_DB_USER;
  const dbPass = process.env.MONGODB_DB_PASS;
  const dbConn = process.env.MONGODB_DB_CONNECTION_STRING;

  const { name, score, level } = JSON.parse(event.body);

  try {
    return {
        statusCode: 200,
        body: JSON.stringify({
          status: 'success',
          statusCode: 200,
          data: {
            message: 'score submitted',
            stuff: event.body,
            conn: dbConn,
          },
        }),
      };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'There was a problem sending the contact form submission',
      }),
    };
  }
};
