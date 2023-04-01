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

  const dbUser = process.env.MOGODB_DB_USER;
  const dbPass = process.env.MONGODB_DB_PASS;
  let dbConn = process.env.MONGODB_DB_CONNECTION_STRING;

  dbConn = dbConn.replace('<username>', dbUser);
  dbConn = dbConn.replace('<password>', dbPass);

    const submission = JSON.parse(event.body);

    try {
  
      await mongoose.connect(dbConn);
  
      const GameStatistic = new mongoose.Model('GameStatistic', GameStatisticSchema);
      const stats = new GameStatistic(submission);

      if (event.httpMethod === 'POST') {
        
        await stats.save();
      
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
      }

      if (event.httpMethod === 'GET') {
        
        const leaderborad = await stats.find();
      
        return {
          statusCode: 200,
            body: JSON.stringify({
              status: 'success',
              statusCode: 200,
              data: {
                data: leaderborad,
                records: leaderborad.length,
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
