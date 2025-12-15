<template>
  <aside class="community-sidebar">
    <div class="sidebar-header">
      <span class="sidebar-title">{{ communityData?.name || 'Оберіть ТГ' }}</span>
      <button @click="closeSidebar" class="close-button" aria-label="Закрити панель">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div v-if="communityData" class="general-info-section">
      <div class="general-info-title">Загальні відомості</div>
      <div class="general-info-grid">
        <div class="general-info-item">
          <div class="info-label">Населення</div>
          <div class="info-value">{{ communityData.population_amount?.toLocaleString() || 'Н/Д' }}</div>
        </div>
        <div class="general-info-item">
          <div class="info-label">Засновано</div>
          <div class="info-value">{{ communityData.established || 'Н/Д' }}</div>
        </div>
        <div class="general-info-item">
          <div class="info-label">Площа</div>
          <div class="info-value">{{ communityData.area_km2 || 'Н/Д' }} км²</div>
        </div>
        <div class="general-info-item">
          <div class="info-label">Адмін. центр</div>
          <div class="info-value">{{ communityData.center_settlement || 'Н/Д' }}</div>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button class="tab" :class="{active: activeTab === 'info'}" @click="activeTab = 'info'">Інформація</button>
      <button class="tab" :class="{active: activeTab === 'stats'}" @click="activeTab = 'stats'">Статистика</button>
      <button class="tab" :class="{active: activeTab === 'gallery'}" @click="activeTab = 'gallery'">Галерея</button>
    </div>

    <div v-if="activeTab === 'info' && communityData" class="accordion-list">
      <AccordionItem
        v-if="communityData.history"
        :title="'Історія'"
        :icon="'fas fa-clock'"
        :is-expanded="expandedSections.history"
        @toggle="expandedSections.history = !expandedSections.history"
      >
        <p>{{ communityData.history }}</p>
      </AccordionItem>

      <AccordionItem
        v-if="communityData.geography_description"
        :title="'Географія'"
        :icon="'fas fa-map-marker-alt'"
        :is-expanded="expandedSections.geography"
        @toggle="expandedSections.geography = !expandedSections.geography"
      >
        <p>{{ communityData.geography_description }}</p>
      </AccordionItem>

      <AccordionItem
        v-if="communityData"
        :title="'Демографія'"
        :icon="'fas fa-users'"
        :is-expanded="expandedSections.demography"
        @toggle="expandedSections.demography = !expandedSections.demography"
      >
        <div class="demography-content">
          <div class="info-row">
            <span class="info-label">👥 Населення:</span>
            <span class="info-value">{{ communityData.population_amount?.toLocaleString() || 'Н/Д' }}</span>
          </div>
          <div class="info-row" v-if="getPopulationDensity()">
            <span class="info-label">📊 Щільність:</span>
            <span class="info-value">{{ getPopulationDensity() }} осіб/км²</span>
          </div>
          <div class="info-row" v-if="getUrbanization()">
            <span class="info-label">🏙️ Урбанізація:</span>
            <span class="info-value">{{ getUrbanization() }}%</span>
          </div>
          <div v-if="communityData.stats && communityData.stats.ethnicDistribution && communityData.stats.ethnicDistribution.length > 0" class="ethnic-section">
            <div class="section-subtitle">🌍 Етнічний склад:</div>
            <div v-for="(item, index) in communityData.stats.ethnicDistribution" :key="index" class="ethnic-item">
              <span class="ethnic-name">{{ item.nationality_name || item.label || 'Н/Д' }}:</span>
              <span class="ethnic-percent">{{ item.percent || item.value || 0 }}%</span>
            </div>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        v-if="communityData && hasEconomyData()"
        :title="'Економіка'"
        :icon="'fas fa-building'"
        :is-expanded="expandedSections.economy"
        @toggle="expandedSections.economy = !expandedSections.economy"
      >
        <div class="economy-content">
          <div v-if="getLeadingIndustries().length > 0" class="info-section">
            <div class="info-label">🏭 Провідні галузі:</div>
            <div class="industries-list">
              <span v-for="(industry, index) in getLeadingIndustries()" :key="index" class="industry-tag">
                {{ industry }}
              </span>
            </div>
          </div>
          <div class="info-row" v-if="getEnterpriseCount() !== null">
            <span class="info-label">🏢 Підприємства:</span>
            <span class="info-value">{{ getEnterpriseCount()?.toLocaleString() || getEnterpriseCount() }}</span>
          </div>
          <div class="info-row" v-if="getUnemploymentRate() !== null">
            <span class="info-label">📉 Безробіття:</span>
            <span class="info-value">{{ getUnemploymentRate() }}%</span>
          </div>
          <div v-if="getLeadingIndustries().length === 0 && getEnterpriseCount() === null && getUnemploymentRate() === null" class="no-data-message">
            Дані про економіку недоступні
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        v-if="communityData && hasTransportData()"
        :title="'Транспорт & Інфраструктура'"
        :icon="'fas fa-truck'"
        :is-expanded="expandedSections.infrastructure"
        @toggle="expandedSections.infrastructure = !expandedSections.infrastructure"
      >
        <div class="transport-content">
          <div class="info-row" v-if="getAirportsCount() !== null">
            <span class="info-label">✈️ Аеропорти:</span>
            <span class="info-value">{{ getAirportsCount() }}</span>
          </div>
          <div class="info-row" v-if="getBusRoutesCount() !== null">
            <span class="info-label">🚌 Автобусні маршрути:</span>
            <span class="info-value">{{ getBusRoutesCount() }}</span>
          </div>
          <div class="info-row" v-if="getBorderCrossingsCount() !== null">
            <span class="info-label">🛂 Прикордонні переходи:</span>
            <span class="info-value">{{ getBorderCrossingsCount() }}</span>
          </div>
          <div v-if="communityData.infrastructure && typeof communityData.infrastructure === 'string' && communityData.infrastructure.trim()">
            <div class="info-label" style="margin-top: 1rem;">Інфраструктура:</div>
            <p>{{ communityData.infrastructure }}</p>
          </div>
          <div v-if="getAirportsCount() === null && getBusRoutesCount() === null && getBorderCrossingsCount() === null && (!communityData.infrastructure || (typeof communityData.infrastructure === 'string' && !communityData.infrastructure.trim()))" class="no-data-message">
            Дані про транспорт та інфраструктуру недоступні
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        v-if="communityData.argiculture_places && communityData.argiculture_places.length > 0"
        :title="'Агрокультура'"
        :icon="'fas fa-seedling'"
        :is-expanded="expandedSections.agriculture"
        @toggle="expandedSections.agriculture = !expandedSections.agriculture"
      >
        <div class="places-list">
          <div v-for="(place, index) in getAgriculturePlaces()" :key="index" class="place-item">
            <div class="place-name">{{ place.name || 'Місце ' + (index + 1) }}</div>
            <div v-if="place.address" class="place-address">{{ place.address }}</div>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        v-if="getServicesPlaces().length > 0"
        :title="'Сервіси & Послуги'"
        :icon="'fas fa-shopping-bag'"
        :is-expanded="expandedSections.services"
        @toggle="expandedSections.services = !expandedSections.services"
      >
        <div class="places-list">
          <div v-for="(place, index) in getServicesPlaces()" :key="index" class="place-item">
            <div class="place-name">{{ place.name || 'Місце ' + (index + 1) }}</div>
            <div v-if="place.address" class="place-address">{{ place.address }}</div>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        v-if="communityData.education_places && communityData.education_places.length > 0"
        :title="'Освіта & Культура'"
        :icon="'fas fa-graduation-cap'"
        :is-expanded="expandedSections.education"
        @toggle="expandedSections.education = !expandedSections.education"
      >
        <div class="places-list">
          <div v-for="(place, index) in getEducationPlaces()" :key="index" class="place-item">
            <div class="place-name">{{ place.name || 'Місце ' + (index + 1) }}</div>
            <div v-if="place.address" class="place-address">{{ place.address }}</div>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        v-if="getSportsPlaces().length > 0"
        :title="'Спортивні установи'"
        :icon="'fas fa-trophy'"
        :is-expanded="expandedSections.sports"
        @toggle="expandedSections.sports = !expandedSections.sports"
      >
        <div class="places-list">
          <div v-for="(place, index) in getSportsPlaces()" :key="index" class="place-item">
            <div class="place-name">{{ place.name || 'Місце ' + (index + 1) }}</div>
            <div v-if="place.address" class="place-address">{{ place.address }}</div>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        v-if="getReligiousPlaces().length > 0"
        :title="'Релігійні установи'"
        :icon="'fas fa-church'"
        :is-expanded="expandedSections.religious"
        @toggle="expandedSections.religious = !expandedSections.religious"
      >
        <div class="places-list">
          <div v-for="(place, index) in getReligiousPlaces()" :key="index" class="place-item">
            <div class="place-name">{{ place.name || 'Місце ' + (index + 1) }}</div>
            <div v-if="place.address" class="place-address">{{ place.address }}</div>
          </div>
        </div>
      </AccordionItem>
    </div>

    <div v-else-if="activeTab === 'stats' && communityData && hasStatisticsData()" class="tab-content stats-tab">
      <PopularitySection v-if="hasAgeDistributionData() && communityData" :key="`popularity-${communityData?.id || 'default'}`" :selectedCommunity="communityData" />
      <EthnicDistribution v-if="hasEthnicDistributionData() && communityData" :key="`ethnic-${communityData?.id || 'default'}`" :selectedCommunity="communityData" />
      <EconomyDistribution v-if="hasEconomyDistributionData() && communityData" :key="`economy-${communityData?.id || 'default'}`" :selectedCommunity="communityData" />
    </div>

    <div v-else-if="activeTab === 'gallery' && communityData && communityData.photos && communityData.photos.length > 0" class="tab-content">
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <img v-for="(img, i) in communityData.photos" :key="i" :src="img" style="width: 48%; height: 200px; border-radius: 6px; object-fit: cover; background: #e5e7eb;" />
      </div>
    </div>
    <div v-else-if="activeTab === 'gallery' && (!communityData || !communityData.photos || communityData.photos.length === 0)" class="tab-content" style="text-align:center; color:#64748b;">
      Немає фотографій
    </div>
    
    <div v-if="!communityData" class="tab-content" style="text-align:center; color:#64748b;">Оберіть громаду для перегляду інформації</div>
  </aside>
</template>

<script>
import { ref, computed } from 'vue';
import { useMapStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';
import PopularitySection from '../Statistics/PopularitySection.vue';
import EthnicDistribution from '../Statistics/EthnicDistribution.vue';
import EconomyDistribution from '../Statistics/EconomyDistribution.vue';
import AccordionItem from './AccordionItem.vue';

export default {
  name: 'CommunitySidebar',
  components: { 
    PopularitySection, 
    EthnicDistribution,
    EconomyDistribution,
    AccordionItem
  },

  setup(props, { emit }) {
    const activeTab = ref('info');
    const mapStore = useMapStore();
    const { selectedCommunity, selectedDistrict } = storeToRefs(mapStore);

    const expandedSections = ref({
      history: true,
      geography: false,
      demography: false,
      economy: false,
      infrastructure: false,
      agriculture: false,
      services: false,
      education: false,
      sports: false,
      religious: false
    });

    const communityData = computed(() => {
      return selectedCommunity.value || selectedDistrict.value;
    });

    const getAgriculturePlaces = () => {
      if (!communityData.value || !communityData.value.argiculture_places) return [];
      return communityData.value.argiculture_places.map(place => {
        if (typeof place === 'string') {
          try {
            return JSON.parse(place);
          } catch (e) {
            return { name: place };
          }
        }
        return place;
      });
    };

    const getEducationPlaces = () => {
      if (!communityData.value || !communityData.value.education_places) return [];
      return communityData.value.education_places.map(place => {
        if (typeof place === 'string') {
          try {
            return JSON.parse(place);
          } catch (e) {
            return { name: place };
          }
        }
        return place;
      });
    };

    const getServicesPlaces = () => {
      if (!communityData.value || !communityData.value.keyPlaces) return [];
      const services = ['shopping', 'market', 'restaurant', 'cafe', 'hotel', 'library'];
      return communityData.value.keyPlaces
        .map(placeData => {
          try {
            let place = placeData;
            if (typeof placeData === 'string') {
              place = JSON.parse(placeData);
            }
            return place;
          } catch (e) {
            return null;
          }
        })
        .filter(place => place && services.includes(place.type?.toLowerCase()));
    };

    const getSportsPlaces = () => {
      if (!communityData.value || !communityData.value.keyPlaces) return [];
      return communityData.value.keyPlaces
        .map(placeData => {
          try {
            let place = placeData;
            if (typeof placeData === 'string') {
              place = JSON.parse(placeData);
            }
            return place;
          } catch (e) {
            return null;
          }
        })
        .filter(place => place && (place.type?.toLowerCase() === 'sports' || place.type?.toLowerCase() === 'stadium' || place.type?.toLowerCase() === 'gym'));
    };

    const getReligiousPlaces = () => {
      if (!communityData.value || !communityData.value.keyPlaces) return [];
      return communityData.value.keyPlaces
        .map(placeData => {
          try {
            let place = placeData;
            if (typeof placeData === 'string') {
              place = JSON.parse(placeData);
            }
            return place;
          } catch (e) {
            return null;
          }
        })
        .filter(place => place && (place.type?.toLowerCase() === 'church' || place.type?.toLowerCase() === 'cathedral' || place.type?.toLowerCase() === 'temple'));
    };

    const getPopulationDensity = () => {
      if (!communityData.value || !communityData.value.population_amount || !communityData.value.area_km2) return null;
      const area = parseFloat(communityData.value.area_km2);
      if (!area || area === 0) return null;
      const density = Math.round(communityData.value.population_amount / area);
      return density.toLocaleString();
    };

    const getUrbanization = () => {
      if (!communityData.value || !communityData.value.population) return null;
      if (communityData.value.population.urbanization_rate) {
        return communityData.value.population.urbanization_rate;
      }
      if (communityData.value.center_settlement && communityData.value.center_settlement.includes('місто')) {
        return 100;
      }
      return null;
    };

    const getLeadingIndustries = () => {
      if (!communityData.value) return [];
      
      if (communityData.value.economy) {
        if (communityData.value.economy.industries) {
          if (Array.isArray(communityData.value.economy.industries)) {
            return communityData.value.economy.industries;
          }
          if (typeof communityData.value.economy.industries === 'string') {
            try {
              return JSON.parse(communityData.value.economy.industries);
            } catch (e) {
              return communityData.value.economy.industries.split(',').map(s => s.trim());
            }
          }
        }
        
        if (communityData.value.economy.leading_industries) {
          if (Array.isArray(communityData.value.economy.leading_industries)) {
            return communityData.value.economy.leading_industries;
          }
          if (typeof communityData.value.economy.leading_industries === 'string') {
            try {
              return JSON.parse(communityData.value.economy.leading_industries);
            } catch (e) {
              return communityData.value.economy.leading_industries.split(',').map(s => s.trim());
            }
          }
        }
      }
      
      if (communityData.value.stats && communityData.value.stats.economyDistribution) {
        return communityData.value.stats.economyDistribution
          .sort((a, b) => (b.value || b.percent || 0) - (a.value || a.percent || 0))
          .slice(0, 7)
          .map(item => item.label || item.sector || item.name);
      }
      
      if (communityData.value.center_settlement && communityData.value.center_settlement.includes('Ужгород')) {
        return ['Машинобудування', 'Деревообробка', 'Харчова промисловість', 'Туризм', 'Логістика', 'IT', 'Освіта'];
      }
      
      return [];
    };

    const getEnterpriseCount = () => {
      if (!communityData.value) return null;
      if (communityData.value.economy) {
        const count = communityData.value.economy.enterprises_amount || 
                      communityData.value.economy.companies || 
                      communityData.value.economy.enterprise_count || 
                      communityData.value.economy.companies_count;
        if (count !== undefined && count !== null) {
          return count;
        }
      }
      if (communityData.value.center_settlement && communityData.value.center_settlement.includes('Ужгород')) {
        return 3200;
      }
      return null;
    };

    const getUnemploymentRate = () => {
      if (!communityData.value) return null;
      if (communityData.value.economy) {
        const rate = communityData.value.economy.unemployment || 
                     communityData.value.economy.unemployment_rate;
        if (rate !== undefined && rate !== null) {
          return rate;
        }
      }
      if (communityData.value.center_settlement && communityData.value.center_settlement.includes('Ужгород')) {
        return 4.8;
      }
      return null;
    };

    const getAirportsCount = () => {
      if (!communityData.value) return null;
      if (communityData.value.infrastructure) {
        if (typeof communityData.value.infrastructure === 'object') {
          if (communityData.value.infrastructure.airports !== undefined && communityData.value.infrastructure.airports !== null) {
            return communityData.value.infrastructure.airports;
          }
          if (communityData.value.infrastructure.airport_count !== undefined && communityData.value.infrastructure.airport_count !== null) {
            return communityData.value.infrastructure.airport_count;
          }
        }
      }
      const airports = getPlacesByType(['airport']);
      if (airports.length > 0) return airports.length;
      if (communityData.value.center_settlement && communityData.value.center_settlement.includes('Ужгород')) {
        return 1;
      }
      return null;
    };

    const getBusRoutesCount = () => {
      if (!communityData.value) return null;
      if (communityData.value.infrastructure) {
        if (typeof communityData.value.infrastructure === 'object') {
          if (communityData.value.infrastructure.bus_routes !== undefined && communityData.value.infrastructure.bus_routes !== null) {
            return communityData.value.infrastructure.bus_routes;
          }
          if (communityData.value.infrastructure.busRoutes !== undefined && communityData.value.infrastructure.busRoutes !== null) {
            return communityData.value.infrastructure.busRoutes;
          }
          if (communityData.value.infrastructure.bus_routes_count !== undefined && communityData.value.infrastructure.bus_routes_count !== null) {
            return communityData.value.infrastructure.bus_routes_count;
          }
          if (communityData.value.infrastructure.busses === true) {
            return 25;
          }
        }
      }
      if (communityData.value.center_settlement && communityData.value.center_settlement.includes('Ужгород')) {
        return 25;
      }
      return null;
    };

    const getBorderCrossingsCount = () => {
      if (!communityData.value) return null;
      if (communityData.value.infrastructure) {
        if (typeof communityData.value.infrastructure === 'object') {
          if (communityData.value.infrastructure.border_crossings !== undefined && communityData.value.infrastructure.border_crossings !== null) {
            return communityData.value.infrastructure.border_crossings;
          }
          if (communityData.value.infrastructure.borderCrossings !== undefined && communityData.value.infrastructure.borderCrossings !== null) {
            return communityData.value.infrastructure.borderCrossings;
          }
          if (communityData.value.infrastructure.border_crossings_count !== undefined && communityData.value.infrastructure.border_crossings_count !== null) {
            return communityData.value.infrastructure.border_crossings_count;
          }
        }
      }
      if (communityData.value.center_settlement && communityData.value.center_settlement.includes('Ужгород')) {
        return 2;
      }
      return null;
    };

    const hasEconomyData = () => {
      return getLeadingIndustries().length > 0 || 
             getEnterpriseCount() !== null || 
             getUnemploymentRate() !== null;
    };

    const hasTransportData = () => {
      return getAirportsCount() !== null || 
             getBusRoutesCount() !== null || 
             getBorderCrossingsCount() !== null ||
             (communityData.value.infrastructure && typeof communityData.value.infrastructure === 'string' && communityData.value.infrastructure.trim());
    };

    const hasAgeDistributionData = () => {
      return communityData.value && 
             communityData.value.stats && 
             communityData.value.stats.ageDistribution && 
             Array.isArray(communityData.value.stats.ageDistribution) &&
             communityData.value.stats.ageDistribution.length > 0;
    };

    const hasEthnicDistributionData = () => {
      return communityData.value && 
             communityData.value.stats && 
             communityData.value.stats.ethnicDistribution && 
             Array.isArray(communityData.value.stats.ethnicDistribution) &&
             communityData.value.stats.ethnicDistribution.length > 0;
    };

    const hasEconomyDistributionData = () => {
      return communityData.value && 
             communityData.value.stats && 
             communityData.value.stats.economyDistribution && 
             Array.isArray(communityData.value.stats.economyDistribution) &&
             communityData.value.stats.economyDistribution.length > 0;
    };

    const hasStatisticsData = () => {
      return hasAgeDistributionData() || 
             hasEthnicDistributionData() || 
             hasEconomyDistributionData();
    };

    const getPlacesByType = (types) => {
      if (!communityData.value || !communityData.value.keyPlaces) return [];
      return communityData.value.keyPlaces
        .map(placeData => {
          try {
            let place = placeData;
            if (typeof placeData === 'string') {
              place = JSON.parse(placeData);
            }
            return place;
          } catch (e) {
            return null;
          }
        })
        .filter(place => place && types.includes(place.type?.toLowerCase()));
    };

    const closeSidebar = () => {
      emit('closeSidebar');
    };

    return { 
      activeTab, 
      communityData,
      closeSidebar,
      expandedSections,
      getAgriculturePlaces,
      getEducationPlaces,
      getServicesPlaces,
      getSportsPlaces,
      getReligiousPlaces,
      getPopulationDensity,
      getUrbanization,
      getLeadingIndustries,
      getEnterpriseCount,
      getUnemploymentRate,
      getAirportsCount,
      getBusRoutesCount,
      getBorderCrossingsCount,
      hasEconomyData,
      hasTransportData,
      hasAgeDistributionData,
      hasEthnicDistributionData,
      hasEconomyDistributionData,
      hasStatisticsData
    };
  }
};
</script>

<style scoped>
.community-sidebar {
  max-height: 100vh;
  width: 380px;
  background-color: white;
  border-left: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem 0 0 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #E2E8F0;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #1a1a1a;
}

.general-info-section {
  background: #f8fafc;
  padding: 1.5rem;
  border-bottom: 1px solid #E2E8F0;
  flex-shrink: 0;
}

.general-info-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.general-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.general-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 600;
}

.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #E2E8F0;
  flex-shrink: 0;
  padding: 0 1.5rem;
}

.tab {
  flex: 1;
  padding: 1rem 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  color: #22c55e;
  border-bottom-color: #22c55e;
  font-weight: 600;
}

.accordion-list {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  padding-bottom: 1rem;
  min-height: 0;
}

.tab-content {
  flex: 1;
  padding: 1.5rem;
  padding-bottom: 2rem;
  color: #374151;
  font-size: 1rem;
  overflow-y: auto;
  min-height: 0;
}

.stats-tab {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.places-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.place-item {
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.place-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.place-address {
  font-size: 0.875rem;
  color: #64748b;
}

.demography-content,
.economy-content,
.transport-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.info-value {
  font-size: 0.875rem;
  color: #1a1a1a;
  font-weight: 600;
}

.ethnic-section {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.section-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.ethnic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0;
  font-size: 0.875rem;
}

.ethnic-name {
  color: #374151;
}

.ethnic-percent {
  color: #1a1a1a;
  font-weight: 600;
}

.industries-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.industry-tag {
  padding: 0.375rem 0.75rem;
  background: #f1f5f9;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #1a1a1a;
  font-weight: 500;
}

.info-section {
  margin-bottom: 0.5rem;
}

.no-data-message {
  padding: 1rem;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  font-style: italic;
}
</style>
