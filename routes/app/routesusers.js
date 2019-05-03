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
          //console.log("Promise rejection error: "+err);
          res.json({error:err.message});
        })
});

// Get Single User
router.get('/edit/:id', (req, res, next) => {
    
      users.getById(req.params.id)
        .then(function(results){
            //use the results here
          //for now just output them
          //res.json({results});

            res.render('users/edit', {
                title: 'Update User',
                results
            })
            
        })
        .catch(function(err){

           res.json({error:err.message});
        })
    

});

// Create User
router.post('/create', 
    [
      // username must be an email
      check('name').not().isEmpty().withMessage("Invalid Name"),
      check('email').isEmail().withMessage("Invalid Email"),
      // password must be at least 5 chars long
      check('password').isLength({ min: 5 }).withMessage("Invalid Password")
    ], 
    (req, res) => {
      const {name, email, password} = req.body;  
      const errors = validationResult(req);
      
      console.log(req.body.name);
      
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

//    if (!user.name || !user.email) {
//      return res.status(400).json({ msg: 'Please include a name and email' });
//    }
    
    users.addRecord(user)
        .then(function(results){
            //use the results here
          //for now just output them
          
          res.redirect("/app/users/index");
            
        })
        .catch(function(err){

           res.json({error:err.message});
        })
});


  // Update user
router.post('/update/:id', (req, res) => {
    const data = req.body;
    
   users.updateRecord(req.params.id, data)
        .then(function(results){
            //use the results here
          //for now just output them
         // res.json({results});
           res.redirect("/app/users/index"); 
        })
        .catch(function(err){

           res.json({error:err.message});
        })  
    

  });
  

  // Delete 
router.get('/delete/:id', (req, res, next) => {
    
     users.deleteRecord(req.params.id)
        .then(function(results){

          res.redirect("/app/users/index");
            
        })
        .catch(function(err){
           res.json({error:err.message});
        })
    
  });




// Auth User
//  router.post('/auth', async (req, res, next) => {
//    const { email, password } = req.body;
//
//    const token = jwt.sign(req.body, "secret", {
//           expiresIn: '15m'
//   });
//   
//    const { iat, exp } = jwt.decode(token);
//      // Respond with token
//    res.send({ iat, exp, token });
//   
//   //res.status(400).json({ token});
//
//  });

module.exports = router;