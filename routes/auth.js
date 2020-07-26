const router = require('express').Router();

const User = require('../models/User');

const { validateUserForSignUp, validateUserForLogin} = require('../validations/validations');


// @ROUTE a post route to handle incoming post request
router.post('/register', async (req,res) => {
    // validate the userdata
    const UserValidationResponse = validateUserForSignUp(req.body);

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

