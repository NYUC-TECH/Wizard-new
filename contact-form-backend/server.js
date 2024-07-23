const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('/public'));

// Email sending configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amanjeet1212@gmail.com',
        pass: 'mzjz oxyb lynr orga'
    }
});

// Define the route to handle form submissions
app.post('/contact', (req, res) => {
    const { name, phone, email, message } = req.body;

    const mailOptions = {
        from: 'noreply@yourdomain.com',
        to: 'your-email@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Message sent: ' + info.response);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});