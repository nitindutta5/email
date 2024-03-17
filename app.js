const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
var bodyParser = require('body-parser')
const { renderEmailTemplate } = require('./helper/emailHelper')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.post('/send-email/:template', async (req, res) => {
    const { template } = req.params;
    const body = req.body;
    console.log(process.env.EMAIL)
    // Logic to render and send email based on the template
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
            // Configure your email service here (SMTP settings, etc.)
        });
        const name = body?.to?.split('@')?.[0]
        const html = await renderEmailTemplate(template, name);
        const info = await transporter.sendMail({
            from: body.from,
            to: body.to,
            subject: body.subject,
            html: html,
        });

        res.send(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});