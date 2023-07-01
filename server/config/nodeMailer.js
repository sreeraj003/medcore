const nodemailer = require("nodemailer");

async function mailSender(mail, data, operation) {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let details = {};
    if (operation == "signup") {
      details = {
        from: process.env.MAIL_ID,
        to: mail,
        subject: "Mail verification",
        text: `Your otp for verifying your medcore account is - ${data}`,
      };
    } else if (operation == "reject") {
      details = {
        from: process.env.MAIL_ID,
        to: mail,
        subject: "Request rejected",
        text: `Your doctor registraion request has been rejected by the admins. It is found that some of your data is missing or insufficient. Please contact admins for further details or you can apply again.`,
      };
    } else if (operation == "approve") {
      details = {
        from: process.env.MAIL_ID,
        to: mail,
        subject: "Request approved",
        text: `Congratulations.Your request for enrolling as doctor has been apporved. Now you can login to you account and can save thosands.Happy consulting`,
      };
    } else if (operation == "forgotPassword") {
      console.log(1)
      details = {
        from: process.env.MAIL_ID,
        to: mail,
        subject: "forgot password",
        text: `your otp for changing password is - ${data}.Please do not share your otp or password with anyone.`,
      };
    }

    const mails = mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("mail sent");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = mailSender;
