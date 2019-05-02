//'use strict'
const connection = require('./connection');


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

module.exports.getUsers = () =>{
    return new Promise(function(resolve, reject){
      connection.query(
          "SELECT * FROM users", 
          function(error, results){                                                
              if(error){
                  reject(new Error("Error!!!"));
              }else{
                  resolve(results);
              }
          }
      )}
    );
}

module.exports.getUserById = (id) => {
   
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
            )}
        
 //if(results.length > 0)
//              res.json({results});
//            else
//              res.status(400).json({msg:`No user with the id: ${req.params.id}`});
//            res.end();
        );
}

