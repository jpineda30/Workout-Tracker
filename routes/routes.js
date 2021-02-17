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


      app.get("/api/workouts", (req, res) => {
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
        db.Workout.find({}, null, { sort: { day: 1 } })
            .then((response) => {
            
            res.json(response);
          })
          .catch((err) => {
            res.json(err);
          });
      });

     

app.get("/test", (req, res) => {

   db.Workout.aggregate([
    {
      $addFields: {
        total: { $sum: "$exercises._id" } 
       
      }
    }
   ]).then((response)=>{
     res.json(response);
   });

});


app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },

    { new: true}
  )
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});
    
     

};