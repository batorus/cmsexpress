const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('./auth');
const router = express.Router();

const connection = require('../../db/connection');

    // Gets All Users
router.get('/', (req, res, next) =>{
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if(error){

            res.json({error});
            res.end();
        }
        else{
            res.json({results});
            res.end();

        }

    });
});

// Get Single User
router.get('/:id', (req, res) => {
    
     connection.query('SELECT * FROM users WHERE id = ' + connection.escape(req.params.id), function (error, results, fields) {
        if(error){

            res.json({error});
            res.end();
        }
        else{
            if(results.length > 0)
              res.json({results});
            else
              res.status(400).json({msg:`No user with the id: ${req.params.id}`});
            res.end();

        }

    });
    
//  const found = members.some(member => member.id === parseInt(req.params.id));
//
//  if (found) {
//    res.json(members.filter(member => member.id === parseInt(req.params.id)));
//  } else {
//    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//  }
});

// Create User
router.post('/', (req, res) => {
    const {name, email, password} = req.body;
    
    const user = {
      name,
      email,
      password,     
      active : 1
    };

    if (!user.name || !user.email) {
      return res.status(400).json({ msg: 'Please include a name and email' });
    }
  
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        // Hash Password
        user.password = hash;
        
        connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
            if(error){
                //var e = error.sqlMessage;
                res.json({error});
                res.end();
            }
            else{
                res.send('Inserted');
                res.end();
            }

        });
        // Save User
//        try {
//          const newUser = await user.save();
//          res.send(201);
//          next();
//        } catch (err) {
//          return next(new errors.InternalError(err.message));
//        }
      });
    });
  });


  // Update user
router.put('/:id', (req, res) => {
    const user = req.body;
    
    connection.query('UPDATE users SET name = ?, email = ?, password = ?, active = ? WHERE id = ?', [user.name, user.email, user.password, user.active, req.params.id], function (error, results, fields) {
        
        if(error){
            //var e = error.sqlMessage;
            res.json({error});
            res.end();
        }
        else{
            if(results.affectedRows > 0)
              res.json({results});
            else
              res.status(400).json({msg:`Unable to update user for id: ${req.params.id}`});
            res.end();
        }
        
    });
//    const found = members.some(member => member.id === parseInt(req.params.id));
//  
//    if (found) {
//      const updMember = req.body;
//      members.forEach(member => {
//        if (member.id === parseInt(req.params.id)) {
//          member.name = updMember.name ? updMember.name : member.name;
//          member.email = updMember.email ? updMember.email : member.email;
//  
//          res.json({ msg: 'Member updated', member });
//        }
//      });
//    } else {
//      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//    }
  });

  // Delete Member
router.delete('/:id', (req, res) => {
    
    connection.query('DELETE FROM users WHERE id = ?', [req.params.id], function (error, results, fields) {
        
        if(error){
            //var e = error.sqlMessage;
            res.json({error});
            res.end();
        }
        else{
            if(results.affectedRows > 0)
              res.json({results});
            else
              res.status(400).json({msg:`Unable to delete user for id: ${req.params.id}`});
            res.end();
        }
    });
    
        //    const found = members.some(member => member.id === parseInt(req.params.id));
        //  
        //    if (found) {
        //      res.json({
        //        msg: 'Member deleted',
        //        members: members.filter(member => member.id !== parseInt(req.params.id))
        //      });
        //    } else {
        //      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
        //    }
  });




// Auth User
  router.post('/auth', async (req, res, next) => {
    const { email, password } = req.body;

    const token = jwt.sign(req.body, "secret", {
           expiresIn: '15m'
   });
   
    const { iat, exp } = jwt.decode(token);
      // Respond with token
    res.send({ iat, exp, token });
   
   //res.status(400).json({ token});

  });

module.exports = router;