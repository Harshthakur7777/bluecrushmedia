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
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'thakurharsh08032003@gmail.com',
                pass: 'gorp liqv zxly juow'
            }
        });

        let mailOptions = {
            from: email,
            to: 'thakurharsh08032003@gmail.com',
            subject: `Contact Form Submission from ${name}`,
            text: message
        };

        await transporter.sendMail(mailOptions);
        req.flash('success', 'Message sent successfully!');
        res.redirect('/');

    } catch (error) {
        console.error("❌ Error sending email:", error);
        req.flash('error', 'Failed to send message. Please try again.');
        res.redirect('/');
    }
});


// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
})
app.get('/',(req,res,next)=>{
    res.render('index')
})
app.listen(8000,()=>{
    console.log('app is listening')
})