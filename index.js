const express = require('express');
const path = require('path');
const app = express();

// Body Parser Middleware
//for reading raw json and to be able to work with forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res)=>{

//     res.sendFile(path.join(__dirname,'public','index.html'));
// } )


  //get all members
// app.get("/api/members/", (req,res)=>{
//     res.json(members);
// })



// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));