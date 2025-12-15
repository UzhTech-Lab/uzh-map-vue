<template>
  <div class="map-controls">
    <div class="search-section">
      <div class="search-input-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
          placeholder="Пошук місць..."
          class="search-input"
        />
      </div>
      <button class="markers-button" @click="showMarkersMenu = !showMarkersMenu">
        <i class="fas fa-eye"></i>
        <span>Маркери</span>
      </button>
      <button class="filter-button" @click="showFilterMenu = !showFilterMenu">
        <i class="fas fa-filter"></i>
      </button>
      <div class="dropdown-menu" v-if="showFilterMenu">
        <button class="dropdown-item">
          <i class="fas fa-building"></i>
          <span>Всі</span>
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MapControls',
  emits: ['search', 'filter-change'],
  setup(props, { emit }) {
    const searchQuery = ref('');
    const showMarkersMenu = ref(false);
    const showFilterMenu = ref(false);

    const handleSearch = () => {
      emit('search', searchQuery.value);
    };

    return {
      searchQuery,
      showMarkersMenu,
      showFilterMenu,
      handleSearch
    };
  }
};
</script>

<style scoped>
.map-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search-section {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  color: #64748b;
  font-size: 0.875rem;
}

.search-input {
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 200px;
  outline: none;
}

.search-input:focus {
  border-color: #3b82f6;
}

.markers-button,
.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.markers-button:hover,
.filter-button:hover {
  background: #f8fafc;
  border-color: #3b82f6;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px;
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
}

.dropdown-item:hover {
  background: #f8fafc;
}
</style>

