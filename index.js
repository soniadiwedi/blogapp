const express=require("express")

const cors=require('cors')
const connection = require("./db")
const userRouter = require("./route/userRoute")
const blogRouter = require("./route/blogRoute")
require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api",userRouter)
app.use("/api",blogRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Server mongoose db");

    }catch(err){
        console.log(err);
    }
    console.log(`server is runnig ${process.env.port}`)
})