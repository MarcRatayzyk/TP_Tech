<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['delete', 'open'])

const labels = {
  urgent: 'Urgente',
  important: 'Importante',
  normal: 'Normale',
  low: 'Faible',
  high: 'Haute',
  medium: 'Moyenne',
}
</script>

<template>
  <article
    class="task-card"
    :class="card.priority ? `task-card--${card.priority}` : ''"
    @click="emit('open', card)"
  >
    <header class="task-card-header">
      <h3 class="task-card-title">{{ card.title }}</h3>
      <span
        v-if="card.priority"
        class="task-card-priority"
        :class="`priority--${card.priority}`"
      >
        {{ labels[card.priority] ?? card.priority }}
      </span>
    </header>
    <p v-if="card.description" class="task-card-desc">{{ card.description }}</p>
    <p v-if="card.status === 'done'" class="badge-done">Terminée</p>
    <footer v-if="card.status !== 'done'" class="task-card-footer">
      <button class="btn-delete" type="button" @click.stop="emit('delete')">
        Supprimer
      </button>
    </footer>
  </article>
</template>

<style scoped>
.task-card {
  padding: 0.85rem 1rem;
  margin-bottom: 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.task-card--urgent,
.task-card--high {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.35);
}

.task-card--important {
  background: rgba(251, 146, 60, 0.08);
  border-color: rgba(251, 146, 60, 0.35);
}

.task-card--normal,
.task-card--medium {
  background: rgba(96, 165, 250, 0.08);
  border-color: rgba(96, 165, 250, 0.35);
}

.task-card--low {
  background: rgba(74, 222, 128, 0.08);
  border-color: rgba(74, 222, 128, 0.35);
}

.task-card:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.task-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.task-card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
}

.task-card-desc {
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.85;
  margin-bottom: 0.75rem;
}

.badge-done {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  margin-bottom: 0.5rem;
  border-radius: 999px;
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.task-card-priority {
  flex-shrink: 0;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.priority--urgent,
.priority--high {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.priority--important {
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
}

.priority--normal,
.priority--medium {
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.priority--low {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.task-card-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.25rem;
}

.btn-delete {
  font-size: 0.8rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.45);
  color: #f87171;
}

.btn-delete:active {
  transform: scale(0.98);
}
</style>
