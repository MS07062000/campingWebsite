// import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const mailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.MAIL_USERNAME,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     accessToken: process.env.OAUTH_ACCESS_TOKEN,
//     expires: 3599
//   }
// });

function mailDetails (mailReciever, mailSubject, mailBody) {
  const mailDetails = {
    from: process.env.MAIL_USERNAME,
    to: mailReciever,
    subject: mailSubject,
    html: mailBody
  };
  return mailDetails;
}

async function sendMailToUser (mailDetails) {
  // mailTransporter.sendMail(mailDetails, (err, data) => {
  //   if (err) {
  //     console.log('Error Occurs');
  //   } else {
  //     console.log('Email sent successfully');
  //   }
  // });
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    const response = await sgMail.send(mailDetails);
    // console.log('Response : ' + response[0]);
    if (response[0].statusCode) {
      // console.log(response[0].statusCode);
      return { Response: response[0].statusCode };
    } else {
      // console.log(response[0]);
      return { Response: response[0] };
    }
  } catch (error) {
    // console.log('Error: ' + error);

    if (error.response) {
      // console.error(error.response.body);
      return { Error: error.response.body };
    } else {
      return { Error: error };
    }
  }
}

export async function sendLinkForEmailVerification (mailReciever, userName, validatingToken) {
  let linkForVerification;
  if (process.env.NODE_ENV === 'production') {
    linkForVerification = `/api/verify/${userName}/${validatingToken}`;
  } else {
    linkForVerification = `http://127.0.0.1:3000/api/verify/${userName}/${validatingToken}`;
  }

  const mailBody = composeEmail(userName, linkForVerification);
  const mailSubject = 'Confirm Your Account';
  const mailInformation = mailDetails(mailReciever, mailSubject, mailBody);
  const response = await sendMailToUser(mailInformation);
  return response;
}

function composeEmail (userName, link) {
  const filePath = path.join(__dirname, '../static/VerificationLinkMailDesign/verificationLinkMail.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = { user: userName, verificationLink: link };
  const HTMLTemplateForMail = template(replacements);
  return HTMLTemplateForMail;
}
