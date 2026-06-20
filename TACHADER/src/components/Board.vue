<script setup>
import { ref, watch, computed } from 'vue'
import BoardColumn from './BoardColumn.vue'
import AddForm from './addForm.vue'
import TaskDetailModal from './TaskDetailModal.vue'

const STORAGE_KEY = 'boardData'
const selectedCard = ref(null)

const columns = [//definition des colonnes
  {status:'todo', title:'A faire'},
  {status:'doing', title:'En cours'},
  {status:'done', title:'Terminé'},
]

const statusOrder = ['todo','doing','done']//ordre des états
const statusLabels = {
  todo:'En cours',
  doing:'Terminé',
  done: null,
}

const defaultCards = [//cartes exmple
  {id:1,title:'Tâche 1',status:'todo',priority:'urgent',description:'ex1'},
  {id:2,title:'Tâche 2',status:'doing',priority:'normal',description:'ex2'},
]

function loadCards() {//permet de charger les cartes apres refresh
  const savedData = localStorage.getItem(STORAGE_KEY)//recupere les données du localStorage
  if (!savedData) return defaultCards//si rien on fait rien

  try {
    const parsed = JSON.parse(savedData)//parse les données
    return Array.isArray(parsed) ? parsed : (parsed.cards ?? defaultCards)//si array on retourne parsed sinon on retourne parsed.cards ?? defaultCards
  } catch {
    return defaultCards//si erreur on retourne defaultCards
  }
}

const cards = ref(loadCards())

watch(//watch permet de surveiller les changements des cartes
  cards,
  (newCards) => {
    localStorage.setItem(//enregistre les données dans le localStorage
      STORAGE_KEY,
      JSON.stringify({ columns, cards: newCards })//stringify les données
    )
  },
  { deep: true }//deep true pour surveiller les changements des cartes
)

const cardsByColumn = computed(() => {//computed permet de calculer les cartes par colonne
  return columns.reduce((acc, col) => {//reduce permet de calculer les cartes par colonne
    acc[col.status] = cards.value.filter((c) => c.status === col.status)//filter permet de filtrer les cartes par colonne
    return acc//retourne acc
  }, {})//retourne acc
})

const stats = computed(() => {//permet de calculer des stats cb de tache total cb faite et poucentage
  const total = cards.value.length
  const done = cards.value.filter((c) => c.status === 'done').length
  const percent = total === 0 ? 0 : Math.round((done/total)*100)//calcul du pourcentage
  return { total, done, percent }
})

function deleteCard(id) {//supprime une carte
  cards.value = cards.value.filter((c) => c.id !== id)
  if (selectedCard.value?.id === id) {
    selectedCard.value = null
  }
}

function addCard(payload) {//ajoute une carte
  cards.value.push({
    id: Date.now(),
    title: payload.title,
    description: payload.description ?? '',
    status: payload.status ?? 'todo',
    priority: payload.priority ?? 'normal',
  })
}

function openCard(card) {//ouvre une carte
  selectedCard.value = card
}

function closeModal() {//ferme le modal
  selectedCard.value = null
}

function nextStatusLabel(status) {
  const idx = statusOrder.indexOf(status)
  const next = statusOrder[idx+1]
  return next ? statusLabels[status] : ''
}

function advanceCard(id) {//avance une carte dans les états
  const card = cards.value.find((c) => c.id === id)
  if (!card) return
  const idx = statusOrder.indexOf(card.status)
  if (idx < statusOrder.length-1) {
    card.status = statusOrder[idx+1]//prochain état
  }
  if (card.status === 'done') {
    selectedCard.value = null
  } else {
    selectedCard.value = { ...card }
  }
}

function updateCard(payload) {//met à jour une carte
  const card = cards.value.find((c) => c.id === payload.id)
  if (!card) return

  card.title = payload.title
  card.description = payload.description
  card.priority = payload.priority
  selectedCard.value = { ...card }
}
</script>

<template>
  <div class="board-wrapper">
    <div class="board-toolbar">
      <AddForm @add-task="addCard" />
      <p class="board-stats"><!--ligne contenant les stats-->
        {{ stats.total }} tâche(s) — {{ stats.done }} terminée(s) ({{ stats.percent }} %)
      </p>
    </div>

    <div class="board">
      <BoardColumn
        v-for="col in columns"
        :key="col.status"
        :title="col.title"
        :status="col.status"
        :cards="cardsByColumn[col.status]"
        @delete-card="deleteCard"
        @open-card="openCard"
      />
    </div>

    <TaskDetailModal
      :card="selectedCard"
      :next-status-label="selectedCard ? nextStatusLabel(selectedCard.status) : ''"
      @close="closeModal"
      @advance="advanceCard"
      @update="updateCard"
    />
  </div>
</template>

<style scoped>
.board-wrapper {
  width: 100%;
}
.board-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.board-stats {
  font-size: 0.9rem;
  opacity: 0.85;
  margin: 0;
}

.board {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
</style>
