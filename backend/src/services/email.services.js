const nodemailer = require("nodemailer");

// ==========================================
// CONFIGURATION DU TRANSPORTEUR SMTP
// ==========================================

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ==========================================
// ENVOYER EMAIL DE RÉCEPTION
// ==========================================

const envoyerNotificationReception = async (envoi, reception) => {
  const mailOptions = {
    from: `"GestiColis" <${process.env.SMTP_USER}>`,

    to: envoi.emailEnvoyeur,

    subject: `GestiColis - Votre colis ${envoi.colis} est arrivé`,

    text: `
Bonjour ${envoi.nomEnvoyeur},

Nous vous informons que votre colis est arrivé à destination.

Informations du colis :

Numéro d'envoi : ${envoi.idenvoi}
Référence colis : ${envoi.colis}

Expéditeur : ${envoi.nomEnvoyeur}
Destinataire : ${envoi.nomRecepteur}

Voiture : ${envoi.voiture.idvoit}
Itinéraire : ${envoi.voiture.itineraire.villedep} → ${envoi.voiture.itineraire.villearr}

Date d'envoi : ${envoi.date_envoi.toLocaleString("fr-FR")}

Date de réception : ${reception.date_recept.toLocaleString("fr-FR")}

Frais : ${envoi.frais.toLocaleString("fr-FR")} Ar

Merci d'avoir utilisé GestiColis.

Cordialement,
L'équipe GestiColis
        `,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  envoyerNotificationReception,
};
