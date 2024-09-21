const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'someSecretForNow';
const jwt = require('jsonwebtoken')

exports.createNewUser = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const userData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });

    const data = {
        user: {
            id: userData.id
        }
    };

    const authToken = jwt.sign(data, JWT_SECRET)
    return res.send({authToken});
}