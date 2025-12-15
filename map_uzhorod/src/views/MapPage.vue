<template>
  <div class="map-page">
    <div class="map-container">
      <MapComponent />
      <button 
        @click="toggleSidebar" 
        class="toggle-sidebar-button"
        :class="{ 'open': isSidebarOpen }"
      >
        <i class="fas" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
      <DistrictsSidebar 
        v-if="isSidebarOpen"
        @closeSidebar="toggleSidebar"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import MapComponent from '@/components/Map/MapComponent.vue';
import DistrictsSidebar from '@/components/Map/DistrictsSidebar.vue';

export default {
  name: 'MapPage',
  components: {
    MapComponent,
    DistrictsSidebar
  },
  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return {
      isSidebarOpen,
      toggleSidebar
    };
  }
};
</script>

<style scoped>
.map-page {
  width: 100%;
  height: 100vh;
  position: relative;
}

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.toggle-sidebar-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.toggle-sidebar-button:hover {
  background-color: #f8f9fa;
  transform: scale(1.05);
}

.toggle-sidebar-button.open {
  left: 280px;
}

@media (max-width: 768px) {
  .toggle-sidebar-button.open {
    left: 1rem;
  }
}
</style> 