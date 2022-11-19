const express=require('express');
const router=express.Router();
const User=require('../models/User')
//Using bcryptjs to perform hashing
const bcrypt=require('bcryptjs')
//Using express validator to vaildate the user detail received
const { body, validationResult } = require('express-validator');
//Using json web token package 
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchUser')

const JWT_SECRET='S@#h%^m'

//Route 1: Create a User using:post:/api/aut/createUser".No login required
router.post('/createUser',
//Applying the validations on user data received  
[
    body('name','Mininum 3 characters  required in name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail()
    //Custom validation to check if the given email is already present in the database or not.
    .custom(value => {
      return User.findOne({email:value}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  body('password','Mininum 8 characters  required in password').isLength({ min: 8 })
],
//handling the request and response
async (req,res)=>{
    
    let success=false;

    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    const secPassword=await bcrypt.hash(req.body.password,salt);

    //Saving the data into the database
    try{
      let user=await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPassword,
        })
        const data={
          user:{
            id:user.id
          }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
         res.json({success,authToken})
    }
    catch(err){
      //responding with error message if unable to connect with server or any else error occurred
      res.status(500).send({success,error:err.message})
    }
})

//Route 2: Create a User using:post:/api/aut/login".No login required
router.post('/login',
//Applying the validations on user data received  
[
    body('email','Enter a valid Email').isEmail(),
    body('password','Cannot be blank').exists()
],
//handling the request and response
async (req,res)=>{

    //returning the success status
    let success=false;
     //if there are errors return bad request and errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ success,errors: errors.array() });
     }
     try{

       //fetching the email and password from request body
       const {email,password}=req.body;
       
       //finding the user data with given email
       const user=await User.findOne({email:email})
       
       //response if user with given email was not found
       if (!user) {
         return res.status(400).json({ success,errors: 'Please try to login with correct credentials' });
        }
        
        //comparing the given password with hash password stored in database using .compare function
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
          return res.status(400).json({ success,errors: 'Please try to login with correct credentials' });
        }
        
        //after all the conditions satisfied sending the authToken
        const data={
          user:{
            id:user.id
          }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success,authToken})
      }catch(err){
        //responding with error message if unable to connect with server or any else error occurred
        res.status(500).send(err.message)
      }
      })
      
//Route 3: get User details using:post:/api/aut/getUser".login required
router.post('/getuser',fetchuser,
//handling the request and response
async (req,res)=>{

try{
  userId=req.user.id;
  //finding the user data with the id from token
  const user=await User.findOne({_id:userId}).select('-password')
  success=true;
  res.json({success,user})
}
catch(err){
      //responding with error message if unable to connect with server or any else error occurred
      success=false;
      res.status(500).send(success,err.message)
}
});

module.exports=router