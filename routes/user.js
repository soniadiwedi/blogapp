const express=require('express')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const { UserModel } = require('../model/userModel')
const userRouter=express.Router()

// userRouter.post("/signup",async(req,res)=>{
//     try{
//         const {email,password,confirmedPassword}=req.body
//         const existingUser=await UserModel.findOne({email:email})
//         if(existingUser){
//             return res.status(409).json({msg:"username already exists"})
            
//         }
//         const hashedPossword=await bcrypt.hash(password,10)
//         const newUser=new UserModel({email,password:hashedPossword,confirmedPassword:hashedPossword})
//         await newUser.save();
//         res.status(201).json({msg:"user registred successfully"})

//     }catch(err){
//         console.log('error registeration',err)
//         res.status(500).json({msg:"Internal server error"})
//     }
// })

//login route
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

userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmedPassword } = req.body;

    if (password !== confirmedPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      confirmedPassword: confirmedPassword,
    });

    await newUser.save();

    res.status(201).send({ msg: "Registration has been done", newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports=userRouter

