
const path = require('path')
const express = require('express')
const dotenv = require ('dotenv')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const { connectDB }= require('./config/db')


//load config 
dotenv.config({ path: './config/config.env'});

// Passpot config
require('./config/passport')(passport);

connectDB();

const app = express();


  // app.use(express.json());

//logging
  if(process.NODE_ENV === 'development'){
    app.use(morgan('dev'))
  }
//Handlebars 
app.engine('.hbs', exphbs({defaultLayout : 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes 
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


const PORT =  process.env.PORT || 5000;

app.listen(
    PORT,
     console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
     )
