if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const express = require('express');
const app = express();
const port = 3000;
const { getUserByEmail, getUserById } = require('./models/user');
const passport = require('passport')
const initializePassport = require('./routes/passport-config')
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');
const flash = require('express-flash')
const session = require('express-session')

initializePassport(
  passport,
  getUserByEmail,
  getUserById)


app.use(express.urlencoded({ extended: false }))


app.set('view-engine', 'ejs');

const logCredentialsMiddleware = (req, res, next) => {
  console.log('app.js Credentials:', req.body);
  next();
};


app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/login/auth/login', logCredentialsMiddleware, passport.authenticate('local', {
  successRedirect: '/login/auth',
  failureRedirect: '/login/auth/login',
  failureFlash: true
}))


// Test server - http://localhost:3000/testing
app.get('/testing', (req, res) => {
  res.send('Testing Basic Route - Success');
});


// Home - http://localhost:3000
app.get('/', (req, res) => {
  res.send('Ecommerce Portfolio Proect');
});


app.use(express.json());
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const loginRouter = require('./routes/loginRouter');
app.use('/login', loginRouter);


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});