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
        db.Workout.find({},{ sort: { day: 1 }}).populate("exercises").then((response)=>{
          console.log("Working " + response); 
          res.json(response);
        });
      });

      app.post("/api/workouts",(req, res)=>{
        db.Workout.create(req.body).then((response)=>{
          res.send(response);
        }).catch((err)=>{res.json(err)});
      });

      app.put("/api/workouts/:id",(req, res)=>{

        let id= req.params.id;
       

        db.Excersise.create(req.body).then(({_id})=>{
        
          db.Workout.findOneAndUpdate(

              {_id:id},
              {$push:{exercises:_id}},
              {new:true}

            ).then((resp)=>{res.json(resp);})
        });

      });

      
      app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}, null, { sort: { day: 1 } })
          .populate("exercises")
          .then((response) => {
            
            res.json(response);
          })
          .catch((err) => {
            res.json(err);
          });
      });
    
     

};