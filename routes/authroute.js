const express = require('express');
const router = express.Router();

// Dummy User Database
const users = []; 

// SIGNUP ROUTE
router.post('/signup', (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");
    
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

    users.push({ email, password });
    return res.status(201).json({ message: "Signup Successful!", email });
});

// LOGIN ROUTE
router.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password!" });
    }

    return res.status(200).json({ message: "Login Successful!", email });
});

module.exports = router;