<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Введіть назву району..."
      class="search-input"
      v-model="searchQuery"
    />
    <button
      class="search-button"
      aria-label="Search"
      @click="handleSearch"
    >
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useDistrictStore } from '@/store/map.store';

export default {
  name: 'SearchInput',
  setup() {
    const searchQuery = ref('');
    const districtStore = useDistrictStore();

    const handleSearch = () => {
      districtStore.filterDistricts(searchQuery.value);
    };

    return {
      searchQuery,
      handleSearch
    };
  }
}
</script>

<style scoped>
.search-container {
  position: relative;
}

.search-input {
  padding: 0.5rem 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  background-color: white;
  border: 1px solid #E2E8F0;
  color: #1a1a1a;
  transition: all 0.2s ease-in-out;
}

.search-input::placeholder {
  color: #64748b;
}

.search-input:focus {
  outline: none;
  border-color: #E2E8F0;
  box-shadow: 0 0 0 1px #E2E8F0;
}

.search-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
  border: 1px solid #E2E8F0;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.search-button:hover {
  background-color: #e5e7eb;
}
</style>