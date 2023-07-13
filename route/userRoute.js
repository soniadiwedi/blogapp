const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");




userRouter.post("/signup", async(req, res) => {
 
    const {  email, password, confirmedPassword } = req.body;

    if (password !== confirmedPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    try {
    bcrypt.hash(password,5,async(err,hash)=>{
      const newUser = new User({
        email,
        password:hash,
        confirmedPassword:confirmedPassword,
      });
    await newUser.save();
    res.status(201).send({ msg: "Registration has been done", newUser });
    })

  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err.message});
  }
});



userRouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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