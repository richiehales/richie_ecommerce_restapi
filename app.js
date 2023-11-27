const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');

const express = require('express');
const app = express();
const port = 3000;

app.set('view-engine', 'ejs');


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

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

