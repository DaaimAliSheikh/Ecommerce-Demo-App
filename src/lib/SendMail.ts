import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

const SendMail = (email: string, token: string) => {
  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: email,
    subject: "DealDeck Email Verification",
    html: `Welcome to DealDeck! Click <a href="${
      process.env.EMAIL_VERIFICATION_URL + "?token=" + token
    }">here</a> to verify your email and begin shopping.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

export default SendMail;
