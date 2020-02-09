const router = require('express').Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');

const Post = require('../models/post');


router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/servicios', (req, res, next) => {
  res.render('servicios');
});

router.post('/add', async (req, res) => {
  const task = new Post(req.body);
  await task.save();
  res.redirect('/blogbackend/1');
});



router.get('/blog', async (req, res) => {
  const post = await Post
  .find()
  .sort({ timestamp: -1 });
  res.render('blog/1', {
    post
  });
});



router.get('/blog/:page',   async (req, res) => {
  let perPage = 9;
  let page = req.params.page || 1;

  Post
    .find({}) // finding all documents
    .sort({ timestamp: -1 })
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .exec((err, post) => {
      Post.countDocuments((err, count) => { // count to calculate the number of pages
        if (err) return next(err);
        res.render('blog', {
          post,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});




router.get('/blogbackend/:page',   async (req, res) => {
  let perPage = 9;
  let page = req.params.page || 1;

  Post
    .find({}) // finding all documents
    .sort({ timestamp: -1 })
    .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .exec((err, post) => {
      Post.countDocuments((err, count) => { // count to calculate the number of pages
        if (err) return next(err);
        res.render('blogbackend', {
          post,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});






router.get('/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  await Post.remove({_id: id});
  res.redirect('/blogbackend/1');
});



router.get('/contacto', async (req, res) => {

  res.render('contacto');
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
     pass: 'terremototo001'
     
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
   res.redirect('/index.html');
});


module.exports = router;


