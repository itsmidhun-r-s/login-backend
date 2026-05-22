const express = require('express');
const router = express.Router();

const User = require('../models/User');


// ================= SIGNUP =================

router.post('/signup', async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Create User
        const newUser = new User({
            name,
            email,
            password
        });

        // Save User
        await newUser.save();

        console.log("User Saved ✅");

        res.json({
            message: 'Signup Successful ✅',
            user: newUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });

    }

});


// ================= LOGIN =================

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user in MongoDB
        const user = await User.findOne({ email });

        // Check user exists
        if (!user) {
            return res.status(400).json({
                message: 'User not found ❌'
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(400).json({
                message: 'Invalid Password ❌'
            });
        }

        res.json({
            message: 'Login Successful ✅',
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });

    }

});

module.exports = router;