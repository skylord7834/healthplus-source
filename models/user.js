const mongoose=require("mongoose");

regSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    reg_email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    }
})
const register=new mongoose.model("user_register",regSchema);
module.exports=register;