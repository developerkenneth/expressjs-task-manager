const mongoose = require("mongoose");

const connectDB = async (url) =>  {
    return mongoose.connect(url, {
        dbName: 'task_manager' ,
        serverSelectionTimeoutMS: 5000, // Fail fast (5s) instead of waiting 30s
        socketTimeoutMS: 45000,
    }).catch((error) => console.error(error));
}


module.exports = connectDB;