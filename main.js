const express = require('express')
const app = express();
const port = 3000;
const mongoose=require('mongoose');
const hbs=require('hbs');
const bodyparser=require('body-parser');
// const flash = require("connect-flash");
// const session = require('express-session');


app.use(express.json());
app.use(express.urlencoded({extended:false}));
const conn=mongoose.connect("mongodb://localhost:27017/HealthPlus",{

}).then(()=>{
    console.log("connected to mongodb");
}).catch(()=>{
    console.log("connection failed");
});
const register=require('./models/user');



app.set("view engine","hbs");
app.use(express.static('./views'));
app.use(express.static('./models'));
// app.set(express.static('./views/css/style'));
// app.set(express.static('./views/img'));
// app.set(express.static('./views/js'));

app.post("/register",async(req,res)=>{
  try{
    const reg_pass=req.body.password;
    const con_pass=req.body.confirm_password;
    if(reg_pass === con_pass){
      const data=new register({
        name:req.body.name,
        reg_email:req.body.reg_email,
        phone:req.body.phone,
        password:req.body.password,
        confirm_password:req.body.confirm_password


      })
      const reg=await data.save();
      res.status(201).render("login");
    }
    else{
      res.status(201).send("wrong password");
    };
  }catch(err){
    res.status(401).send("invalid email");
    console.log(err);
  }

 
})

app.post("/login",async (req,res)=>{
  try{
    const email=req.body.login_email;
    const password=req.body.login_password;
    console.log(`${email} and ${password}`);
    const usermail= await register.findOne({reg_email:email});


    if (usermail.password === password){
         
         
         res.status(201).render('index');
        //  document.alert('login successfully');
        
    }
    else{
      res.status(201).render("login",{error:'invalid password '})
    }
    
  }catch(err){
    res.status(401).send("invalid user mail and password");
    console.log(err);

  }
})

const admindetail=require("./models/admin")
app.post("/admindetail",async (req,res)=>{
  try{
    const email=req.body.admin_email;
    const password=req.body.admin_password;
    console.log(`${email} and ${password}`);
    const usermail= await admindetail.findOne({admin_email:email});


    if (usermail.admin_password == password){
         
         
         res.status(201).render('admin');
        //  document.alert('login successfully');
        
    }else{
      res.status(401).render("adminlogin",{error:'invalid password'});
    }
    
  }catch(err){
    res.status(401).send("invalid user mail and password");
    console.log(err);
    

  }
})
const patient=require("./models/patient")

app.post("/patient",async (req,res)=>{
  try{
    const patient_data=new patient({
      hospital:req.body.hospital,
      name:req.body.name,
      patient_email:req.body.patient_email,
      patient_phone:req.body.patient_phone,
      date:req.body.date

      })
      const pat=await patient_data.save();
      res.status(201).render("book");
    }
  
  catch(err){
    res.status(401).send("invalid email");
    console.log(err);
  }
})
// app.get("/admin",async(req,res)=>{
//   try{

//   }
// })


// Fetch data from the database and generate HTML table
app.get('/patient', async (req, res) => {
  try {
    const items = await patient.find();
    res.render("patient",{items});
    
  } catch (err) {
    res.status(500).send('Error fetching data from the database');
  }
});


const appoint=require("./models/appoint");
app.post("/appoint",async (req,res)=>{
  try{
    const appoint_data=new appoint({
      patientname:req.body.patientname,
      patientcontact:req.body.patientcontact,
      patientage:req.body.patientage,
      hospitalname:req.body.hospitalname,
      departmentname:req.body.departmentname,
      doctorname:req.body.doctorname,
      appointdate:req.body.appointdate,
      appointtime:req.body.appointtime,
      paymentamount:req.body.paymentamount,
      paymentstatus:req.body.paymentstatus

      })
      const pat=await appoint_data.save();
      res.status(201).render("index");
    }
  
  catch(err){
    res.status(401).send("invalid email");
    console.log(err);
  }
})

app.get('/appointment', async (req, res) => {
  try {
    const items = await appoint.find();
    res.render("appointment",{items});
    
  } catch (err) {
    res.status(500).send('Error fetching data from the database');
  }
});
app.get('/appointcount', async (req, res) => {
  try {
    const count = await appoint.countDocuments();
    // const pat_count=await patient.countDocuments();
    res.json({count});
    // res.json({pat_count});
  } catch (err) {
    res.status(500).send('Error counting data from the database');
  }
});
app.get('/patientcount',async(req,res)=>{
  try{
    const pt_count=await patient.countDocuments();
    res.json({pt_count});
  }catch(err){
    res.status(500).send('error occur from database');
  }
})


 app.get("/admin",(req,res)=>{
  res.render("adminlogin");
})
// app.get("/admindetail",(req,res)=>{
//   res.render("admin");
// })

app.get("/",(req,res)=>{
  res.render("login");
})

app.get("/login",(req,res)=>{
  res.render("login");
 })
 app.get("/register",(req,res)=>{
    res.render("register")
 })
 app.get("/about",(req,res)=>{
    res.status(201).render("about");
 })
 app.get("/index",(req,res)=>{
    res.status(201).render("index");
 })
 app.get("/d_and_pp",(req,res)=>{
    res.status(201).render("d_and_pp");
 })
 app.get("/book",(req,res)=>{
  res.status(201).render("book");
})

app.get("/admin",(req,res)=>{
  res.status(201).render("admin");
})
app.get("/opd",(req,res)=>{
  res.status(201).render("opd");
})
app.get("/doctor",(req,res)=>{
  res.status(201).render("doctor");
})
app.get("/appoint",(req,res)=>{
  res.status(201).render("appoint");
})
app.get("/blood",(req,res)=>{
  res.status(201).render("blood");
})
app.get("/insurance",(req,res)=>{
  res.status(201).render("insurance");
})
app.get("/hospital-details",(req,res)=>{
  res.status(201).render("hospital-details");
})
app.get("/logout",(req,res)=>{
  res.render("index");
})
// // app.get()

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
