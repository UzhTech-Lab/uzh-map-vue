<template>
  <main class="map-page">
    <Header />
    <button v-if="!isOpenedDistricts || isMobile" @click="openDistrictsSidebar" class="open-districts-button" aria-label="Відкрити список районів">
      <i class="fas fa-list"></i>
    </button>
    <button 
      @click="toggleLayersPanel" 
      class="toggle-layers-button" 
      :class="{ active: showLayersPanel, 'with-community': isOpened }"
      aria-label="Перемикач шарів карти"
      :title="showLayersPanel ? 'Приховати шари карти' : 'Показати шари карти'"
    >
      <i class="fas fa-layer-group"></i>
    </button>
    <div class="map-container">
      <DistrictsSidebar v-if="isOpenedDistricts" @closeSidebar="closeDistrictsSidebar" @openSidebar="openSidebar" class="sidebar" />
      
      <div id="map" class="map"></div>
      
      <MapLayersPanel 
        v-if="showLayersPanel" 
        @layer-change="onLayerChange"
        @category-toggle="onCategoryToggle"
        class="layers-panel"
        :class="{ 'with-community': isOpened }"
      />
      
      <CommunitySidebar v-if="isOpened" @closeSidebar="closeSidebar" class="community-sidebar" />
    </div>
    <footer class="map-footer">
      <div class="footer-content">
        <span class="footer-left">© 2025 Ужгородська міська рада. 🗺️ Інтерактивна карта</span>
        <span class="footer-right">🇺🇦 Офіційні дані</span>
      </div>
    </footer>
  </main>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import DistrictsSidebar from '../components/Map/DistrictsSidebar.vue';
import CommunitySidebar from '../components/Map/CommunitySidebar.vue';
import MapLayersPanel from '../components/Map/MapLayersPanel.vue';
import { onMounted, ref, watch, onUnmounted, nextTick } from 'vue';
import L from 'leaflet';
import Header from '@/components/Header.vue';
import { useMapStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';

import { getIconByType } from '@/utils/mapIcons';
import { validateCoordinates } from '@/utils/coordinates';

export default {
  name: 'MapPage',
  components: {
    DistrictsSidebar,
    Header,
    CommunitySidebar,
    MapLayersPanel
  },

  setup() {
    const map = ref(null);
    const mapInitialized = ref(false);
    const isOpened = ref(false);
    const isOpenedDistricts = ref(false);
    const isMobile = ref(window.innerWidth <= 768);
    const mapStore = useMapStore();
    const { districts, selectedDistrict, selectedCommunity } = storeToRefs(mapStore);
    const markers = ref([]);
    const polygons = ref([]);
    const showLayersPanel = ref(true);
    const activeMarkerCategories = ref([]);
    const currentTileLayer = ref(null);

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
      if (map.value && map.value.getContainer() && mapInitialized.value) {
        setTimeout(() => {
          try {
            if (map.value && map.value.getContainer()) {
              map.value.invalidateSize();
            }
          } catch (error) {
            console.warn('Error invalidating map size:', error);
          }
        }, 100);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      if (map.value) {
        map.value.remove();
        map.value = null;
        mapInitialized.value = false;
        window.leafletMap = null;
      }
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
      await nextTick();
      
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('Map element not found');
        return;
      }

      try {
        map.value = L.map('map', {
          center: [48.65, 22.26],
          zoom: 13,
          maxZoom: 18,
          zoomAnimation: false,
          fadeAnimation: false,
          markerZoomAnimation: false,
          zoomControl: true
        });

        currentTileLayer.value = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        });
        currentTileLayer.value.addTo(map.value);

        window.leafletMap = map.value;
        
        map.value.whenReady(() => {
          mapInitialized.value = true;
          
          const handleZoomError = (e) => {
            try {
              if (e && e.target && e.target.stop) {
                e.target.stop();
              }
            } catch (err) {
              console.warn('Error stopping zoom:', err);
            }
          };

          map.value.on('zoomstart', (e) => {
            try {
              if (!map.value || !map.value.getContainer() || !map.value._loaded) {
                handleZoomError(e);
                return;
              }
              const container = map.value.getContainer();
              if (!container || !container.parentElement || !container.offsetParent) {
                handleZoomError(e);
              }
            } catch (error) {
              console.warn('Error in zoomstart handler:', error);
              handleZoomError(e);
            }
          });

          map.value.on('zoom', (e) => {
            try {
              if (!map.value || !map.value.getContainer() || !map.value._loaded) {
                handleZoomError(e);
                return;
              }
              const container = map.value.getContainer();
              if (!container || !container.parentElement || !container.offsetParent) {
                handleZoomError(e);
              }
            } catch (error) {
              console.warn('Error in zoom handler:', error);
              handleZoomError(e);
            }
          });

          map.value.on('zoomend', () => {
            try {
              if (map.value && map.value.getContainer() && map.value._loaded) {
                setTimeout(() => {
                  try {
                    if (map.value && map.value.getContainer()) {
                      map.value.invalidateSize();
                    }
                  } catch (err) {
                    console.warn('Error invalidating size:', err);
                  }
                }, 100);
              }
            } catch (error) {
              console.warn('Error in zoomend handler:', error);
            }
          });
        });

        try {
          await mapStore.getAllDistricts();        
        } catch (error) {
          console.error('Failed to load districts:', error);
        }
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }

      if (districts.value && districts.value.length > 0) {
        districts.value.forEach(district => {
          if (district.center && district.center.latitude && district.center.longitude) {
            const validated = validateCoordinates(
              district.center.latitude,
              district.center.longitude,
              48.621,
              22.295
            );
            const lat = validated.lat;
            const lng = validated.lng;
            
            const marker = L.marker([lat, lng], {
              opacity: 0.7,
              icon: getIconByType('government')
            });

            marker.addTo(map.value);
            marker.bindPopup(`<b>${district.name}</b><br>${district.center_settlement || ''}`);
            marker.on('click', () => {
              if (map.value && mapInitialized.value) {
                mapStore.setSelectedDistrict(district);
              }
            });

            if (district.coordinates && district.coordinates.length > 0) {
              district.coordinates.forEach(polygon => {
                if (polygon && polygon.length > 0) {
                  const latLngs = polygon.map(coord => {
                    if (Array.isArray(coord) && coord.length >= 2) {
                      const lng = coord[0];
                      const lat = coord[1];
                      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                        return [lat, lng];
                      }
                      return [coord[1], coord[0]];
                    }
                    return null;
                  }).filter(coord => coord !== null);
                  
                  if (latLngs.length > 0) {
                    const polygon = L.polygon(latLngs, {
                      color: '#3B82F6',
                      fillColor: '#3B82F6',
                      fillOpacity: 0.2,
                      weight: 2
                    }).addTo(map.value).bindPopup(`<b>${district.name}</b>`);
                    polygons.value.push(polygon);
                  }
                }
              });
            }

            if (district.keyPlaces && Array.isArray(district.keyPlaces)) {
              district.keyPlaces.forEach(placeData => {
                try {
                  let place = placeData;
                  if (typeof placeData === 'string') {
                    place = JSON.parse(placeData);
                  }
                  if (place && place.latitude && place.longitude) {
                    const icon = getIconByType(place.type);
                    const placeMarker = L.marker([place.latitude, place.longitude], {
                      icon: icon,
                      opacity: 0.9,
                      markerType: place.type || 'default'
                    });
                    placeMarker.addTo(map.value);
                    markers.value.push(placeMarker);
                    const popupContent = createPlacePopup(place);
                    placeMarker.bindPopup(popupContent);
                  }
                } catch (error) {
                  console.warn('Error parsing keyPlace:', error, placeData);
                }
              });
            }

            if (district.education_places && Array.isArray(district.education_places)) {
              district.education_places.forEach(place => {
                try {
                  let eduPlace = place;
                  if (typeof place === 'string') {
                    eduPlace = JSON.parse(place);
                  }
                  if (eduPlace && eduPlace.latitude && eduPlace.longitude) {
                    const icon = getIconByType(eduPlace.type || 'school');
                    const eduMarker = L.marker([eduPlace.latitude, eduPlace.longitude], {
                      icon: icon,
                      opacity: 0.8
                    });
                    eduMarker.addTo(map.value);
                    markers.value.push(eduMarker);
                    eduMarker.bindPopup(`<b>${eduPlace.name || 'Освіта'}</b><br>${eduPlace.address || ''}`);
                  }
                } catch (error) {
                  console.warn('Error parsing education place:', error, place);
                }
              });
            }
          }
        });
      }

      isOpenedDistricts.value = true;
    });

    const createPlacePopup = (place) => {
      const typeLabels = {
        'church': 'Храми',
        'hospital': 'Лікарні',
        'school': 'Школи',
        'university': 'Університети',
        'restaurant': 'Ресторани',
        'cafe': 'Кафе',
        'park': 'Парки',
        'shopping': 'Магазини',
        'library': 'Бібліотеки',
        'sports': 'Спорт',
        'hotel': 'Готелі',
        'theater': 'Театри',
        'museum': 'Музеї',
        'government': 'Адміністрація',
        'market': 'Ринки',
        'bridge': 'Мости',
        'castle': 'Замки',
        'monument': 'Пам\'ятники',
        'sakura': 'Сакура',
        'linden': 'Липа',
        'square': 'Площі'
      };
      
      const typeLabel = typeLabels[place.type] || place.type || '';
      const coords = place.latitude && place.longitude ? `${place.latitude.toFixed(5)}, ${place.longitude.toFixed(5)}` : '';
      
      return `
        <div class="popup-content">
          <div class="popup-header">
            <i class="fas fa-${getIconName(place.type)}"></i>
            <h3>${place.name || 'Місце'}</h3>
            <button class="popup-close" onclick="if (window.leafletMap) window.leafletMap.closePopup()">×</button>
          </div>
          <p class="popup-description">${place.description || place.address || ''}</p>
          <div class="popup-info">
            <div class="popup-info-item">
              <i class="fas fa-map-pin"></i>
              <span>${place.address || 'Н/Д'}</span>
            </div>
            <div class="popup-info-item">
              <i class="fas fa-tag"></i>
              <span>${typeLabel}</span>
            </div>
            ${coords ? `<div class="popup-info-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${coords}</span>
            </div>` : ''}
          </div>
        </div>
      `;
    };

    const getIconName = (type) => {
      const iconMap = {
        'church': 'church',
        'hospital': 'hospital',
        'school': 'graduation-cap',
        'university': 'university',
        'restaurant': 'utensils',
        'cafe': 'coffee',
        'park': 'tree',
        'shopping': 'shopping-bag',
        'library': 'book',
        'sports': 'dumbbell',
        'hotel': 'bed',
        'theater': 'theater-masks',
        'museum': 'landmark',
        'government': 'building',
        'market': 'store',
        'bridge': 'bridge',
        'castle': 'chess-rook',
        'monument': 'monument',
        'sakura': 'seedling',
        'linden': 'leaf',
        'square': 'square'
      };
      return iconMap[type] || 'map-marker-alt';
    };

    const clearMarkers = () => {
      markers.value.forEach(marker => {
        if (map.value) {
          map.value.removeLayer(marker);
        }
      });
      markers.value = [];
    };

    const displayCommunityPlaces = (community) => {
      if (!community || !map.value || !mapInitialized.value) return;

      clearMarkers();

      if (community.keyPlaces && Array.isArray(community.keyPlaces)) {
        community.keyPlaces.forEach(placeData => {
          try {
            let place = placeData;
            if (typeof placeData === 'string') {
              place = JSON.parse(placeData);
            }
            if (place && place.latitude && place.longitude) {
              const icon = getIconByType(place.type);
              const placeMarker = L.marker([place.latitude, place.longitude], {
                icon: icon,
                opacity: 0.9,
                markerType: place.type || 'default'
              });
              placeMarker.addTo(map.value);
              markers.value.push(placeMarker);
              const popupContent = createPlacePopup(place);
              placeMarker.bindPopup(popupContent);
            }
          } catch (error) {
            console.warn('Error parsing keyPlace:', error, placeData);
          }
        });
      }

      if (community.education_places && Array.isArray(community.education_places) && community.education_places.length > 0) {
        community.education_places.forEach(place => {
          try {
            let eduPlace = place;
            if (typeof place === 'string') {
              eduPlace = JSON.parse(place);
            }
            if (eduPlace && eduPlace.latitude && eduPlace.longitude) {
              const icon = getIconByType(eduPlace.type || 'school');
              const eduMarker = L.marker([eduPlace.latitude, eduPlace.longitude], {
                icon: icon,
                opacity: 0.8,
                markerType: eduPlace.type || 'school'
              });
              eduMarker.addTo(map.value);
              markers.value.push(eduMarker);
              const popupContent = createPlacePopup(eduPlace);
              eduMarker.bindPopup(popupContent);
            }
          } catch (error) {
            console.warn('Error parsing education place:', error, place);
          }
        });
      }

      if (community.argiculture_places && Array.isArray(community.argiculture_places) && community.argiculture_places.length > 0) {
        community.argiculture_places.forEach(place => {
          try {
            let agriPlace = place;
            if (typeof place === 'string') {
              agriPlace = JSON.parse(place);
            }
            if (agriPlace && agriPlace.latitude && agriPlace.longitude) {
              const icon = getIconByType(agriPlace.type || 'park');
              const agriMarker = L.marker([agriPlace.latitude, agriPlace.longitude], {
                icon: icon,
                opacity: 0.8,
                markerType: agriPlace.type || 'park'
              });
              agriMarker.addTo(map.value);
              markers.value.push(agriMarker);
              const popupContent = createPlacePopup(agriPlace);
              agriMarker.bindPopup(popupContent);
            }
          } catch (error) {
            console.warn('Error parsing agriculture place:', error, place);
          }
        });
      }
    };

    watch(selectedDistrict, async (newDistrict) => {
      if (newDistrict && map.value && mapInitialized.value && newDistrict.center && newDistrict.center.latitude && newDistrict.center.longitude) {
        try {
          if (!map.value._loaded) {
            await new Promise((resolve) => {
              const timeout = setTimeout(() => resolve(), 1000);
              map.value.once('load', () => {
                clearTimeout(timeout);
                resolve();
              });
            });
          }
          
          const validated = validateCoordinates(
            newDistrict.center.latitude,
            newDistrict.center.longitude,
            48.621,
            22.295
          );
          const lat = validated.lat;
          const lng = validated.lng;
          
          if (map.value && map.value.getContainer() && mapInitialized.value && map.value._loaded) {
            try {
              map.value.setView([lat, lng], 15, {
                animate: false
              });
            } catch (error) {
              console.warn('Error setting map view:', error);
            }
          }
          
          await mapStore.fetchCommunityMemberById(newDistrict.id);
          isOpened.value = true;
        } catch (error) {
          console.error('Error updating map view:', error);
        }
      }
    });

    watch(selectedCommunity, (newCommunity) => {
      if (newCommunity && map.value && mapInitialized.value) {
        displayCommunityPlaces(newCommunity);
      }
    });

    const onLayerChange = (layerType) => {
      if (!map.value || !currentTileLayer.value || !mapInitialized.value) return;
      
      try {
        if (map.value.hasLayer(currentTileLayer.value)) {
          map.value.removeLayer(currentTileLayer.value);
        }
        
        let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        let attribution = '&copy; OpenStreetMap contributors';
        
        if (layerType === 'satellite') {
          url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
          attribution = '&copy; Esri';
        } else if (layerType === 'topo') {
          url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
          attribution = '&copy; OpenTopoMap';
        }
        
        currentTileLayer.value = L.tileLayer(url, { attribution });
        if (map.value && map.value.getContainer()) {
          currentTileLayer.value.addTo(map.value);
        }
      } catch (error) {
        console.error('Error changing map layer:', error);
      }
    };

    const onCategoryToggle = (categories) => {
      activeMarkerCategories.value = categories;
      filterMarkersByCategory();
    };

    const filterMarkersByCategory = () => {
      if (!map.value) return;
      
      markers.value.forEach(marker => {
        const markerType = marker.options.markerType;
        if (activeMarkerCategories.value.length === 0 || activeMarkerCategories.value.includes(markerType)) {
          if (!map.value.hasLayer(marker)) {
            marker.addTo(map.value);
          }
        } else {
          if (map.value.hasLayer(marker)) {
            map.value.removeLayer(marker);
          }
        }
      });
    };

    const toggleLayersPanel = () => {
      showLayersPanel.value = !showLayersPanel.value;
    };

    return {
      districts,
      selectedDistrict,
      selectedCommunity,
      isOpened,
      isOpenedDistricts,
      isMobile,
      showLayersPanel,
      closeSidebar,
      closeDistrictsSidebar,
      openSidebar,
      openDistrictsSidebar,
      onLayerChange,
      onCategoryToggle,
      toggleLayersPanel
    };
  }
};
</script>

<style scoped>
.map-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.map-container {
  display: flex;
  overflow: hidden;
  flex: 1;
  position: relative;
  padding-bottom: 0;
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
  z-index: 1000;
}

.map {
  flex: 1;
  height: 100vh;
}

.open-districts-button {
  position: fixed;
  top: 2.5rem;
  transform: translateY(-50%);
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

.toggle-layers-button {
  position: fixed;
  top: 80px;
  right: 1rem;
  width: 48px;
  height: 48px;
  background-color: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  color: #64748b;
}

.toggle-layers-button:hover {
  background-color: #f8fafc;
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toggle-layers-button.active {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.toggle-layers-button.active:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.toggle-layers-button.with-community {
  right: 400px;
}

@media (max-width: 768px) {
  .toggle-layers-button {
    top: 70px;
    right: 0.5rem;
    width: 40px;
    height: 40px;
  }
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
    z-index: 1000;
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

:deep(.custom-marker) {
  background: transparent !important;
  border: none !important;
}

:deep(.custom-marker div) {
  cursor: pointer;
  transition: transform 0.2s ease;
}

:deep(.custom-marker div:hover) {
  transform: rotate(-45deg) scale(1.1);
}

.layers-panel {
  position: fixed;
  top: 80px;
  right: 1rem;
  z-index: 1000;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.layers-panel.with-community {
  right: 400px;
}

:deep(.leaflet-popup-content-wrapper) {
  padding: 10px;
}

:deep(.leaflet-popup-content) {
  margin: 0;
  min-width: 250px;
}

:deep(.leaflet-popup-close-button) {
  display: none;
}

:deep(.popup-content) {
  padding: 10px;
}

:deep(.popup-header) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

:deep(.popup-header h3) {
  flex: 1;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

:deep(.popup-header i) {
  color: #3b82f6;
}

:deep(.popup-close) {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

:deep(.popup-close:hover) {
  color: #1a1a1a;
}

:deep(.popup-description) {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
}

:deep(.popup-info) {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

:deep(.popup-info-item) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

:deep(.popup-info-item i) {
  color: #ec4899;
  width: 16px;
}

.map-footer {
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  margin-top: auto;
  z-index: 1;
  position: relative;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.footer-left {
  flex: 1;
}

.footer-right {
  flex-shrink: 0;
}

.footer-content p {
  margin: 0.25rem 0;
}

.footer-content p:first-child {
  font-weight: 500;
  color: #374151;
}

@media (max-width: 768px) {
  .map-footer {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
}
</style>
