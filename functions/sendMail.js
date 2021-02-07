const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  // init our smtp handler
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_KEY,
    },
    logger: true,
  });

  console.log(transporter);

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
      console.log("Server is ready to take our messages");
    }
  });

  let emailMeta = JSON.parse(event.body);

  // let's build the html email template with the values passed from client
  let emailTemplate = `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>website@luke-morgan.com email</title>
  <meta name="description" content="the contact form email template">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    *,
    *::before,
    *::after {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    body {
      font: arial;
      color: #3a3a3a;
    }
  </style>
</head>
<body>
  <table style="width: 100%; background-color: #fff;" align="center">
    <table style="height: 50px;">
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table>
    <table style="width: 660px; background-color: #ebebeb; margin: 0 auto; border: 0;" align="center">
      <td>
        <table id="header" style="border: 0; width: 660px; height: 50px; background-color: #f1c40f">
          <th>
            <h1 style="font-size:22px; font-weight: 300; font-family: Arial, Helvetica, sans-serif">Contact Form
              Submission from
              luke-morgan.com</h1>
          </th>
        </table>
        <table style="width: 660px">
          <td v-align="top">
            <tr style="height: 50px;">
              <td style="width: 30px">&nbsp;</td>
              <td style="width: 600px; font-family: Arial, Helvetica, sans-serif">From: ${emailMeta.from_name}</td>
              <td style="width: 30px">&nbsp;</td>
            </tr>
            <tr style="height: 50px;">
              <td style="width: 30px">&nbsp;</td>
              <td style="width: 600px; font-family: Arial, Helvetica, sans-serif"">Message: ${emailMeta.message_html}</td>
              <td style=" width: 30px">&nbsp;</td>
            </tr>
            <tr style="height: 50px;">
              <td style="width: 30px">&nbsp;</td>
              <td style="width: 600px; font-family: Arial, Helvetica, sans-serif">Reply to: <a href=" mailto:${emailMeta.from_email}">
                ${emailMeta.from_email}</a></td>
              <td style="width: 30px">&nbsp;</td>
            </tr>
          </td>
        </table>
      </td>
    </table>
  </table>
</body>
</html>
`;

  /* send me some mails */
  transporter
    .sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.EMAIL_TARGET,
      subject: "contact form submission from luke-morgan.com",
      text: emailTemplate,
    })
    .then((res) => {
      console.log(res);
      return {
        status: "ok",
        statusCode: 200,
        body: JSON.stringify({ message: "Contact form submission sent!" }),
      };
    })
    .catch((err) => {
      console.log(error);
      return {
        status: "fail",
        statusCode: 500,
        body: JSON.stringify({
          meaasge: "There was a problem sending the contact form submission",
        }),
      };
    });
};
