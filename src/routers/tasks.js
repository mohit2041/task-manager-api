const express = require("express")
const router = new express.Router()
const auth=require("../middleware/auth")
const Task = require("../models/task")

//get/tasks?completed=true
//get/tasks?limit=2&skip=2
router.get("/tasks",auth,async (req,res)=>{
    const match={}
    const sort={}
    if(req.query.completed){
        match.completed=req.query.completed==="true"
    }
    
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(":")
        sort[parts[0]]=parts[1]==="desc"?-1:1
    }
    try{
        // const tasks=await Task.find({owner:req.user.id})
        await req.user.populate({
            path:"tasks",
            match,
            sort,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(req.user.tasks)
        if(!tasks){
            return res.status(404).send()
        }

        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get("/tasks/:id",auth,async(req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findOne({_id,owner:req.user.id})
       
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.patch("/tasks/:id",auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isvalid = updates.every((update)=>allowedUpdates.includes(update))

    if(!isvalid){
        return res.status(400).send({error:"invalid updates"})
    }

    try{
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        // const task= await Task.findById(req.params.id)
        updates.forEach((update)=> task[update]=req.body[update])
        await task.save()
        
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete("/tasks/:id",auth,async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})
router.post("/tasks",auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router