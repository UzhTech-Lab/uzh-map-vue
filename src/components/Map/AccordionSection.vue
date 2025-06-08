<template>
  <div>
    <button class='accordion-header' @click="open = !open">
      <i :class="icon"></i>
      <span>{{ title }}</span>
      <i class="fas" :class="open ? 'fa-chevron-up chevron' : 'fa-chevron-down chevron'"></i>
    </button>
    <div v-if='open' class='accordion-body'>
      <p>{{ mock }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionSection',
  props: {
    icon: String,
    title: String,
    mock: String
  },
  data() {
    return {
      open: false
    };
  }
};
</script>

<style scoped>
.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  padding: 1rem 0;
  font-size: 1rem;
  color: #22223b;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.accordion-header .chevron {
  margin-left: auto;
  color: #64748b;
  font-size: 1.1em;
}
.accordion-header:hover {
  background: #f3f4f6;
}
.accordion-body {
  padding: 0.75rem 1.5rem 1rem 2.5rem;
  background: #f8fafc;
  color: #374151;
  font-size: 0.97rem;
  border-radius: 0 0 0.5rem 0.5rem;
}
</style> 