var express = require('express');
var app = express();
var connectDB = require('./utility/connectDB');
var PORT = Number(process.env.PORT) || 3000;
var authentication = require('./router/auth/authentication');
var question = require('./router/question');
var errorHandler = require('./middleware/error');
var cors = require('cors');
require('dotenv').config();

console.log('Connecting DB...');
connectDB(process.env.MONGODB_URI);
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

app.use(express.json());
app.use('/api/authentication', authentication);
app.use('/api/question', question);
app.use(errorHandler);

app.listen(PORT, function () {
  console.log('Server is running on '.concat(PORT));
});
