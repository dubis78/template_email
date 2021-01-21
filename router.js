const express = require('express');
const router = express.Router();
//require('dotenv').config({path:'/env'});
require('dotenv').config();
//nodemailer
const smtTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');


// const emailConfig= async()=> {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
// });


let transporter=nodemailer.createTransport(smtTransport({
 
  service:process.env.EMAIL_SERVICE,
  host:process.env.EMAIL_HOST,
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
}));


router.post('/send-form',(req,res)=>{    
  let {to,fullName}=req.body;
  const mailOptions={
    from: 'Academia Geek',
    to,
    subject:`Mensaje de prueba ${fullName}`,
    text:`Hola ${fullName}`,
    html:`<!DOCTYPE html PUBLIC>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invitation Email</title>
    
      <style type="text/css">
    
      img {
        max-width: 600px;
        outline: none;
        text-decoration: none;
      }
    
      a {
        text-decoration: none;
        border: 0;
        outline: none;
        color: #bbbbbb;
      }
    
      a img {
        border: none;
      }
    
      /* General styling */
    
      td, h1, h2, h3  {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 400;
      }
    
      td {
        text-align: center;
      }
    
      body {
        width: 100%;
        height: 100%;
        color: #37302d;
        background: #ffffff;
        font-size: 16px;
      }
    
      .headline {
        color: #ffffff;
        font-size: 36px;
      }
    
    
    
    
      </style>
    
      <style type="text/css" media="screen">
          @media screen {
             /*Desktop styles*/
            td, h1, h2, h3 {
              font-family: Helvetica, Arial, sans-serif !important;
            }
          }
      </style>
    
      <style type="text/css" media="only screen and (max-width: 480px)">
        /* Mobile styles */
        @media only screen and (max-width: 480px) {
    
          table[class="w320"] {
            width: 320px !important;
          }
    
    
        }
      </style>
    </head>
    <body class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
    <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%" >
      <tr>
        <td align="center" valign="top" bgcolor="#ffffff"  width="100%">
          <center>
            <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="600" class="w320">
              <tr>
                <td align="center" valign="top">
    
                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="100%" style="margin:0 auto;">
                      <tr>
                        <td style="font-size: 30px; text-align:center;">
                          <br>
                          ${fullName}
                          <br>
                          <br>
                        </td>
                      </tr>
                    </table>
    
                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="100%" bgcolor="#4dbfbf">
                      <tr>
                        <td>
                        <br>
                          <img src="https://www.filepicker.io/api/file/XXpJ4RwWQqlVoWN8psfj" width="224" height="240" alt="robot picture">
                        </td>
                      </tr>
                      <tr>
                        <td class="headline">
                          Come check it out!
                        </td>
                      </tr>
                      <tr>
                        <td>
    
                          <center>
                            <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="60%">
                              <tr>
                                <td style="color:#187272;">
                                <br>
                                You won't believe what you're missing!
                                <br>
                                <br>
                                <br>
                                </td>
                              </tr>
                            </table>
                          </center>
    
                        </td>
                      </tr>
                    </table>
    
                    <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f5774e">
                      <tr>
                        <td style="color:#933f24; font-size:12px;">
                        <br>
                        <br>
                          <img src="https://www.filepicker.io/api/file/9pNfCnQNm0Km3UK44WhA" width="110" height="110" alt="profile pic"><br><br>
                          User:<a style="color:#ffffff;" href="#">John Doe</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
    
                          <center>
                            <table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="60%">
                              <tr>
                                <td style="color:#933f24;">
                                <br>
                                  I set up an Awesome Inc profile where I can do tons of really awesome stuff! I want you to follow me so we can keep in touch. <br><br>
                                  Because I've invited you, you can now receive<span style="color:#77260c; font-weight:bold;"> 20% off </span>when you sign up!
                                  <br><br>
                                  </td>
                                </tr>
    
                            </table>
                          </center>
    
                        </td>
                      </tr>
                      <tr>
                        <td>                     
                      </tr>
                    </table>
                </td>
              </tr>
            </table>
        </center>
        </td>
      </tr>
    </table>
    </body>
    </html>`
  }
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      console.log(error);
      res.send(`message: ${error}`);
    }
    else{
      console.log(`Sent: ${info.response}`);
      res.send(`mensaje enviado`);
    }
  });
});

router.get('/form', (req, res) =>{
  res.render('form', { title: 'template-PUG' });
});

router.post('/send',(req,res)=>{
  let {to,subject,message, full_name}=req.body;
  const mailOptions={
    from: 'Academia Geek',
    to,
    subject,
    text:message,
    html:{path:'./index.html'}
  }
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      console.log(error);
      res.send(`message: ${error}`);
    }
    else{
      console.log(`Sent: ${info.response}`);
      res.send(`mensaje enviado`);
    }
  });
});

module.exports=router;


