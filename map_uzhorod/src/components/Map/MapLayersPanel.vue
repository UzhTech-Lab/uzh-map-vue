<template>
  <div class="layers-panel">
    <div class="panel-section">
      <h3 class="section-title">Шари карти</h3>
      <div class="radio-group">
        <label class="radio-option" :class="{ active: selectedLayer === 'streets' }">
          <input type="radio" value="streets" v-model="selectedLayer" @change="onLayerChange" />
          <span>Вулиці</span>
        </label>
        <label class="radio-option" :class="{ active: selectedLayer === 'satellite' }">
          <input type="radio" value="satellite" v-model="selectedLayer" @change="onLayerChange" />
          <span>Супутник</span>
        </label>
        <label class="radio-option" :class="{ active: selectedLayer === 'topo' }">
          <input type="radio" value="topo" v-model="selectedLayer" @change="onLayerChange" />
          <span>Топо</span>
        </label>
      </div>
    </div>

    <div class="panel-section">
      <h3 class="section-title">Маркери</h3>
      <div class="marker-categories">
        <div
          v-for="category in markerCategories"
          :key="category.type"
          class="category-item"
          :class="{ active: activeCategories.includes(category.type) }"
          @click="toggleCategory(category.type)"
        >
          <i :class="category.icon"></i>
          <span>{{ category.label }}</span>
        </div>
        <div class="category-more">
          <span>+{{ markerCategories.length - 6 }} більше</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MapLayersPanel',
  emits: ['layer-change', 'category-toggle'],
  setup(props, { emit }) {
    const selectedLayer = ref('streets');
    const activeCategories = ref([]);

    const markerCategories = ref([
      { type: 'government', label: 'Адміністрац', icon: 'fas fa-building' },
      { type: 'university', label: 'Університет', icon: 'fas fa-university' },
      { type: 'school', label: 'Школи', icon: 'fas fa-graduation-cap' },
      { type: 'hospital', label: 'Лікарні', icon: 'fas fa-hospital' },
      { type: 'church', label: 'Храми', icon: 'fas fa-church' },
      { type: 'castle', label: 'Замки', icon: 'fas fa-chess-rook' },
      { type: 'restaurant', label: 'Ресторани', icon: 'fas fa-utensils' },
      { type: 'cafe', label: 'Кафе', icon: 'fas fa-coffee' },
      { type: 'park', label: 'Парки', icon: 'fas fa-tree' },
      { type: 'shopping', label: 'Магазини', icon: 'fas fa-shopping-bag' },
      { type: 'library', label: 'Бібліотеки', icon: 'fas fa-book' },
      { type: 'sports', label: 'Спорт', icon: 'fas fa-dumbbell' },
      { type: 'hotel', label: 'Готелі', icon: 'fas fa-bed' },
      { type: 'theater', label: 'Театри', icon: 'fas fa-theater-masks' },
      { type: 'museum', label: 'Музеї', icon: 'fas fa-landmark' },
      { type: 'market', label: 'Ринки', icon: 'fas fa-store' },
      { type: 'bridge', label: 'Мости', icon: 'fas fa-bridge' },
      { type: 'monument', label: 'Пам\'ятники', icon: 'fas fa-monument' },
      { type: 'sakura', label: 'Сакура', icon: 'fas fa-seedling' },
      { type: 'linden', label: 'Липа', icon: 'fas fa-leaf' },
      { type: 'square', label: 'Площі', icon: 'fas fa-square' }
    ]);

    const onLayerChange = () => {
      emit('layer-change', selectedLayer.value);
    };

    const toggleCategory = (type) => {
      const index = activeCategories.value.indexOf(type);
      if (index > -1) {
        activeCategories.value.splice(index, 1);
      } else {
        activeCategories.value.push(type);
      }
      emit('category-toggle', activeCategories.value);
    };

    return {
      selectedLayer,
      activeCategories,
      markerCategories,
      onLayerChange,
      toggleCategory
    };
  }
};
</script>

<style scoped>
.layers-panel {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 280px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  padding-bottom: 0;
  z-index: 1000;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.panel-section {
  margin-bottom: 1.5rem;
}

.panel-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.2s;
}

.radio-option:hover {
  background: #f8fafc;
}

.radio-option.active {
  background: #eff6ff;
  color: #2563eb;
}

.radio-option input[type="radio"] {
  margin: 0;
}

.marker-categories {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.2s;
}

.category-item:hover {
  background: #f8fafc;
}

.category-item.active {
  background: #eff6ff;
  color: #2563eb;
}

.category-item i {
  width: 20px;
  text-align: center;
}

.category-more {
  padding: 0.5rem;
  padding-bottom: 1rem;
  color: #64748b;
  font-size: 0.875rem;
  font-style: italic;
  margin-bottom: 0.5rem;
}
</style>

