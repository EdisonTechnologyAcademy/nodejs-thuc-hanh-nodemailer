import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import nodemailer from "nodemailer";

const PORT = 3000;
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendmail', async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        console.log(testAccount.user, testAccount.pass)

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'foo@example.com', // sender address
            to: "testemail@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "Hello world?", // html body
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.json({ message: "Send email success" })
    } catch (err) {
        res.json({ message: "Error" })
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});