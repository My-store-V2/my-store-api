const nodemailer = require("nodemailer");
const config = require("../config");

async function sendConfirmationEmail(req, res, email) {
    try {
        // Créer un transporteur SMTP
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: config.gmail,
                pass: config.gpwd,
            },
        });

        // Définir le contenu de l'e-mail
        let mailOptions = {
            from: config.gmail,
            to: email,
            subject: "Confirmation d'inscription",
            text: "Bonjour, vous êtes maintenant inscrit sur notre site. Merci de votre inscription.",
        };

        // Envoyer l'e-mail
        let info = await transporter.sendMail(mailOptions);
        // Répondre avec un succès si l'e-mail est envoyé avec succès
        res.status(200).json({
            success: true,
            message: "E-mail de confirmation envoyé avec succès",
        });
    } catch (error) {
        // Répondre avec une erreur si une erreur se produit lors de l'envoi de l'e-mail
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'envoi de l'e-mail de confirmation",
            error: error.message,
        });
    }
}

module.exports = { sendConfirmationEmail };
