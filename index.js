const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
var exphbs  = require('express-handlebars');
const { check, validationResult } = require('express-validator/check');
const app = express();

// Body Parser Middleware
//for reading raw json and to be able to work with forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//app.use((req, res, next) => {
//    const token = req.get('authorization');
//    console.log(token);
//    jwt.verify(token, "secret", function (err, decoded) {
//
//        if (err) {
//            return res.status(404).json({mess: err.message})
//        };
//
//        req.user = decoded;
//        next();
//    });
//})



// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));
app.use('/app/users', require('./routes/app/routesusers'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));