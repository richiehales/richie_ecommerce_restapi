const productRouter = require('./routes/productRouter');

const express = require('express');
const app = express();
const port = 3000;

// Test server - http://localhost:3000/testing
app.get('/testing', (req, res) => {
  res.send('Testing Basic Route - Success');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.use('/product', productRouter);

