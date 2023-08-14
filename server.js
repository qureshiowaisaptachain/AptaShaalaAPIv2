var express = require('express');
var app = express();
var connectDB = require('./utility/connectDB');
var PORT = Number(process.env.PORT) || 3000;
var authentication = require('./router/auth/authentication');
var errorHandler = require('./middleware/error');
const bodyParser = require('body-parser');
require('dotenv').config();

console.log('Connecting DB...');
connectDB(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use('/api/authentication', authentication);
app.use(errorHandler);

app.listen(PORT, function () {
  console.log('Server is running on '.concat(PORT));
});