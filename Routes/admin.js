const express = require('express');
const router = express.Router();
const User = require(`../Models/User`);
const bcrypt = require('bcrypt');
const createToken = require('../utills/token');
const jwt = require('jsonwebtoken');
// router.get('/', (req, res) => {
//     res.send('Admin route is working!');
// })
const { authenticate  } = require('../middleware/auth'); // Middleware for authentication and authorization

// test route

router.get('/test', (req, res) => {
    res.send('Admin route is working!');
});
// User login route
router.post('/login', async (req, res) => {
    const { employeeId, password } = req.body;
    console.log(employeeId, password)
    try {
        const user = await User.findOne({ employeeId });
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid employeeId or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
           
            return res.status(401).json({ message: 'Invalid employeeId or passwords' });
        }

        // Generate JWT token here if needed

        const token = createToken(user);
        // console.log(token)
        res.cookie('token', token, {
            // httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'Strict', // Adjust based on your needs (Lax or Strict)
        });// { httpOnly: true } for production to prevent XSS
        res.status(200).json({ message: 'Login successful', user,success: true});

       
    } catch (error) {
        res.status(500).json({ message: 'Error logging in',error: error.message });
    }
});


//Route to create new employees
router.post('/employees', async (req, res) => {
    const { name, email, password, role, employeeId,age,gender,address,phone,doj } = req.body; // Assuming the employee object has name, email, password, role, employeeId,age,gender,address,contact } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword , role, employeeId,age,gender,address,phone,doj });
        await user.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
});


router.get('/employees',authenticate, async (req, res) => {
    try {
        // console.log(req.cookies)
    //    console.log(req.user)


        const { email } = req.user;

        const users = await User.find({  });   
        // console.log(users)
        console.log(users)
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
});

//Admin logout route
router.get('/logout', (req, res) => {
    // console.log(req.cookies)
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router;
