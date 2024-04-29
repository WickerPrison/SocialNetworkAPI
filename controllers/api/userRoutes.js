const router = require('express').Router();
const {User} = require('../../models');

router.get('/', async (req, res) => {
        const users = await User.find().catch((err) =>{
            res.json(err)
        });
        res.json(users);
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body).catch((err) =>{
        res.json(err);
    });
    res.json(user);
})

module.exports = router;