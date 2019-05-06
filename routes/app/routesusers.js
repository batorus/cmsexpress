const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const auth = require('./auth');
const users = require('../../db/users')
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

const connection = require('../../db/connection');

// Get All Users
router.get('/index', (req, res, next) =>{

    users.getAll()
        .then(function(results){

  
            res.render('users/index', {
                title: 'User App',
                results
            })

        })
        .catch(function(err){

          console.log(err.message);
        })
});

// Get Single User
router.get('/edit/:id', (req, res, next) => {
    
      users.getById(req.params.id)
        .then(function(results){

            res.render('users/edit', {
                title: 'Update User',
                results
            })
            
        })
        .catch(function(err){

           //res.json({error:err.message});
          console.log(err.message);
        })
    

});

// Create User
router.post('/create', 
    [

      check('name').not().isEmpty().withMessage("Invalid Name"),
      check('email').isEmail().withMessage("Invalid Email"),
      // password must be at least 5 chars long
      check('password').isLength({ min: 5 }).withMessage("Invalid Password")
    ], 
    (req, res) => {
        
      const {name, email, password} = req.body;  
      const errors = validationResult(req);
      
    if (!errors.isEmpty()) {
      //return res.status(422).json({ errors: errors.array() });
      return res.render('users/index', {
          name,
          email,
          password,
          errors: errors.array()
      })
    }

    
    
    const user = {
      name,
      email,
      password,     
      active : 1
    };

 
    users.addRecord(user)
        .then(function(results){
          
            res.redirect("/app/users/index");
            
        })
        .catch(function(err){
            
//            return res.render('users/index', {
//                errors: err.message
//           })
           //log the error here
           console.log(err.message);
        })
});


  // Update user
router.post('/update/:id', (req, res) => {
    const data = req.body;
    
   users.updateRecord(req.params.id, data)
        .then(function(results){

           res.redirect("/app/users/index"); 
        })
        .catch(function(err){

           //res.json({error:err.message});
          console.log(err.message);
        })  
    

  });
  

  // Delete 
router.get('/delete/:id', (req, res, next) => {
    
     users.deleteRecord(req.params.id)
        .then(function(results){

          res.redirect("/app/users/index");
            
        })
        .catch(function(err){
           //res.json({error:err.message});
           console.log(err.message);
        })
    
  });



module.exports = router;