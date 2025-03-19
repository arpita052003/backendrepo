// ✅ Environment Variables
require('dotenv').config(); 

// ✅ Imports
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

// ✅ App Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Step 1: Request Logger Middleware (Yeh yahan add karein)
app.use((req, res, next) => {
    console.log(`Request Received: ${req.method} ${req.url}`);
    next();
});
// ✅ Nodemailer Configuration (⚠️ Missing Part Added)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ✅ Test Route
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

// ✅ Contact Route
app.post('/send-email', (req, res) => {
    const { name, email, phone, service, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'kittumakeupartist68@gmail.com',
        subject: 'New Contact Form Submission',
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Service: ${service}
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send message. Please try again later.' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Message sent successfully!' });
        }
    });
});

// ✅ Server Start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
});
