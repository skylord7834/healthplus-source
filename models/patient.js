const mongoose=require("mongoose");

patientSchema=new mongoose.Schema({
    hospital:{
        type:String,
        required:true
    },
        name:{
        type:String,
        required:true
        
    },
    patient_email:{
        type:String,
        required:true
    

    },
    patient_phone:{
        type:Number,
        required:true
    },
   date:{
    type:Date,
    required:true
   }
   
})
const patient=new mongoose.model("patient_detail",patientSchema);
module.exports=patient;