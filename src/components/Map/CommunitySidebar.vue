<template>
  <aside class="community-sidebar">
    <div class="sidebar-header">
      <span class="sidebar-title">{{ selectedDistrict?.name || 'Оберіть ТГ' }}</span>
      <button @click="closeSidebar" class="close-button" aria-label="Закрити панель">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div v-if="selectedDistrict" class="general-info-card">
      <div class="general-info-title">Загальні відомості</div>
      <div class="general-info-grid">
        <div class="general-info-item">
          <div class="label">Населення</div>
          <div class="value">{{ selectedDistrict.general.population }}</div>
        </div>
        <div class="general-info-item">
          <div class="label">Площа</div>
          <div class="value">{{ selectedDistrict.general.area }}</div>
        </div>
        <div class="general-info-item">
          <div class="label">Засновано</div>
          <div class="value">{{ selectedDistrict.general.founded }}</div>
        </div>
        <div class="general-info-item">
          <div class="label">Адмін. центр</div>
          <div class="value">{{ selectedDistrict.general.adminCenter }}</div>
        </div>
      </div>
    </div>
    <div class="tabs">
      <button class="tab" :class="{active: activeTab === 'info'}" @click="activeTab = 'info'">Інформація</button>
      <button class="tab" :class="{active: activeTab === 'stats'}" @click="activeTab = 'stats'">Статистика</button>
      <button class="tab" :class="{active: activeTab === 'gallery'}" @click="activeTab = 'gallery'">Галерея</button>
    </div>

    <div v-if="activeTab === 'info' && selectedDistrict" class="accordion-list">
      <AccordionSection v-for="section in selectedDistrict.sections" :key="section.title" :icon="section.icon" :title="section.title" :mock="section.text" />
    </div>

    <div v-else-if="activeTab === 'stats' && selectedDistrict" class="tab-content stats-tab">
      <PopularitySection :selectedDistrict="selectedDistrict" />
      <EthnicDistribution :selectedDistrict="selectedDistrict" />
      <EconomyDistribution :selectedDistrict="selectedDistrict" />
    </div>

    <div v-else-if="activeTab === 'gallery' && selectedDistrict" class="tab-content">
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <img v-for="(img, i) in selectedDistrict.gallery" :key="i" :src="img" style="width: 48%; height: 48%; border-radius: 6px; object-fit: cover; background: #e5e7eb;" />
      </div>
    </div>
    
    <div v-if="!selectedDistrict" class="tab-content" style="text-align:center; color:#64748b;">Оберіть громаду для перегляду інформації</div>
  </aside>
</template>

<script>
import { ref } from 'vue';
import { useDistrictStore } from '@/store/map.store';
import { storeToRefs } from 'pinia';
import AccordionSection from './AccordionSection.vue';
import PopularitySection from '../Statistics/PopularitySection.vue';
import EthnicDistribution from '../Statistics/EthnicDistribution.vue';
import EconomyDistribution from '../Statistics/EconomyDistribution.vue';

export default {
  name: 'CommunitySidebar',
  components: { 
    AccordionSection, 
    PopularitySection, 
    EthnicDistribution,
    EconomyDistribution
  },

  setup(props, { emit }) {
    const activeTab = ref('info');
    const districtStore = useDistrictStore();
    const { selectedDistrict } = storeToRefs(districtStore);

    const closeSidebar = () => {
      emit('closeSidebar');
    };

    return { 
      activeTab, 
      selectedDistrict,
      closeSidebar
    };
  }
};
</script>

<style scoped>
.community-sidebar {
  height: 100%;
  width: 380px;
  background-color: white;
  border-left: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem 0 0 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #E2E8F0;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.close-button {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  transition: color 0.2s ease-in-out;
}

.close-button:hover {
  color: #1a1a1a;
}

.general-info-card {
  background: #f8fafc;
  border-radius: 0.75rem;
  margin: 0.5rem 0.5rem 0.25rem 0.5rem;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}

.general-info-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #22223b;
}

.general-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2rem;
}

.general-info-item .label {
  font-size: 0.85rem;
  color: #64748b;
}

.general-info-item .value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin: 0 1.5rem 1rem 1.5rem;
}

.tab {
  flex: 1;
  padding: 0.75rem 0;
  background: #f3f4f6;
  border: none;
  border-radius: 0.5rem 0.5rem 0 0;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.tab.active {
  background: #fff;
  color: #2563eb;
  font-weight: 700;
  border-bottom: 2px solid #2563eb;
}

.accordion-list {
  flex: 1;
  overflow-y: auto;
  margin: 0 1.5rem 1.5rem 1.5rem;
}

.tab-content {
  padding: 0.5rem;
  color: #374151;
  font-size: 1rem;
  overflow-y: auto;
}

.stats-tab {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style> 