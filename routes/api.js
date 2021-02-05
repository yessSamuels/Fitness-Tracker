const express = require("express")
const router = express.Router()
const Workout = require("../models/workout.js")

function getAllWorkouts(req, res) {
    Workout.find()
        .then(workouts => {
            res.json(workouts)
        })
        .catch(err => {
            res.json(err)
        })
}

function createWorkout(req, res){
    Workout.create({})
    .then(workouts => {
        res.json(workouts)
    })
    .catch(err => {
        res.json(err)
    })
}

router.route ("/api/workouts").get(getAllWorkouts).post(createWorkout)
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .sort({ _id: 1 })
        .limit(7)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            res.json(err)
        })
})
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id ,{ exercises: body}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
module.exports = router