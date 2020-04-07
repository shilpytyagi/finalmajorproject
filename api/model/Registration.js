var mongoose = require('mongoose');
var jwt=require('jsonwebtoken')
var Registration = mongoose.Schema({
    
    FullName:String,
    email:String,
    Address:String,
    Phone: Number,
    password:{ type: String, required: true},
    confirmpassword:String,
   

});
Registration.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  }


module.exports= mongoose.model('Registration',Registration);