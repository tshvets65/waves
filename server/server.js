const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data })
})

mongoose
  .connect(
    process.env.MONGODB
  )
  .then(result => {
    console.log(`Connected to ${process.env.MONGODB}`);
    app.listen(process.env.PORT || 3002, () => console.log(`Server listening ...`));
  })
  .catch(err => console.log(err));