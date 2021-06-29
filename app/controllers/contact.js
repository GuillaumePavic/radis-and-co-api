const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {

    const mail = {
        from: req.body.email,
        to: process.env.EMAIL_CONTACT,
        subject: req.body.subject,
        text: 
`From: ${req.body.email}.
Message :
${req.body.message}`,
    };

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_CONTACT,
          pass: process.env.PASSWORD_CONTACT,
        },
      });
    
    // send mail with defined transport object
    try {
        const info = await transporter.sendMail(mail);
        res.json({message: 'Votre message a bien été envoyé !'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Oops, il semblerait qu\'il y ait eu une erreur côté serveur.'});
    }
}

module.exports = sendEmail;

