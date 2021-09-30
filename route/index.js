const express = require("express");
const router = express.Router();
const {ensureAutheticated} =  require("../config/auth")

//Login Page

router.get('/',(req,res)=>{
    res.render('welcome');
})

//Register Page

router.get('/register',(req,res)=>{
    res.render('register')
})

//dashboard.


router.get('/dashboard',ensureAutheticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user
    })
})

module.exports = router;