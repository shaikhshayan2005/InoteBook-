const mongoose = require("mongoose"); // function used to import mongoose library
const mongoURI = "mongodb://localhost:27017/inotebook"; // this connection string and it is connected mongo compass

const connectToMongo = () => {
  return mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

// export the module to be connected with mongo in index js
module.exports = connectToMongo;
