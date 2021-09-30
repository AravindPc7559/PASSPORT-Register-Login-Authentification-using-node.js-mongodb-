const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const flash  = require('connect-flash');
const session = require('express-session')
const passport = require("passport");
require("./config/passport")(passport)

//mongoose..

mongoose.connect('mongodb://localhost:27017/loginTest').then(()=>{
    console.log("database has been succesfully connected")
}).catch((err)=>{
    console.log("invalid connection :" + err)
})

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);

//bodyParser
app.use(express.urlencoded({extended: false}));

//express session.
app.use(session({
        secret : 'secret',
        resave : true,
        saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

//use flash..
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error =  req.flash('error');
    next()
})

//Routes..

app.use('/',require('./route/index'))
app.use('/users',require('./route/users'))


app.listen(PORT,()=>console.log(`Server running on http://localhost:3000`))