const mongoose=require("mongoose");

adminSchema=new mongoose.Schema({
    admin_email:{
        type:String,
        required:true
    },
    admin_password:{
        type:String,
        required:true
    }
   
})
const admindetail=new mongoose.model("admin_details",adminSchema);
module.exports=admindetail;