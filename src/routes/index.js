const router = require('express').Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/email', async (req, res) => {
    const { name, email, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
           
        </ul>
        <p>${message}</p>
    `;



  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: 'lehj09@gmail.com',
     pass: 'terremototo111'
   }
   });
   
   
   let mailOptions = {
    from: 'lehj09@gmail.com',
    to: 'jhessle04@gmail.com',
    subject: 'email node',
    html: contentHTML
   
   };

   
   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
     console.log(error);
    }else{
     console.log('Email sent: ' + info.response);
    }
   });
});

module.exports = router;


