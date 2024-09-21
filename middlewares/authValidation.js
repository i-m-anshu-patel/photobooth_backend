const User = require('../models/User')


const createUserValidation = async (req, res, next) => {
    const emailAlreadyExists = await User.findOne({email: req.body.email});
    if(emailAlreadyExists){
        return res.status(400).json({errors: "Email already exists in our system"})
    }
    next()
}

exports.createUserValidation = createUserValidation;