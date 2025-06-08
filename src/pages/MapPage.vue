<template>
  <main class="map-page">
    <Header />
    <div class="map-container">
      <DistrictsSidebar @openSidebar="openSidebar" class="sidebar" />
      
      <div id="map" class="map" :style="{ marginRight: isOpened ? '380px' : '0px' }"></div>
      
      <CommunitySidebar v-if="isOpened" @closeSidebar="closeSidebar" class="community-sidebar" />
    </div>
  </main>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import DistrictsSidebar from '../components/Map/DistrictsSidebar.vue';
import CommunitySidebar from '../components/Map/CommunitySidebar.vue';
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import Header from '@/components/Header.vue';
import { useDistrictStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';

// Import marker icons
import defaultIcon from 'leaflet/dist/images/marker-icon.png';
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the default icon issue
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
    const districtStore = useDistrictStore();
    const { districts, selectedDistrict } = storeToRefs(districtStore);

    const closeSidebar = () => {
      isOpened.value = false;
    };

    const openSidebar = () => {
      isOpened.value = true;
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

      isOpened.value = true;
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
      closeSidebar,
      openSidebar
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
  margin-left: 280px;
}
</style>
