const express=require("express")
const dotenv=require("dotenv")
const cors=require('cors')
const connection = require("./db")
const userRouter = require("./routes/user")
const employeeRoute = require("./routes/employee")
const app=express()
app.use(cors())
dotenv.config()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

app.use('/user',userRouter)
app.use("/",employeeRoute)




app.listen(process.env.PORT, async(req,res)=>{
    try{
        await connection
        console.log("server connected to mongoDB");
    }catch(err){
        console.log(err)
    }
    console.log(`server is runnint ${process.env.PORT}`)
})