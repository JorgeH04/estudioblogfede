if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  } 


const path = require('path');
const express = require('express');
const { format } = require('timeago.js');
const engine = require('ejs-mate');

const app = express();

//bbdd
//const { mongoose } = require('./database');
const { mongoose } = require('./database');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//middlewares
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'views')));



// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
    });

//importing routes
const indexRoutes = require('./routes/index');



//routes
app.use('/', indexRoutes);


// server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

