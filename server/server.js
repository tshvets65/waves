const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(result => {
    app.listen(process.env.PORT || 3002, () => console.log(`Server listening ...`));
  })
  .catch(err => console.log(err));