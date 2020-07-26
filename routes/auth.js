const router = require('express').Router();

const User = require('../models/User');

const Joi = require('@hapi/joi');

function validateUser(user){
    const validateUserSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return validateUserSchema.validate(user)
}

router.post('/register', async (req,res) => {
    // validate the userdata
    const UserValidationResponse = validateUser(req.body);

    if (UserValidationResponse.error) return res.status(400).json({
        success: false,
        errors: UserValidationResponse.error.details[0].message
    })

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json({success: true, user: {email: savedUser.email, name: savedUser.name }});       
    } catch (error) {
        res.status(400).json({success: false, error});
    }
});

router.post('/login', (req, res) => {
    res.send("Login user");
})

module.exports = router;

