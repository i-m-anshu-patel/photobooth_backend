const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'someSecretForNow';
const jwt = require('jsonwebtoken')

exports.createNewUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });

    const data = {
        user: {
            id: user.id
        }
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    const userData = {
        name : user.name,
        email : user.email,
        payment_status : user.paymentStatus,
        authToken : authToken
     }
     return res.send({userData});
}

exports.signInUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: "Email doesn't exist in the system"})
        }
        const matchingPassword = await bcrypt.compare(password, user.password);
        if(!matchingPassword){
            return res.status(400).json({errors: "Incorrect Password"})
        }
        const data = {
            user: {
                id: user.id
            }
        };
    
        const authToken = await jwt.sign(data, JWT_SECRET);
        const userData = {
           name : user.name,
           email : user.email,
           payment_status : user.paymentStatus,
           authToken : authToken
        }
        return res.send({userData});
    }
    catch (err){
        console.log(err);
        return res.status(401).json({errors: "Incorrect credentials entered"})
    }
}