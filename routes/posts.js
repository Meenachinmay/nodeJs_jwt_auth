const router = require('express').Router();
const auth = require('./verifyToken');


router.get('/', auth, (req, res) => {
    return res.status(200).json({
        posts: {
            title: "my first post",
            data: "data is here"
        }
    })    
})

module.exports = router;