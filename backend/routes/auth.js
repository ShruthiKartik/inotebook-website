const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'shruthi512$'; //private key for jwt token

//Creating new User and saving in database using POST request "/api/auth/createuser". No Login Required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let success=false;
    try {
        let user = await User.findOne({ email: req.body.email }) //check if user already exists
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        //hash and salt the password
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({  //create user and save in db
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        })

        //payload of jwt token
        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //signing jwt token with private key
        success=true;
        res.json({ success, authToken });  //send token to client's browser

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})


//Authenticate user using POST request "/api/auth/login". No Login Required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    let success=false;
    try {
        let user = await User.findOne({ email}) 
        // if user does not exist with this email
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" })
        }

       const passwordMatch = await bcrypt.compare(password,user.password)  //compare user entered password and the hash 

        if(!passwordMatch) {
            res.status(400).json({ error: "Please login with correct credentials" })
        }

        //payload of jwt token
        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //signing jwt token with private key
        success=true;
        res.json({success, authToken });  //send token to client's browser

    } catch (error) {
        res.status(500).send("Internal Server Error ");
    }
})


//Get loggedin User details using POST request "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser ,async (req, res) => {
    try {
        userId=req.user.id;
        let user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        res.status(500).send("Internal Server Error ");
    }
})



module.exports = router;