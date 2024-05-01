const router = require('express').Router();
const mongoose = require('mongoose');
const {Thought, User} = require('../../models');

router.get('/', async (req, res) => {
    const thoughts = await Thought.find().catch((err) =>{
        res.json(err)
    });
    res.json(thoughts);
})

router.get('/:id', async (req, res) => {
    const thoughts = await Thought.findById(req.params.id).catch((err) =>{
        res.json(err)
    });
    res.json(thoughts);
})

router.post('/', async (req, res) => {
    try{
        const thought = await Thought.create(req.body);
        const user = await User.findByIdAndUpdate(req.body.userId, 
            {
                $set: {thoughts: thought._id}
            }, 
            {new: true}
        );

        if(!user){
            return res.status(404).json({
                message: "No user found. Thought still created"
            })
        }

        res.json(thought);
    }
    catch (err) {
        res.json(err);
    }
})

router.put('/:id', async (req, res) => {
    const thought = await Thought.findByIdAndUpdate(req.params.id, 
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username
        }, 
        {new: true})
        .catch((err) =>{
        res.json(err)
    });
    res.json(thought);
})

router.delete('/:id', async (req, res) =>{
    const thought = await Thought.findByIdAndDelete(req.params.id).catch((err) =>{
        res.json(err)
    });
    res.json(thought);
})

router.post('/:thoughtId/reactions', async (req, res) => {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, 
        {$addToSet: {reactions:req.body}}, 
        {new: true}
    ).catch((err) => {
        res.json(err);
    })
    res.json(thought);
})

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) =>{
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, 
        {
            $pull: {reactions: {_id:req.params.reactionId}}
        }, 
        {new: true})
        .catch((err) =>{
        res.json(err)
    });
    res.json(thought);
})

module.exports = router;