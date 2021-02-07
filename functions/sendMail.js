const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE_CONNECTION_TYPE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let emailMeta = JSON.parse(event.body);

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
              <td style="width: 600px; font-family: Arial, Helvetica, sans-serif">From: {% FROM_NAME %}</td>
              <td style="width: 30px">&nbsp;</td>
            </tr>
            <tr style="height: 50px;">
              <td style="width: 30px">&nbsp;</td>
              <td style="width: 600px; font-family: Arial, Helvetica, sans-serif"">Message: {% MESSAGE %}</td>
              <td style=" width: 30px">&nbsp;</td>
            </tr>
            <tr style="height: 50px;">
              <td style="width: 30px">&nbsp;</td>
              <td style="width: 600px; font-family: Arial, Helvetica, sans-serif"">Reply to: <a href=" mailto:{%
                REPLY_TO %}">{% REPLY_TO %}</a></td>
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

  emailTemplate = emailTemplate.replace(/{% FROM_NAME %}/, emailMeta.from_name);
  emailTemplate = emailTemplate.replace(/{% MESSAGE %/, emailMeta.message_html);
  emailTemplate = emailTemplate.replace(
    /{% REPLY_TO %}/g,
    emailMeta.from_email
  );

  console.log(emailMeta);

  /* send me some mails */
  transporter.sendMail(
    {
      from: process.env.MAIL_FROM,
      to: process.env.EMAIL_TARGET,
      subject: process.env.MAIL_SUBJECT,
      text: emailTemplate,
    },
    (error) => {
      if (error) {
        console.log(error);
        return {
          statusCode: 500,
          body: "fail",
          statusText: "There was a problem sending the contact form submission",
        };
      } else {
        let res = JSON.stringify({
          statusCode: 200,
          body: "Ok",
          statusText: "Contact form submission has been sent!",
        });
        return res;
      }
    }
  );
};
