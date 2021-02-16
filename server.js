const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const path = require("path");

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });

/*const databaseUrl = "tracker";
const collections = ["workout","excercise"];

const db = mongojs(databaseUrl, collections);*/



require("./routes/routes.js")(app);



app.listen(3000, () => {
  console.log("App running on port 3000!");
});