import nodemailer from "nodemailer";

const sendingEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MAILTRAP_FROM,
    to: options.email,
    subject: options.subject,
    text: `${process.env.BASE_URL}/api/v1/users/${options.route}/${options.token}`,
  });

  console.log("Message sent:", info.messageId);
};

export default sendingEmail;

// const options = {
//   email,
//   subject,
//   route,
//   token,
// };