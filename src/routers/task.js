const express = require('express')
const Tasks = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res)=>{
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

// GET tasks by completed status, either true or false: /tasks?complete=true
// GET tasks for the mentioned limit: /tasks?limit=2&skip 2
// GET tasks by sorting: /tasks?sortBy=createAt_desc
router.get('/tasks', auth, async (req, res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth,async (req, res) =>{
    const _id = req.params.id

    try{
        const task = await Tasks.findOne({_id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidUpdate = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidUpdate){
        res.status(400).send('Error! Invalid Update option!')
    }

    try{
        const task = await Tasks.findOne({_id:req.params.id, owner: req.user._id})
        
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Tasks.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router