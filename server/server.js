const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

require('dotenv');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const siteRoutes = require('./routes/site');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/site', siteRoutes);

// DEFAULT 
if( process.env.NODE_ENV === 'production' ){
  const path = require('path');
  app.get('/*', (req, res, next) => {
      res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data })
})

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(result => {
    console.log(`Connected to ${process.env.MONGODB_URI}`);
    app.listen(process.env.PORT || 3002, () => console.log(`Server listening ...`));
  })
  .catch(err => console.log(err));