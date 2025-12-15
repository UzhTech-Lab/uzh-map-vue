<template>
  <div v-if="selectedCommunity && selectedCommunity.stats && selectedCommunity.stats.ethnicDistribution && Array.isArray(selectedCommunity.stats.ethnicDistribution) && selectedCommunity.stats.ethnicDistribution.length > 0" class="stats-card">
    <div class="stats-title">Етнічний склад</div>
    <div class="stats-subtitle">Розподіл населення за національністю</div>
    <div class="stats-section">
      <div v-for="item in selectedCommunity.stats.ethnicDistribution" :key="item.label" class="stats-row">
        <div class="stats-row-label">
          <span>{{ item.label }}</span>
          <span>{{ item.value }}%</span>
        </div>
        <v-progress-linear :model-value="item.value" color="success" height="7"></v-progress-linear>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EthnicDistribution',
  props: {
    selectedCommunity: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>