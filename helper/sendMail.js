import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "lakshyasrivastava1190@gmail.com",
    pass: "crzojfdyjpzzejep",
  },
});

// async..await is not allowed in global scope, must use a wrapper
 export async function sendMail(to,subject,text,html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"lakshyasrivastava1190@gmail.com', // sender address
    to , // list of receivers
    subject , // Subject line
    text, // plain text body
    html // html body
  })
};
