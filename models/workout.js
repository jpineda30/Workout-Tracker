const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
   day:{
      type:Date,
      default: Date.now
   },
   exercises:[{
  
      type: String,
      name: String,
     
      distance: Number,
      weight: Number,
      reps: Number,
      sets: Number,
      duration: Number,
    
 }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;