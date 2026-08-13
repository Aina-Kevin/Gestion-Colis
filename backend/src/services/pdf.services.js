const PDFDocument = require("pdfkit");
const prisma = require("../config/database");

// =========================
// Helpers de mise en page
// =========================

// Dessine une ligne horizontale sur toute la largeur utile
function ligneSeparation(doc) {
  const y = doc.y + 4;
  doc
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.width - doc.page.margins.right, y)
    .strokeColor("#000000")
    .lineWidth(0.75)
    .stroke();
  doc.moveDown(1);
}

// Dessine une section avec un LABEL en gras suivi d'une valeur,
// sur une seule colonne (ex: "FOR", "NOTES")
function sectionPleineLargeur(doc, label, valeur) {
  doc.fontSize(10).font("Helvetica-Bold").fillColor("#000000").text(label);
  doc.moveDown(0.3);
  doc
    .fontSize(11)
    .font("Helvetica")
    .text(valeur || "-");
  doc.moveDown(0.6);
  ligneSeparation(doc);
}

// Dessine une section à deux colonnes avec un LABEL en gras
// et une valeur en dessous, à gauche et à droite
function sectionDeuxColonnes(
  doc,
  labelGauche,
  valeurGauche,
  labelDroite,
  valeurDroite,
) {
  const largeurUtile =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const xGauche = doc.page.margins.left;
  const xDroite = doc.page.margins.left + largeurUtile / 2;
  const largeurColonne = largeurUtile / 2 - 10;

  const yDepart = doc.y;

  // Colonne gauche
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(labelGauche, xGauche, yDepart, { width: largeurColonne });
  doc
    .fontSize(11)
    .font("Helvetica")
    .text(valeurGauche || "-", xGauche, doc.y + 3, { width: largeurColonne });

  const yApresGauche = doc.y;

  // Colonne droite (repart du même y de départ)
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(labelDroite, xDroite, yDepart, { width: largeurColonne });
  doc
    .fontSize(11)
    .font("Helvetica")
    .text(valeurDroite || "-", xDroite, doc.y + 3, { width: largeurColonne });

  const yApresDroite = doc.y;

  // On se positionne après la colonne la plus haute
  doc.y = Math.max(yApresGauche, yApresDroite);
  doc.moveDown(0.6);
  ligneSeparation(doc);
}

// =========================
// Génération du reçu
// =========================

const genererRecu = async (idenvoi, res) => {
  const envoi = await prisma.envoyer.findUnique({
    where: {
      idenvoi: Number(idenvoi),
    },
    include: {
      voiture: {
        include: {
          itineraire: true,
        },
      },
      reception: true,
    },
  });

  if (!envoi) {
    return false;
  }

  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  const nomFichier = `recu-envoi-${envoi.idenvoi}.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${nomFichier}"`);

  doc.pipe(res);

  // =========================
  // TITRE
  // =========================

  doc.fontSize(22).font("Helvetica-Bold").text("REÇU DE PAIEMENT", {
    align: "center",
  });

  doc.moveDown(2);

  // =========================
  // BLOC ENTREPRISE / DATE
  // =========================

  const infosEntreprise = [
    "GESTICOLIS-MG",
    "Transport de colis - Coopératives taxi-brousse",
  ].join("\n");

  sectionDeuxColonnes(
    doc,
    "GESTICOLIS-MG",
    infosEntreprise,
    "DATE",
    envoi.date_envoi.toLocaleString("fr-FR"),
  );

  // =========================
  // REÇU DE / MONTANT
  // =========================

  sectionDeuxColonnes(
    doc,
    "REÇU DE",
    `${envoi.nomEnvoyeur}\n${envoi.emailEnvoyeur}`,
    "MONTANT",
    `${envoi.frais.toLocaleString("fr-FR")} Ar`,
  );

  // =========================
  // MONTANT / MODE DE TRANSPORT
  // =========================

  sectionDeuxColonnes(
    doc,
    "MONTANT",
    `${envoi.frais.toLocaleString("fr-FR")} Ar`,
    "TRANSPORT",
    `${envoi.voiture.design} (${envoi.voiture.idvoit})`,
  );

  // =========================
  // POUR (référence colis + itinéraire)
  // =========================

  sectionPleineLargeur(
    doc,
    "POUR",
    `Colis n° ${envoi.colis}\nItinéraire : ${envoi.voiture.itineraire.villedep} → ${envoi.voiture.itineraire.villearr}`,
  );

  // =========================
  // DESTINATAIRE
  // =========================

  sectionDeuxColonnes(
    doc,
    "DESTINATAIRE",
    envoi.nomRecepteur,
    "CONTACT",
    envoi.contactRecepteur,
  );

  // =========================
  // NOTES (statut de l'envoi)
  // =========================

  let notes;
  if (envoi.reception) {
    notes = `RÉCEPTIONNÉ\nDate de réception : ${envoi.reception.date_recept.toLocaleString("fr-FR")}`;
  } else {
    notes = "EN TRANSIT";
  }

  sectionPleineLargeur(doc, "NOTES", notes);

  // =========================
  // FOOTER
  // =========================

  doc.moveDown(2);
  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor("#555555")
    .text("Document généré automatiquement par GestiColis-MG", {
      align: "center",
    });

  doc.end();

  return true;
};

module.exports = {
  genererRecu,
};
