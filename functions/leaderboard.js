const mongoose = require('mongoose');

const GameStatisticSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 12,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
});

exports.handler = async (event, context) => {

  const dbUser = process.env.MONGODB_DB_USER;
  const dbPass = process.env.MONGODB_DB_PASS;
  let dbConn = process.env.MONGODB_CONNECTION_STRING;
   
  dbConn = dbConn.replace('<username>', dbUser);
  dbConn = dbConn.replace('<password>', dbPass);
  
  const GameStatistic = mongoose.model(
    'GameStatistic',
    GameStatisticSchema
  );

  try {

    await mongoose.connect(dbConn);
    
    if (event.httpMethod === 'GET') {
      const leaderboard = await GameStatistic.find().sort([['score', 'desc']]);

      return {
        statusCode: 200,
        body: JSON.stringify({
          status: 'success',
          statusCode: 200,
          data: {
            data: leaderboard,
          },
        }),
      };
    }

    if (event.httpMethod === 'POST') {
      const submission = JSON.parse(event.body);
      const stats = new GameStatistic(submission);
      await stats.save();

      return {
        statusCode: 201,
        body: JSON.stringify({
          status: 'success',
          statusCode: 201,
          data: {
            data: stats,
          },
        }),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Not Found',
      }),
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'There was a problem submitting your statistics',
      }),
    };
  }
};
