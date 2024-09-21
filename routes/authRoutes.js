const express = require('express');
const router = express.Router();
const authValidator = require('../middlewares/authValidation');
const authController = require('../controllers/authController');


router.post('/createUser', authValidator.createUserValidation , authController.createNewUser);
router.post('/signin', authController.signInUser)


module.exports = router;