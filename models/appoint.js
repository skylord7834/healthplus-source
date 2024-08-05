const mongoose=require("mongoose");

appointSchema=new mongoose.Schema({
    patientname:{
        type:String,
        required:true
    },
     patientcontact:{
        type:Number,
        required:true
        
    },
    patientage:{
        type:Number,
        required:true
    },
    hospitalname:{
        type:String,
        required:true
    },
   departmentname:{
    type:String,
    required:true
   },
   doctorname:{
    type:String,
    required:true
   },
   appointdate:{
    type:Date,
    required:true
   },
   appointtime:{
    type:String,
    required:true
   },
   paymentamount:{
    type:Number,
    required:true
   },
   paymentstatus:{
    type:String,
    required:true
   }
   
})
const appoint=new mongoose.model("appoint_detail",appointSchema);
module.exports=appoint;