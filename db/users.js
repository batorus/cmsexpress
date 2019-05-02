//'use strict'
const connection = require('./connection');
const bcrypt = require('bcryptjs');

//exports.getUsers = (req, res)=>{
//    connection.query('SELECT * FROM users', function (error, results, fields) {
//        if(error){
//
//            res.json({error});
//            res.end();
//          //  return error;
//        }
//        else{
//            res.json({results});
//            res.end();
//
//           //  return results;
//
//        }
//
//    });
//}

module.exports.getAll = () =>{
    return new Promise(function(resolve, reject){
      connection.query(
          "SELECT * FROM users", 
          function(error, results){                                                
              if(error){
                  reject(new Error(error));
              }else{
                  if(results.length > 0)
                    resolve(results);
                  else
                    reject(new Error("No users"));    
              }
          }
      )}
    );
};

module.exports.getById = (id) => {
   
        return new Promise(function(resolve, reject){
            connection.query('SELECT * FROM users WHERE id = ' + connection.escape(id), function (error, results, fields) {                                                
                    if(error){
                        reject(new Error(error));
                    }else{

                         if(results.length > 0)
                            resolve(results);
                          else
                            reject(new Error("No user with the id: "+id));                             

                    }
                }
            )
        });
};

module.exports.addRecord = (record)=>{
    
    return new Promise(function(resolve, reject){ 
        
        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(record.password, salt, (err, hash) => {
          // Hash Password
          record.password = hash;

          connection.query('INSERT INTO users SET ?', record, function (error, results, fields) {
              if(error){
                  reject(new Error(error));
              }
              else{
                  resolve(results);
              }

          });


        });
      });
    });
};

