const express=require("express")
const dotenv=require("dotenv")
const cors=require('cors')
const connection = require("./db")
const userRouter = require("./routes/user")
const employeeRoute = require("./routes/employee")
const app=express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

app.use('/',userRouter)
app.use("/",employeeRoute)
const port =process.env.PORT||5000
app.listen(port,async(req,res)=>{
    try{
        await connection
        console.log("server connected to mongoDB");
    }catch(err){
        console.log(err)
    }
    console.log(`server is runnint ${port}`)
})