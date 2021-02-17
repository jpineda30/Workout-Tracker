var path = require("path");
var db = require("./../models");



module.exports = function(app){

    
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "./public/index.html"));
      });

      app.get("/stats", (req, res) => {
        res.sendFile(path.resolve(__dirname + "/../public/stats.html"));
      });

      app.get("/exercise", (req, res) => {
        res.sendFile(path.resolve(__dirname + "/../public/exercise.html"));
      });


      app.get("/api/workouts-2", (req, res) => {
        console.log("Working so far");  
        db.Workout.find({}).then((response)=>{
          
          res.json(response);
        });
      });

      app.post("/api/workouts",(req, res)=>{
        db.Workout.create(req.body).then((response)=>{
          res.send(response);
        }).catch((err)=>{res.json(err)});
      });

      
      app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then((response) => {
            
            res.json(response);
          })
          .catch((err) => {
            res.json(err);
          });
      });

     

app.get("/api/workouts", (req, res) => {

   db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        

       
      }
    }
   ]).then((response)=>{
     res.json(response);
   });

});


app.put("/api/workouts/:id", (req, res) => {
  console.log("ID========= "+req.params.id+" body===== " + req.body.name);
  let obj = {};
  obj = req.body;
  db.Workout.findOneAndUpdate(
      {_id:req.params.id},

      { $push:{ exercises: obj}},

     
    ).then(response => {
      console.log("success");
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});
    
     

};