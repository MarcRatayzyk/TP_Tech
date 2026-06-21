<script setup>
import { computed, reactive, ref } from 'vue'

const searchText = ref('')

const form = reactive({
  nom: '',
  desc: '',
  prix: '',
  quant: 'faible'
})

const formMessage = reactive({
  text: '',
  type: ''
})

let nextId = 5

const produits = ref([
  {
    id: 1,
    nom: 'Clavier mécanique',
    desc: 'Clavier RGB avec switches rapides pour gaming et bureautique.',
    prix: '79',
    statut: 'En stock',
    classePastille: 'vert-stock'
  },
  {
    id: 2,
    nom: 'Souris ergonomique',
    desc: 'Souris sans fil avec précision haute performance.',
    prix: '39',
    statut: 'Rupture de stock',
    classePastille: 'rouge-stock'
  },
  {
    id: 3,
    nom: 'Ecran 24 pouces',
    desc: 'Ecran Full HD ideal pour le travail et le multimedia.',
    prix: '149',
    statut: 'En stock',
    classePastille: 'vert-stock'
  },
  {
    id: 4,
    nom: 'Casque audio',
    desc: 'Casque confortable avec reduction de bruit active.',
    prix: '89',
    statut: 'Stock faible',
    classePastille: 'jaune-stock'
  }
])

const statutLabels = {
  faible: 'En stock',
  moyenne: 'Faible stock',
  elevee: 'Rupture de stock'
}

const produitsFiltres = computed(function () { //filtre les produits selon la recherche
  const texte = searchText.value.toLowerCase() //texte saisie dans la barre
  if (texte === '') { //si rien n'est tapé on affiche tout
    return produits.value
  }
  return produits.value.filter(function (p) { //parcours chaque produit
    return (
      p.nom.toLowerCase().includes(texte) ||
      p.desc.toLowerCase().includes(texte) ||
      p.prix.includes(texte)
    )
  })
})

function showMessage(text, type) {//fonction pour afficher le message
  formMessage.text = text
  formMessage.type = type
}

function trouverPastille(quant) { //choisi la couleur de la pastille
  if (quant === 'moyenne') return 'jaune-stock'
  if (quant === 'elevee') return 'rouge-stock'
  return 'vert-stock'
}

function ajouterProduit() { //ajoute un nouveau produit a la liste
  if (form.nom.trim() === '') {//message d'erreur
    showMessage('Le nom de l\'article est obligatoire.', 'erreur')
    return
  }
  if (form.prix.trim() === '') {
    showMessage('Le prix est obligatoire.', 'erreur')
    return
  }

  produits.value.push({ //nouvel element dans le tableau
    id: nextId,
    nom: form.nom.trim(),
    desc: form.desc.trim() || 'Aucune description.',
    prix: form.prix.trim(),
    statut: statutLabels[form.quant],
    classePastille: trouverPastille(form.quant)
  })

  nextId++
  showMessage('Article ajouté avec succes.', 'succes')

  form.nom = ''
  form.desc = ''
  form.prix = ''
  form.quant = 'faible'
}
</script>


<template>
  <header class="barre-du-stock">
    <h1>Gestionnaire de produit</h1>
    <input v-model="searchText" type="search" placeholder="Rechercher un produit...">
  </header>

  <main>
    <section>
      <h2>Ajouter un articles</h2>
      <form @submit.prevent="ajouterProduit"><!-- soumission du formulaire -->
        <div class="une-ligne-form">
          <label for="nom">nom article :</label>
          <input id="nom" v-model="form.nom" type="text">
        </div>

        <div class="une-ligne-form">
          <label for="description">Description :</label>
          <input id="desc" v-model="form.desc" type="text">
        </div>

        <div class="une-ligne-form">
          <label for="prix">Prix:</label>
          <input id="prix" v-model="form.prix" type="text">
        </div>

        <div class="une-ligne-form">
          <label for="quant">quantité:</label>
          <select id="quant" v-model="form.quant">
            <option value="faible">En stock</option>
            <option value="moyenne">Faible stock</option>
            <option value="elevee">Rupture de stock</option>
          </select>
        </div>

        <button type="submit">Ajouter</button>
        <p class="msg-form" :class="formMessage.type">{{ formMessage.text }}</p>
      </form>
    </section>

    <section class="grille-articles">
      <article
        v-for="produit in produitsFiltres"
        :key="produit.id"
        class="carte-article"
      >
        <span class="petit-numero">{{ produit.id }}</span>
        <h2>{{ produit.nom }}</h2>
        <p>{{ produit.desc }}</p>
        <p class="texte-prix">Prix : {{ produit.prix }}EUR</p>
        <span class="pastille-couleur" :class="produit.classePastille">Statut : {{ produit.statut }}</span>
      </article>
    </section>

    <p v-if="produitsFiltres.length === 0 && searchText !== ''" class="msg-vide">
      Aucun produit ne correspond a la recherche.
    </p>
  </main>
</template>



<style scoped>
.barre-du-stock {
    background-color: #123d87;
    color: #ffffff;
    padding: 18px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.barre-du-stock h1 {
    margin: 0;
    font-size: 34px;
    font-weight: 700;
}

.barre-du-stock input {
    border: 1px solid #d0d8e5;
    border-radius: 8px;
    padding: 10px 12px;
    min-width: 240px;
    font-size: 16px;
}

main {
    padding: 22px;
    background-color: #f4f7fb;
    min-height: 100vh;
}

main > section:first-of-type h2 {
    margin: 0 0 14px;
    font-size: 1.35rem;
    font-weight: 700;
    color: #123d87;
}

form {
    max-width: 480px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px 22px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
    margin-bottom: 28px;
}

.une-ligne-form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
}

label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #334155;
}

input,
select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 1rem;
    background: #f8fafc;
}

button {
    margin-top: 6px;
    padding: 10px 22px;
    background: #123d87;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
}

.msg-form {
    margin-top: 12px;
    font-size: 0.9rem;
    font-weight: 600;
}

.msg-form.succes {
    color: #166534;
}

.msg-form.erreur {
    color: #991b1b;
}

.grille-articles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 18px;
}

.carte-article {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.petit-numero {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background-color: #d90303;
    color: #ffffff;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 8px;
}

.carte-article h2 {
    margin: 4px 0 8px;
    font-size: 27px;
}

.carte-article p {
    margin: 0 0 8px;
    font-size: 22px;
}

.texte-prix {
    font-weight: bold;
    color: #0f3b84;
}

.pastille-couleur {
    display: inline-block;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 21px;
    font-weight: 700;
}

.vert-stock {
    background-color: #dcfce7;
    color: #166534;
}

.rouge-stock {
    background-color: #fee2e2;
    color: #991b1b;
}

.jaune-stock {
    background-color: #fff7d6;
    color: #9a6d00;
}

.msg-vide {
    text-align: center;
    padding: 30px;
    color: #64748b;
    font-size: 18px;
}
</style>
