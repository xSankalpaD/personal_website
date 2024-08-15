const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., your HTML, CSS, JS)
app.use(express.static('public'));

// Route for handling contact form submissions
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider's service, e.g., 'hotmail'
        auth: {
            user: 'sankalpachhetri30@gmail.com', // Your email address
            pass: 'Kalpana@1974'    // Your email password or app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'sankalpachhetri30@gmail.com', // Where you want to receive the email
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Something went wrong. Please try again later.');
        }
        res.status(200).send('Message sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
