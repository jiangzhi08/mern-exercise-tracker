const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise.model')


router.get('/', (req,res)=>{
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})


router.post('/add', (req,res)=>{
    const newExercise = new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)
    });

    newExercise.save()
    .then(() => res.json('exercise added'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/:id', (req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.delete('/:id', (req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/update/:id', (req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.duration = Number(req.body.duration)
        exercise.date = Date.parse(req.body.date)

        exercise.save()
        .then(() => res.json('exercise updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router