<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>Райони</h2>
      <button @click="$emit('closeSidebar')" class="close-button" aria-label="Закрити">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="sidebar-content">
      <div v-if="loading" class="loading">
        <i class="fas fa-spinner fa-spin"></i> Завантаження...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="!districts || districts.length === 0" class="no-data">
        Немає доступних районів
      </div>
      <div v-else class="districts-list">
        <div
          v-for="district in districts"
          :key="district.id"
          class="district-item"
          :class="{ active: selectedDistrict?.id === district.id }"
          @click="selectDistrict(district)"
        >
          <div class="district-info">
            <h3>{{ district.name }}</h3>
          </div>
          <div class="district-stats">
            <div class="stat">
              <i class="fas fa-users"></i>
              <span>{{ district.population_amount?.toLocaleString() || 'Н/Д' }}</span>
            </div>
            <div class="stat">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ district.area_km2 || 'Н/Д' }} км²</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMapStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';

export default {
  name: 'DistrictsSidebar',
  emits: ['closeSidebar', 'openSidebar'],
  
  setup() {
    const mapStore = useMapStore();
    const { districts, selectedDistrict, loading, error } = storeToRefs(mapStore);

    const selectDistrict = async (district) => {
      try {
        mapStore.setSelectedDistrict(district);
      } catch (err) {
        console.error('Error selecting district:', err);
      }
    };

    return {
      districts,
      selectedDistrict,
      loading,
      error,
      selectDistrict
    };
  }
};
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: calc(100vh - 46px - 72px);
  background-color: white;
  border-right: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #F1F5F9;
  color: #1E293B;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 2rem;
}

.districts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.district-item {
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.district-item:hover {
  border-color: #3B82F6;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.district-item.active {
  border-color: #3B82F6;
  background-color: #EFF6FF;
}

.district-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.district-stats {
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748B;
}

.stat i {
  color: #3B82F6;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #64748B;
  padding: 2rem;
}

.error {
  color: #EF4444;
  padding: 1rem;
  text-align: center;
  background-color: #FEF2F2;
  border-radius: 0.5rem;
}

.no-data {
  color: #64748B;
  padding: 2rem;
  text-align: center;
}

.sidebar {
  z-index: 1001;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1001;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>