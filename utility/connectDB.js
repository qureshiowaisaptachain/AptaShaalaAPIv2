const mongoose = require('mongoose');

async function connectDB(URI) {
  try {
    await mongoose.connect(URI).then((res) => {
      console.log(`connected ${URI}`);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
