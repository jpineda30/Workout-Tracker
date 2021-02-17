const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false 
  });





require("./routes/routes.js")(app);



app.listen(PORT, () => {
  console.log("App running on port 3000!");
});