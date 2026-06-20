<script setup>
import { ref, watch, computed } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  card: { type: Object, default: null },
  nextStatusLabel: { type: String, default: '' },
})

const emit = defineEmits(['close', 'advance', 'update'])

const priorityLabels = {
  urgent: 'Urgente',
  important: 'Importante',
  normal: 'Normale',
  low: 'Faible',
  high: 'Haute',
  medium: 'Moyenne',
}

const isEditing = ref(false)//mode édition
const editTitle = ref('')
const editDescription = ref('')
const editPriority = ref('normal')

const priorityOptions = [
  { value: 'urgent', label: 'Urgente' },
  { value: 'important', label: 'Importante' },
  { value: 'normal', label: 'Normale' },
  { value: 'low', label: 'Faible' },
]

const showModal = computed(() => props.card !== null)//affiche le modal si carte existe

watch(//surveille les changements de la carte
  () => props.card,
  (newCard) => {
    isEditing.value = false
    if (!newCard) return
    editTitle.value = newCard.title
    editDescription.value = newCard.description ?? ''
    editPriority.value = newCard.priority ?? 'normal'
  }
)

function startEdit() {//mode édition
  isEditing.value = true
}

function cancelEdit() {//annuler l'édition
  if (!props.card) return
  editTitle.value = props.card.title
  editDescription.value = props.card.description ?? ''
  editPriority.value = props.card.priority ?? 'normal'
  isEditing.value = false
}

function saveEdit() {//enregistrer l'édition
  const trimmed = editTitle.value.trim()
  if (!trimmed || !props.card) return

  emit('update', {
    id: props.card.id,
    title: trimmed,
    description: editDescription.value.trim(),
    priority: editPriority.value,
  })

  isEditing.value = false
}
</script>

<template>
  <BaseModal :show="showModal" @close="emit('close')">
    <template v-if="card"><!--si carte existe-->
      <template v-if="!isEditing"><!--si mode édition false-->
        <h2 class="modal-title">{{ card.title }}</h2>
        <p class="modal-desc">
          {{ card.description || 'Aucune description' }}
        </p>
        <p v-if="card.priority" class="modal-priority">
          Priorité : {{ priorityLabels[card.priority] ?? card.priority }}
        </p>
        <p v-if="card.status === 'done'" class="badge-done">Terminée</p>

        <div class="modal-actions">
          <button type="button" class="btn-edit" @click="startEdit">
            Modifier
          </button>
          <button
            v-if="nextStatusLabel"
            type="button"
            class="btn-advance"
            @click="emit('advance', card.id)"
          >
            Passer à : {{ nextStatusLabel }}
          </button>
          <button type="button" class="btn-cancel" @click="emit('close')">
            Fermer
          </button>
        </div>
      </template>

      <!-- MODE ÉDITION -->
      <template v-else>
        <h2 class="modal-title">Modifier la tâche</h2>
        <form @submit.prevent="saveEdit">
          <label for="edit-title">Titre</label>
          <input id="edit-title" v-model="editTitle" type="text" />
          <label for="edit-description">Description</label>
          <input id="edit-description" v-model="editDescription" type="text" />
          <label for="edit-priority">Priorité</label>
          <select id="edit-priority" v-model="editPriority">
            <option
              v-for="opt in priorityOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>

          <div class="modal-actions">
            <button type="submit" class="btn-advance" :disabled="!editTitle.trim()">
              Enregistrer
            </button>
            <button type="button" class="btn-cancel" @click="cancelEdit">
              Annuler
            </button>
          </div>
        </form>
      </template>
    </template>
  </BaseModal>
</template>

<style scoped>
.modal-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--color-heading);
}

.modal-desc {
  margin-bottom: 1rem;
  color: var(--color-text);
  line-height: 1.5;
}

.modal-priority {
  font-size: 0.85rem;
  opacity: 0.8;
  margin-bottom: 1.25rem;
}

.badge-done {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  margin-bottom: 1rem;
  border-radius: 999px;
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.btn-advance {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  cursor: pointer;
}

.btn-cancel {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.btn-edit {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background-soft);
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
}
</style>
