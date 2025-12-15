<template>
  <button 
    class="common-button"
    :class="[size, { 'with-icon': $slots.icon }]"
    v-bind="$attrs"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MPButton',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
  }
}
</script>

<style scoped>
.common-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #1a1a1a;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
}

.common-button:hover {
  background-color: #f8f9fa;
  border-color: rgba(0, 0, 0, 0.2);
}

.common-button.with-icon {
  gap: 0.5rem;
}

/* Sizes */
.common-button.sm {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.common-button.md {
  padding: 0.75rem 1rem;
  font-size: 1rem;
}

.common-button.lg {
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
}
</style>