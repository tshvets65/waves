const mailer = require('nodemailer');
const { welcome } = require("./welcome_template");
const { purchase } = require("./purchase_template");
const { resetPass } = require("./resetpass_template");
require('dotenv').config();

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: `Waves <${process.env.EMAIL_SENDER}>`,
        to,
        subject: `${name}, welcome to Waves!`,
        html: welcome()
      }
      break;
    case "purchase":
      data = {
        from: `Waves <${process.env.EMAIL_SENDER}>`,
        to,
        subject: `${name}, thank you for shopping with us!`,
        html: purchase(actionData)
      }
      break;
    case "reset_password":
      data = {
        from: `Waves <${process.env.EMAIL_SENDER}>`,
        to,
        subject: `${name}, please reset your password`,
        html: resetPass(actionData)
      }
      break;
    default:
      data;
  }
  return data;
}


exports.sendEmail = (to, name, token, type, actionData = null) => {

  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type, actionData)

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      cb()
    }
    smtpTransport.close();
  })
}
