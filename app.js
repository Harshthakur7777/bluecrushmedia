const express = require('express');
const app = express();
// For parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ejsMate = require('ejs-mate')
const path = require('path');
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.engine('ejs', ejsMate)
const nodemailer = require('nodemailer');
const flash = require('connect-flash');
const session = require('express-session')
app.use(session({
    secret: 'yourSecretKey', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true
}));

// ✅ Initialize flash middleware
app.use(flash());

// ✅ Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});



// Start Server
const PORT = 8000; // or the port you actually want

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get('/',(req,res,next)=>{
    res.render('index')
})
app.all('*',(req,res,next)=>{
    res.render('index')
})