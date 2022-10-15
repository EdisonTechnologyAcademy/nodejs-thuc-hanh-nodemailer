"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.post('/sendmail', async (req, res) => {
    try {
        let testAccount = await nodemailer_1.default.createTestAccount();
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        console.log(testAccount.user, testAccount.pass);
        let info = await transporter.sendMail({
            from: 'foo@example.com',
            to: "testemail@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "Hello world?",
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
        res.json({ message: "Send email success" });
    }
    catch (err) {
        res.json({ message: "Error" });
        console.log(err);
    }
});
app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
//# sourceMappingURL=index.js.map