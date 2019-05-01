const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');
const connection = require('../../db/connection');

    // Gets All Users
router.get('/', (req, res) =>{
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
    
    const User = {
      name,
      email,
      password,     
      active : 1
    };

    if (!User.name || !User.email) {
      return res.status(400).json({ msg: 'Please include a name and email' });
    }
  
  
    connection.query('INSERT INTO users SET ?', User, function (error, results, fields) {
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

    
     //res.json({k:query.sql});

    // res.redirect('/');
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


module.exports = router;