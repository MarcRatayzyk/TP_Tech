const form = document.getElementById("alert-form");
const tableBody = document.getElementById("alerts-tbody");
const messageZone = document.getElementById("msg-form");

let nextId = tableBody.querySelectorAll("tr").length +1;

form.addEventListener("submit",function(event){ //on ecoute le submit du formulaire
    event.preventDefault();

    const port = document.getElementById("port").value.trim();//recuperation valeur port
    const ipSource =document.getElementById("ip_source").value.trim(); //recuperation ip source
    const type = document.getElementById("type"); //recuperation du select type
    const severite = document.getElementById("severite");//recuperation valeur severite
    const actionChoisie = document.querySelector('input[name="action"]:checked');//recuperation valeur action choisie

    if (port === "") {//message d'erreur
        showMessage("Le port est obligatoire.", "erreur");
        return;
    }

    if (ipSource === "") {
        showMessage("L'IP source est obligatoire.", "erreur");
        return;
    }

    if (!actionChoisie) {
        showMessage("Veuillez choisir une action (autoriser ou bloquer).", "erreur");
        return;
    }

    const newRow = document.createElement("tr");//creation nouvelle ligne
    const id= String(nextId).padStart(3,"0");
    nextId++;

    const today = new Date();//creation date
    const dateStr =
        String(today.getDate()).padStart(2, "0") + "/" +
        String(today.getMonth() + 1).padStart(2, "0") + "/" +
        today.getFullYear();

    const typeLabel = type.options[type.selectedIndex].text;//recuperation texte valeur selectionnee
    const severiteLabel = severite.options[severite.selectedIndex].text;


    newRow.innerHTML =//creation contenu ligne
        "<td>" + id + "</td>" +
        "<td>" + dateStr + "</td>" +
        "<td>" + ipSource + "</td>" +
        "<td>" + typeLabel + " (port " + port + ")</td>" +
        "<td>" + severiteLabel + " - " + actionChoisie.value + "</td>";

    tableBody.appendChild(newRow);//ajout ligne

    showMessage("Alerte ajoutée avec succes.", "succes"); //message de confirmation
    form.reset();
});

function showMessage(text, type) {//fonction pour afficher le message
    messageZone.textContent = text;
    messageZone.className = "msg-form " + type;
}



