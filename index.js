const express=require('express')
const cors=require('cors')
const connection = require('./db')

require('dotenv').config()
const boardRoutes = require("./routes/board");
const taskRoutes  = require("./routes/task")
const subtaskRoutes = require("./routes/subtask")
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send(`<h1>Hello</h1>`)
})

app.use("/boards", boardRoutes);
app.use("/tasks", taskRoutes);
app.use("/subtasks", subtaskRoutes);


app.listen(process.env.PORT,async(req,res)=>{
    try{
        await connection
        console.log("server is connected to db");
    }catch(err){
        console.log(err)
    }
    console.log(`server is running on ${process.env.PORT}`);
})