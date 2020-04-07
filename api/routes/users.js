const express = require('express');

const mongoose = require('mongoose');
const app = express();
const User=require('../model/testquery');
const router = express.Router();
var bcrypt = require('bcryptjs');
var Registration = require('../model/Registration');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  });

router.get('/',function(req,res){
    User.find(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            res.json(data)
        }
    })
})

router.post('/add',function(req,res){
    const FirstName=req.body.FirstName
    const lastname=req.body.lastname
    const email=req.body.email
    const subject=req.body.subject
    const message=req.body.message
    new User({
        FirstName:FirstName,
        lastname:lastname,
        email:email,
        subject:subject,
        message:message
    }).save(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
            res.json(data)
        }
    })
})
//////////////////////////////////////////////////////updating data///////////////////////////////////
router.post('/update/:id',(req,res,next)=>{
    const id = req.params.id;
    let UserUpdate = {
        _id :id,
        FirstName : req.body.FirstName,
        lastname: req.body.lastname,
        email : req.body.email,
        subject: req.body.subject,
        message : req.body.message
    };
    User.findOneAndUpdate({_id:id}, UserUpdate,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            // console.log(data)
            res.json(data)
        }
        
    })
})

/////////////////edit 
router.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    User.findById(id, function (err,data){
        res.json(data);
})
})

//////////////////////////////////////////////////delete data///////////////////////////////////////////////
router.get('/delete/:id',(req,res)=>{
    let id=req.params.id
    User.findOneAndRemove(id,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(data)
            console.log(data)
        }
    })
})
//////////////////////////////// User Registration /////////////////////////////////////////////
/////////////////////////////////Registration
router.post("/addRegistration", (req, res) => {
    console.log(req.body.FullName);
  
    Registration.findOne({ email: req.body.email }, (err, callbackData) => {
      if (err) console.log(err);
      else {
        if (callbackData) {
          res.json({ message: "Already Registered" });
        } else {
          if (req.body.password == req.body.confirmpassword) {
            var salt = bcrypt.genSaltSync(10);
            const hashing = bcrypt.hashSync(req.body.password, salt);
            
  
            new Registration({
                FullName: req.body.FullName,
                email: req.body.email,
                Address: req.body.Address,
                Phone: req.body.Phone,
                password: hashing,
                confirmpassword: req.body.confirmpassword,
  
            }).save((err, callback) => {
              if (err) console.log(err);
              else res.json({ message: "registered" });
            });
          } else {
            res.json({ message: "Password doesn't matched" });
          }
        }
      }
    });
  }
  );
  
  ////////////////////// USER LOGIN ///////////////////////////////
  
  router.post('/login', (req, res) => {
    let regObj = {
      email: req.body.email,
      password: req.body.password
    }
    Registration.findOne({
      email: regObj.email
    },
      (err, cb) => {
        if (err) {
          res.json({ "message": err });
        }
        else {
          if (cb == null) {
            res.json({ "message": "Check Your Credentials" });
          }
          else {
            bcrypt.compare(regObj.password, cb.password, function (err, callbackData) {
              if (err) {
                // handle error
                console.log(err);
              }
              if (callbackData) {
                // Send JWT
                cb['token'] = cb.generateJwt();
                // console.log(cb.token);
                // console.log(data)
                // res.json(data);
                let responseObj = {
                  token: cb.token
                };
                console.log(responseObj);
                res.json(responseObj);
              }
              else {
                // response is OutgoingMessage object that server response http request
                res.json({ message: 'passwords do not match', success: false });
              }
            });
          }
        }
  
      })
  
    console.log(regObj);
  })
module.exports = router;

