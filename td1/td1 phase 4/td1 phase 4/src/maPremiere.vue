<script setup>
import { reactive, ref } from 'vue'

const typeLabels = {
  intrusion: 'Intrusion',
  scan: 'Scan de port',
  ddos: 'DDoS'
}

const severiteLabels = {
  faible: 'Faible',
  moyenne: 'Moyenne',
  elevee: 'Élevée'
}

const alerts = ref([ //tableau des alertes de securité
  {
    id: '001',
    date: '03/05/2026',
    ipSource: '192.168.1.10',
    type: 'Intrusion',
    port: '443',
    severite: 'Haute',
    action: 'bloquer'
  },
  {
    id: '002',
    date: '03/05/2026',
    ipSource: '10.0.0.5',
    type: 'Scan de port',
    port: '80',
    severite: 'Moyenne',
    action: 'autoriser'
  }
])

const form = reactive({ //données du formulaire d'ajout
  port: '',
  ipSource: '',
  type: 'intrusion',
  severite: 'faible',
  action: ''
})

const formMessage = reactive({//creation message formulaire
  text: '',
  type: ''
})

let nextId = alerts.value.length + 1 //compteur pour les id

function showMessage(text, type) { //affiche un message sous le formulaire
  formMessage.text = text
  formMessage.type = type
}

function getTodayDate() { //retourne la date du jour formattée
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  return day + '/' + month + '/' + year
}

function resetForm() { //reinitialise les champs du formulaire
  form.port = ''
  form.ipSource = ''
  form.type = 'intrusion'
  form.severite = 'faible'
  form.action = ''
}

function handleSubmit() { //gere la soumission du formulaire
  const port = String(form.port).trim()
  const ipSource = form.ipSource.trim()

  if (port === '') {//message d'erreur
    showMessage('Le port est obligatoire.', 'erreur')
    return
  }

  if (ipSource === '') {
    showMessage("L'IP source est obligatoire.", 'erreur')
    return
  }

  if (!form.action) {
    showMessage('Veuillez choisir une action (Autoriser ou Bloquer).', 'erreur')
    return
  }

  const id = String(nextId).padStart(3, '0')//creation id
  nextId++

  alerts.value.push({//ajout alert au tableau
    id: id,
    date: getTodayDate(),
    ipSource: ipSource,
    type: typeLabels[form.type],
    port: port,
    severite: severiteLabels[form.severite],
    action: form.action
  })

    showMessage('Alerte ajoutée avec succes.', 'succes')
  resetForm() //reinitialisation du formulaire
}
</script>

<template>
  <header>
    <div class="carre-logo">LOGO</div>
    <h1>Serveur Securité - Monitoring</h1>
  </header>
  <main>
    <section>
      <h2>Alertes de securité</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>IP Source</th>
            <th>Type</th>
            <th>Sévérité</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alert in alerts" :key="alert.id">
            <td>{{ alert.id }}</td>
            <td>{{ alert.date }}</td>
            <td>{{ alert.ipSource }}</td>
            <td>{{ alert.type }} (port {{ alert.port }})</td>
            <td>{{ alert.severite }} - {{ alert.action }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section>
      <h2>Ajouter une règle</h2>
      <form @submit.prevent="handleSubmit">
        <div class="une-ligne-form">
          <label for="port">Port :</label>
          <input id="port" v-model="form.port" type="number" name="port">
        </div>

        <div class="une-ligne-form">
          <label for="ip_source">IP Source :</label>
          <input id="ip_source" v-model="form.ipSource" type="text" name="ip_source">
        </div>

        <div class="une-ligne-form">
          <label for="type">Type :</label>
          <select id="type" v-model="form.type" name="type">
            <option value="intrusion">Intrusion</option>
            <option value="scan">Scan de port</option>
            <option value="ddos">DDoS</option>
          </select>
        </div>

        <div class="une-ligne-form">
          <label for="severite">Sévérité :</label>
          <select id="severite" v-model="form.severite" name="severite">
            <option value="faible">Faible</option>
            <option value="moyenne">Moyenne</option>
            <option value="elevee">Élevée</option>
          </select>
        </div>

        <div class="une-ligne-form">
          <span>Action :</span>
        </div>

        <div class="les-radios">
          <input id="autoriser" v-model="form.action" type="radio" name="action" value="autoriser">
          <label for="autoriser">Autoriser</label>

          <input id="bloquer" v-model="form.action" type="radio" name="action" value="bloquer">
          <label for="bloquer">Bloquer</label>
        </div>

        <button type="submit">Ajouter</button>
        <p class="msg-form" :class="formMessage.type">{{ formMessage.text }}</p>
      </form>
    </section>
    <section>
      <h2>Veille securité</h2>
      <article>
        <h3>Nouvelle faille détectée</h3>
        <p>Une vulnérabilité critique a été identifiée sur certains serveurs web.</p>
        <a href="">Lire le rapport</a>
      </article>
      <article>
        <h3>Mise à jour de sécurité</h3>
        <p>Un correctif important est disponible pour les systemes Linux.</p>
        <a href="">Voir les détails</a>
      </article>
    </section>
  </main>
</template>


<style scoped>
header {
    background-color: #1f2f3f;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 14px 26px;
}

.carre-logo {
    width: 155px;
    height: 130px;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1f2f3f;
    font-size: 14px;
    font-weight: bold;
}

h1 {
    margin: 0;
    font-size: 40px;
    font-weight: 700;
}

main {
    padding: 18px 24px 12px;
}

section {
    margin-bottom: 18px;
}

h2 {
    margin: 0 0 10px;
    font-size: 40px;
}

table {
    width: 70%;
    border-collapse: collapse;
    margin-bottom: 16px;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: 23px;
}

th {
    background-color: #f5f5f5;
}

form {
    font-size: 32px;
    max-width: 600px;
}

.une-ligne-form {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
}

label {
    min-width: 120px;
}

input[type="text"],
input[type="number"],
select {
    font-size: 24px;
    padding: 4px 6px;
}

.les-radios {
    margin: 8px 0 14px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 30px;
}

button {
    background-color: #2f95ea;
    color: #ffffff;
    border: 1px solid #2f95ea;
    padding: 7px 14px;
    font-size: 22px;
    cursor: pointer;
}

article {
    border: 1px solid #dcdcdc;
    padding: 10px;
    margin-bottom: 8px;
    font-size: 30px;
}

h3 {
    margin: 0 0 8px;
    font-size: 35px;
}

article p {
    margin: 0 0 8px;
}

article a {
    color: #165dce;
    font-weight: 600;
}

.msg-form {
    margin-top: 10px;
    font-size: 22px;
    font-weight: 600;
    min-height: 26px;
}

.msg-form.succes {
    color: #166534;
}

.msg-form.erreur {
    color: #991b1b;
}
</style>
