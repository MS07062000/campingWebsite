import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
    expires: 3599
  }
});

export function mailDetails (mailReciever, mailSubject, mailBody) {
  const mailDetails = {
    from: process.env.MAIL_USERNAME,
    to: mailReciever,
    subject: mailSubject,
    html: mailBody
  };
  return mailDetails;
}

export function sendMailToUser (mailDetails) {
  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  });
}

export function sendLinkForEmailVerification (mailReciever, userName, validatingToken) {
  const linkForVerification = `http://127.0.0.1:3000/api/verify/${userName}/${validatingToken}`;
  const mailBody = composeEmail(userName, linkForVerification);
  const mailSubject = 'Confirm Your Account';
  const mailInformation = mailDetails(mailReciever, mailSubject, mailBody);
  sendMailToUser(mailInformation);
}

export function composeEmail (userName, link) {
  const filePath = path.join(__dirname, '../../static/VerificationLinkMailDesign/verificationLinkMail.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = { user: userName, verificationLink: link };
  const HTMLTemplateForMail = template(replacements);
  return HTMLTemplateForMail;
}
