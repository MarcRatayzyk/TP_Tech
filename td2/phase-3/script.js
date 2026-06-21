const form = document.getElementById("alert-form");
const section = document.getElementById("section");
const messageZone = document.getElementById("msg-form");
const searchInput = document.getElementById("search");
const emptyMsg = document.getElementById("empty-msg");
//on vient de recuperer les elements du DOM pour le formulaire
let nextId = section.querySelectorAll(".carte-article").length + 1;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = document.getElementById("nom").value.trim();//recuperation des valeurs
    const desc = document.getElementById("desc").value.trim();
    const prix = document.getElementById("prix").value.trim();
    const quantSelect = document.getElementById("quant");
    const quantValue = quantSelect.value;
    const quantLabel = quantSelect.options[quantSelect.selectedIndex].text;

    if (nom === "") {//message d'erreur
        showMessage("Le nom de l'article est obligatoire.", "erreur");
        return;
    }

    if (prix === "") {
        showMessage("Le prix est obligatoire.", "erreur");
        return;
    }

    let classePastille = "vert-stock";
    if (quantValue === "moyenne") {
        classePastille = "jaune-stock";
    } else if (quantValue === "elevee") {
        classePastille = "rouge-stock";
    }

    const article = document.createElement("article");//creation nouvel article
    article.className = "carte-article";
    article.innerHTML =//creation contenu article
        '<span class="petit-numero">' + nextId + '</span>' +
        '<h2>' + nom + '</h2>' +
        '<p>' + (desc || "Aucune description.") + '</p>' +
        '<p class="texte-prix">Prix : ' + prix + 'EUR</p>' +
        '<span class="pastille-couleur ' + classePastille + '">Statut : ' + quantLabel + '</span>';

    section.appendChild(article);//ajout article au html
    nextId++;

    showMessage("Article ajouté avec succes.", "succes");
    form.reset();
    filtrerProduits();
});

searchInput.addEventListener("input", filtrerProduits);

function filtrerProduits() { //fonction qui filtre les produit affichés
    const texte = searchInput.value.toLowerCase();//recuperation valeur recherche
    const cards = section.querySelectorAll(".carte-article");//recuperation des cartes
    let visible = 0;

    cards.forEach(function (card) {//boucle pour afficher les cartes
        if (card.textContent.toLowerCase().includes(texte)) {//si le texte est dans la carte
            card.style.display = "";
            visible++;
        } else {
            card.style.display = "none";
        }
    });

    if (visible === 0 && texte !== "") {
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";
    }
}

function showMessage(text, type) {
    messageZone.textContent = text;
    messageZone.className = "msg-form " + type;
}
