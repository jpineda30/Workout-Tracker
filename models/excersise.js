const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const excersiseSchema = new Schema(
    [{
  
  	type: String,
    name: String,
    duration: Number,
	distance: Number,
    weight: Number,
    reps: Number,
    sets: Number,
   
}]
);

const Excersise = mongoose.model("Excersise", excersiseSchema);

module.exports = Excersise;