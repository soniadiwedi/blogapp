const mongoose =require("mongoose")


const userSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmedPassword:{type:String,required:true}
},
    {versionKey:false}
)

const UserModel=mongoose.model('user',userSchema)
module.exports={UserModel}

// {
//     "email":"soniadiwedi@gmail.com",
//     "password":"123",
//     "confirmedPassword":"123"
//     }