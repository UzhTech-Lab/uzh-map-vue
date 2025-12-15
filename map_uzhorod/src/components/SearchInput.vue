<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Пошук місць..."
      class="search-input"
    />
    <div v-if="showResults && filteredDistricts.length > 0" class="search-results">
      <div
        v-for="district in filteredDistricts"
        :key="district.id"
        class="search-result-item"
        @click="selectDistrict(district)"
      >
        {{ district.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useMapStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';

export default {
  name: 'SearchInput',
  
  setup() {
    const searchQuery = ref('');
    const showResults = ref(false);
    const mapStore = useMapStore();
    const { districts } = storeToRefs(mapStore);

    const filteredDistricts = computed(() => {
      if (!searchQuery.value) return [];
      return districts.value.filter(district =>
        district.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const handleSearch = () => {
      showResults.value = true;
    };

    const selectDistrict = (district) => {
      mapStore.setSelectedDistrict(district);
      searchQuery.value = '';
      showResults.value = false;
    };

    watch(searchQuery, (newValue) => {
      if (!newValue) {
        showResults.value = false;
      }
    });

    return {
      searchQuery,
      showResults,
      filteredDistricts,
      handleSearch,
      selectDistrict
    };
  }
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #1E293B;
  background-color: white;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border: 1px solid #E2E8F0;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 50;
}

.search-result-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: #F1F5F9;
}

@media (max-width: 768px) {
  .search-container {
    max-width: 100%;
  }
}
</style>