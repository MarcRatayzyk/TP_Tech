<script setup>
defineProps({//definition des props
  show: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['close'])//definition des events
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">//afficher le modal si show true
    <div class="modal-box" role="dialog" aria-modal="true">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-box {
  width: 100%;
  max-width: 420px;
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
</style>
