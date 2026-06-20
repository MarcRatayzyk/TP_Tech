<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

const title = ref('')
const description = ref('')
const showForm = ref(false)
const emit = defineEmits(['add-task'])

const priorityOptions = [
  { value: 'urgent', label: 'Urgente' },
  { value: 'important', label: 'Importante' },
  { value: 'normal', label: 'Normale' },
  { value: 'low', label: 'Faible' },
]

const priority = ref('normal')

function closeModal() {
  showForm.value = false
}

function onSubmit() {
  const trimmed = title.value.trim()
  if (!trimmed) return

  emit('add-task', {
    title: trimmed,
    description: description.value.trim(),
    priority: priority.value,
    status: 'todo',
  })

  title.value = ''
  description.value = ''
  priority.value = 'normal'
  showForm.value = false
}
</script>

<template>
  <div class="add-form">
    <button v-if="!showForm" type="button" class="btn-open" @click="showForm = true">
      Ajouter une tache
    </button>

    <BaseModal :show="showForm" @close="closeModal">
      <h2 id="modal-title" class="modal-title">Nouvelle tâche</h2>
      <form @submit.prevent="onSubmit">
        <input id="task-title" v-model="title" type="text" placeholder="Entrez le titre" />
        <input
          id="task-description"
          v-model="description"
          type="text"
          placeholder="Entrez la description"
        />
        <label for="task-priority">Priorité</label>
        <select id="task-priority" v-model="priority">
          <option v-for="opt in priorityOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <div class="modal-actions">
          <button type="submit" class="btn-submit" :disabled="!title.trim()">Ajouter</button>
          <button type="button" class="btn-cancel" @click="closeModal">Annuler</button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<style scoped>
.btn-open {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-heading);
}

.modal-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--color-heading);
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

.modal-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-submit {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
}

.btn-cancel {
  border: 1px solid var(--color-border);
  background: transparent;
}

.btn-submit {
  border: none;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
