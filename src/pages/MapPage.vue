<template>
  <main class="map-page">
    <Header />
    <button v-if="!isOpenedDistricts || isMobile" @click="openDistrictsSidebar" class="open-districts-button" aria-label="Відкрити список районів">
      <i class="fas fa-list"></i>
    </button>
    <div class="map-container">
      <DistrictsSidebar v-if="isOpenedDistricts" @closeSidebar="closeDistrictsSidebar" @openSidebar="openSidebar" class="sidebar" />      
      
      <div id="map" class="map" :style="{ marginLeft: isOpenedDistricts ? '280px' : '0px', marginRight: isOpened ? '380px' : '0px' }"></div>
      
      <CommunitySidebar v-if="isOpened" @closeSidebar="closeSidebar" class="community-sidebar" />
    </div>
  </main>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import DistrictsSidebar from '../components/Map/DistrictsSidebar.vue';
import CommunitySidebar from '../components/Map/CommunitySidebar.vue';
import { onMounted, ref, watch, onUnmounted } from 'vue';
import L from 'leaflet';
import Header from '@/components/Header.vue';
import { useDistrictStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';

import defaultIcon from 'leaflet/dist/images/marker-icon.png';
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: defaultIcon,
  shadowUrl: defaultIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default {
  name: 'MapPage',
  components: {
    DistrictsSidebar,
    Header,
    CommunitySidebar
  },

  setup() {
    const map = ref(null);
    const isOpened = ref(false);
    const isOpenedDistricts = ref(false);
    const isMobile = ref(window.innerWidth <= 768);
    const districtStore = useDistrictStore();
    const { districts, selectedDistrict } = storeToRefs(districtStore);

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    const closeSidebar = () => {
      isOpened.value = false;
    };

    const closeDistrictsSidebar = () => {
      isOpenedDistricts.value = false;
    };

    const openSidebar = () => {
      isOpened.value = true;
    };

    const openDistrictsSidebar = () => {
      isOpenedDistricts.value = true;
    };

    onMounted(async () => {
      map.value = L.map('map', {
        center: [48.65, 22.26],
        zoom: 13,
        maxZoom: 18,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map.value);

      districtStore.setMockDistricts();
      // For production, use this:
      // await districtStore.fetchDistricts();

      if (districts.value && districts.value.length > 0) {
        districts.value.forEach(district => {
          const marker = L.marker([district.lat, district.lng], {
            opacity: 0.6,
            icon: DefaultIcon
          });

          marker.addTo(map.value);
          marker.bindPopup(`<b>${district.name}</b>`);
        });
      }

      isOpenedDistricts.value = true;
    });

    watch(selectedDistrict, (newDistrict) => {
      if (newDistrict && map.value) {
        map.value.setView([newDistrict.lat, newDistrict.lng], 18);
      }
    });

    return {
      districts,
      selectedDistrict,
      isOpened,
      isOpenedDistricts,
      isMobile,
      closeSidebar,
      closeDistrictsSidebar,
      openSidebar,
      openDistrictsSidebar
    };
  }
};
</script>

<style scoped>
.map-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.map-container {
  display: flex;
  overflow: hidden;
  flex: 1;
  position: relative;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
  z-index: 10;
}

.community-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 380px;
  background-color: white;
  border-left: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem 0 0 1rem;
  z-index: 10;
}

.map {
  flex: 1;
  height: 100vh;
}

.open-districts-button {
  position: fixed;
  top: 2.5rem;
  transform: translateY(-55%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #E2E8F0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.open-districts-button:hover {
  background-color: #F3F4F6;
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.open-districts-button i {
  font-size: 1.25rem;
  color: #374151;
}

@media (max-width: 768px) {
  .community-sidebar {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    border-left: 1px solid #E2E8F0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-radius: 1rem 0 0 1rem;
    z-index: 10;
  }

  .open-districts-button {
    top: 1rem;
    left: 1rem;
    width: 26px;
    height: 26px;
    transform: none;
  }

  .open-districts-button:hover {
    transform: scale(1.05);
  }
}
</style>
