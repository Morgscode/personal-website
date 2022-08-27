exports.handler = async (event, context) => {
  try {
    if (!process.env.MEETING_APP_ID) {
      throw new Error();
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        statusCode: 200,
        data: {
          message: process.env.MEETING_APP_ID,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'success',
        statusCode: 500,
        data: {
          appId: 'There is no app id set right now',
        },
      }),
    };
  }
};
