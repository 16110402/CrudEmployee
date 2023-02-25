const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// var jwt = require('jsonwebtoken');


// const JWT_SECTRT = 'amitisaplayer';

router.post('/createemp', [
    body('name','Enter a valid name').isLength({min: 3}),
    body('age','Enter a valid age').isLength({min: 1}),   
    body('email','Enter a valid email').isLength({min: 13}),
    body('salary','Enter a valid salary').isLength({min: 3}), 
    body('country','Enter a valid country').isLength({min: 1}), 
    body('state','Enter a valid state').isLength({min: 1}), 
    body('city','Enter a valid city').isLength({min: 1}), 
] , async (req, res)=>{
   //if there are errors, return Bad request and the errors
   console.log(req.body,"req");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    // Check whether the user with this phone exists already
    let employee = await Employee.findOne({email: req.body.email});
    if(employee){
      return res.status(400).json({error: "404"});
    }
    // Create a new Employee
    console.log("pass")
    employee =await Employee.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        salary: req.body.salary,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
      });
      console.log(employee)
      const data = {
        employee: {
          id: employee.id
        }
      }
      success = true;
    //   const authtoken = jwt.sign(data, JWT_SECTRT);
      // console.log(authtoken);
      res.json({success, data});
      // res.json(authtoken);
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
})

router.post('/fetchemployee', async (req, res) => {
    try{
    let emps = await Employee.find().sort({"age": 1});
    console.log(emps,"empsb");
    res.status(200).json(emps);
    }
    catch(error){
           console.error(error.message);
           res.status(500).send("internal server Error occured");
         }
})

router.post('/rememp', async (req, res) => {
    try{
    let emps = await Employee.deleteOne({email: req.body.email})
    // console.log(emps.acknowledged, "rem")
    res.status(200).json(emps);
    }
    catch(error){
           console.error(error.message);
           res.status(500).send("internal server Error occured");
         }
})

router.post('/updateemp', async (req, res) => {
    try{
     console.log(req.body.vdata,"vdata")
      let emp1 = await Employee.findOne({_id: req.body.vdata});
      emp1.salary = req.body.salary;
      console.log(emp1)
     if(!emp1){
       return res.status(400).json({error: "Sorry employee does not exists"});
     }
     let p = await Employee.findByIdAndUpdate(req.body.vdata, emp1);
     
    res.status(200).json({success: "success"})
 }
 catch(error){
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
 })

module.exports = router