const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");

userRouter.post("/register", async (req, res) => {
    try {
        
        const { username, email, password } = req.body;
    
        // Check if the username or email already exists in the database
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          return res.status(409).json({ message: 'Username or email already exists' });
        }
    
        // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new UserModel({
          username,
          email,
          password: hashedPassword,
        });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  });

userRouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res
            .status(200)
            .json({
              msg: "Login sucessfull!",
              token: jwt.sign({ userId: user._id }, "apple"),
            });
        } else {
          res.status(400).json({ msg: "Wrong Credentila" });
        }
      });
    } else {
      res.status(200).json({ message: "No such user Exist" });
    }
  } catch (err) {
    res.status(400).json({ msg: err.messgae });
  }
})


// "username": "sonia",
// "email": "sonia@gmail.com",
// "password": "123"

  module.exports=userRouter