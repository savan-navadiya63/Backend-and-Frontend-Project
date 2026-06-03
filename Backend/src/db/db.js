const mongoose = require('mongoose');

async function connectDB(){

  await mongoose.connect(process.env.MONGOOSE_URL);
  console.log("DB connected successfully");
  
}



module.exports = connectDB;