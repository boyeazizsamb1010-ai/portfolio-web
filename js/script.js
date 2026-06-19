// === FONCTION 1 : MESSAGE DE BIENVENUE qui change selon la page ===
function afficherMessageBienvenue() {
    const page = window.location.pathname;
    let texte = "Bienvenue sur mon portfolio !";
// ces conditions permettent d'afficher un message de bienvenue différent en fonction de la page visitée.
    if (page.includes("index.html") || page === "/") {
        texte = "Bienvenue sur mon portfolio ! Découvrez qui je suis.";
    } else if (page.includes("apropos.html")) {
        texte = "Apprenez-en plus sur mon parcours et mes objectifs.";
    } else if (page.includes("competences.html")) {
        texte = "Découvrez mes compétences techniques.";
    } else if (page.includes("projets.html")) {
        texte = "Explorez mes projets réalisés.";
    } else if (page.includes("contact.html")) {
        texte = "Contactez-moi via ce formulaire.";
    }
// cette partie du code crée un élément div pour afficher le message de bienvenue, lui attribue un id et le texte approprié, puis l'insère dans la page juste après l'élément header. parce je ne veux pas toucher le fichier HTML pour ajouter ce message, je le fais dynamiquement avec JavaScript.
    const message = document.createElement("div");
    message.id = "message-bienvenue";
    message.textContent = texte;

    const header = document.querySelector("header");
    header.after(message);
}
// cet événement écoute le chargement complet du DOM (Document Object Model) et appelle la fonction afficherMessageBienvenue pour afficher le message de bienvenue approprié en fonction de la page visitée.
window.addEventListener("DOMContentLoaded", afficherMessageBienvenue);

// === FONCTION 2 : AFFICHER / MASQUER LES DÉTAILS ===
function gererAffichageDetails() {
    // On sélectionne TOUS les boutons dont l'id commence par "bouton-" ou "voir-plus-"
    const boutonsCompetences = document.querySelectorAll('[id^="bouton-"]');
    const boutonsProjets = document.querySelectorAll('[id^="voir-plus-"]');

    boutonsCompetences.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            // ex: "bouton-python" -> "python"
            const cle = bouton.id.replace("bouton-", "");
            const details = document.getElementById("details-" + cle);
            basculerAffichage(details, bouton);
        });
    });

    boutonsProjets.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            // ex: "voir-plus-projet1" -> "projet1"
            const cle = bouton.id.replace("voir-plus-", "");
            const details = document.getElementById("details-" + cle);
            basculerAffichage(details, bouton);
        });
    });
}

// Fonction utilitaire : bascule entre afficher / masquer
function basculerAffichage(details, bouton) {
    if (details.style.display === "none") {
        details.style.display = "block";
        bouton.textContent = "Voir moins";
    } else {
        details.style.display = "none";
        bouton.textContent = "Voir détails";
    }
}

window.addEventListener("DOMContentLoaded", gererAffichageDetails);

// === FONCTION 3 : VALIDATION DU FORMULAIRE DE CONTACT ===
function validerFormulaireContact() {
    const formulaire = document.getElementById("formulaire-de-contact");

    // Si on n'est pas sur la page contact, ce formulaire n'existe pas : on arrête ici
    if (!formulaire) {
        return;
    }

    formulaire.addEventListener("submit", function (event) {
        event.preventDefault(); // empêche le rechargement de la page

        const nom = document.getElementById("nom").value.trim();
        const prenom = document.getElementById("prenom").value.trim();
        const email = document.getElementById("email").value.trim();
        const sujet = document.getElementById("sujet").value.trim();
        const message = document.getElementById("message").value.trim();

        const zoneMessage = document.getElementById("message-envoye");

        // 1. Vérifier que tous les champs sont remplis
        if (nom === "" || prenom === "" || email === "" || sujet === "" || message === "") {
            afficherResultat(zoneMessage, "Veuillez remplir tous les champs.", "erreur");
            return;
        }

        // 2. Vérifier le format de l'email avec une expression régulière
        if (!email.includes("@") || !email.includes(".")) {
            afficherResultat(zoneMessage, "Adresse e-mail invalide. Exemple de format attendu : exemple@gmail.com", "erreur");
            return;
        }

        // 3. Si tout est valide : message de succès + envoi mailto
        afficherResultat(zoneMessage, "Message envoyé avec succès !", "succes");

        const sujetEncode = encodeURIComponent(sujet);
        const corpsEncode = encodeURIComponent(
            "Nom : " + nom + "\nPrénom : " + prenom + "\nEmail : " + email + "\n\n" + message
        );

        window.location.href = "mailto:tonadresse@email.com?subject=" + sujetEncode + "&body=" + corpsEncode;

        formulaire.reset(); // vide le formulaire après envoi
    });
}

// Fonction utilitaire : affiche le message d'erreur ou de succès
function afficherResultat(zone, texte, type) {
    zone.textContent = texte;
    zone.style.display = "block";
    zone.classList.remove("succes", "erreur");
    zone.classList.add(type);
}

window.addEventListener("DOMContentLoaded", validerFormulaireContact);