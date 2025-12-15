<template>
  <div class="accordion-item">
    <button 
      class="accordion-header" 
      @click="$emit('toggle')"
      :class="{ expanded: isExpanded }"
    >
      <div class="accordion-header-content">
        <i :class="icon" class="accordion-icon"></i>
        <span class="accordion-title">{{ title }}</span>
      </div>
      <i class="fas fa-chevron-down accordion-arrow" :class="{ rotated: isExpanded }"></i>
    </button>
    <div v-if="isExpanded" class="accordion-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle']
};
</script>

<style scoped>
.accordion-item {
  border-bottom: 1px solid #E2E8F0;
}

.accordion-header {
  width: 100%;
  padding: 1rem 1.5rem;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;
}

.accordion-header:hover {
  background: #f8fafc;
}

.accordion-header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.accordion-icon {
  color: #22c55e;
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

.accordion-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
}

.accordion-arrow {
  color: #64748b;
  font-size: 0.75rem;
  transition: transform 0.2s;
}

.accordion-arrow.rotated {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 1.5rem 1.5rem 3.5rem;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.6;
}

.accordion-content p {
  margin: 0 0 1rem 0;
}

.accordion-content p:last-child {
  margin-bottom: 0;
}
</style>

