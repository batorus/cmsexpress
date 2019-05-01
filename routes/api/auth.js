const bcrypt = require('bcryptjs');
const connection = require('../../db/connection');

//exports.authenticate = (email, password) => {
//  return new Promise(async (resolve, reject) => {
//    try {
//      // Get user by email
//      const user = await User.findOne({ email });
//
//      // Match Password
//      bcrypt.compare(password, user.password, (err, isMatch) => {
//        if (err) throw err;
//        if (!isMatch) throw 'Password did not match';
//        resolve(user);
//      });
//    } catch (err) {
//      // Email not found or password did not match
//      reject('Authentication Failed');
//    }
//  });
//};

exports.authenticate = (email, password) => {
  return new Promise((resolve, reject) => {
      
    connection.query('SELECT * FROM users WHERE email = ' + connection.escape(email), function (error, results, fields) {
        if(error){
//
//            res.json({error});
//            res.end();
            reject('Authentication Failed');
        }
        else{
//            if(results.length > 0)
//              res.json({results});
//            else
//              res.status(400).json({msg:`No user with the id: ${req.params.id}`});
//            res.end();

            bcrypt.compare(password, results.password, (err, isMatch) => {
//             if (err) throw err;
//             if (!isMatch) throw 'Password did not match';
             resolve(results);
           });

        }
    })

  })
};

