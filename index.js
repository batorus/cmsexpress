const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();
//const connection = require('./db/connection');
//var mysql  = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'localhost',
//  user     : 'root',
//  password : '',
//  database : 'express'
//});
//
//connection.connect(function(err) {
//  if (err) {
//    console.error('error connecting: ' + err.stack);
//    return;
//  }
//
//  console.log('connected as id ' + connection.threadId);
//});

// Body Parser Middleware
//for reading raw json and to be able to work with forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const token = req.get('authorization');
    console.log(token);
    jwt.verify(token, "secret", function (err, decoded) {

        if (err) {
            return res.status(404).json({mess: err.message})
        };

        req.user = decoded;
        next();
    });
})



// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));