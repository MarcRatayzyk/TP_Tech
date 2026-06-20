<script setup>
import TaskCard from './TaskCard.vue';


const props = defineProps({
    title:{
        type:String,
        required:true,
    },
    status :{
        type:String,
        required:true,
    },
    cards:{
        type:Array,
        default:()=>[]
    },
})
const emit = defineEmits(['delete-card', 'open-card'])
</script>

<template>
    <section class="column">
        <h2 class="column-title">{{title}}</h2>

        <TaskCard
            v-for="card in cards"
            :key="card.id"
            :card="card"
            @delete="emit('delete-card',card.id)"
            @open="emit('open-card', card)"
        />
        <p v-if="cards.length === 0" class="column-empty">Aucune Tâche</p>

    </section>
</template>

<style scoped>
.column {
  flex: 1;
  min-width: 260px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
}
.column-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}
.column-empty {
  font-size: 0.9rem;
  opacity: 0.7;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.column-title {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}
</style>