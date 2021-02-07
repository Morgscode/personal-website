const nodemailer = require("nodemailer");

exports.handler = (event, context, callback) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: "Morgan.luke94@gmail.com",
      pass: "MFS0vP12LHGcmKw5",
    },
  });

  console.log(transporter);
  console.log(event.body);

  /* send me some mails */
  transporter.sendMail(
    {
      from: "website@luke-morgan.com",
      to: "morgan.luke94@gmail.com",
      subject: "contact form submission from luke-morgan.com",
      text: event.body,
    },
    (error) => {
      if (error) {
        console.log(error);
        return {
          statusCode: 500,
          body: "fail",
        };
      } else {
        return {
          statusCode: 200,
          body: "Ok",
        };
      }
    }
  );
};
