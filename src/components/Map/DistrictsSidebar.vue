<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <h2 class="sidebar-title">Райони ({{ filteredDistricts.length }} / {{ districts.length }} показані) 
        <button @click="closeSidebar" class="close-button" aria-label="Закрити панель">
          <i class="fas fa-times"></i>
        </button>
      </h2>
      
      <ul class="districts-list">
        <li v-for="district in filteredDistricts" :key="district.name" class="district-item">
          <button 
            class="district-button"
            :class="{ 'active': selectedDistrict?.name === district.name }"
            @click="selectDistrict(district)"
          >
            {{ district.name }}
          </button>
        </li>
      </ul>
    </nav>

    <Loader :is-loading="isLoading" />
  </aside>
</template>

<script>
import { useDistrictStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';
import Loader from '.././Loader.vue';

export default {
  name: 'DistrictsSidebar',
  components: {
    Loader
  },
  
  setup(props, { emit }) {
    const districtStore = useDistrictStore();
    const { districts, filteredDistricts, selectedDistrict, isLoading } = storeToRefs(districtStore);

    const selectDistrict = (district) => {
      districtStore.setSelectedDistrict(district);
      emit('openSidebar');
    };

    const closeSidebar = () => {
      emit('closeSidebar');
    };

    return {
      districts,
      filteredDistricts,
      selectedDistrict,
      selectDistrict,
      isLoading,
      closeSidebar
    };
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  height: 100%;
  width: 280px;
  background-color: white;
  border-right: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 0 1rem 1rem 0;
  z-index: 10;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 1rem;
  width: 100%;
}

.sidebar-title {
  width: 100%;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.districts-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 255px;
}

.district-item {
  margin-bottom: 0.75rem;
}

.district-button {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4B5563;
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.district-button:hover {
  background-color: #F3F4F6;
  border-color: #D1D5DB;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.district-button.active {
  background-color: #EFF6FF;
  border-color: #3B82F6;
  color: #1E40AF;
  font-weight: 600;
}

.district-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>