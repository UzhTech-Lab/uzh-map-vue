<template>
  <div v-if="selectedCommunity && selectedCommunity.stats && selectedCommunity.stats.economyDistribution && Array.isArray(selectedCommunity.stats.economyDistribution) && selectedCommunity.stats.economyDistribution.length > 0" class="stats-card">
    <div class="stats-title">Економічні показники</div>
    <div class="stats-subtitle">Ключові економічні дані регіону</div>
    <div class="stats-section">
      <div class="stats-section-title">Кількість працевлаштувань відносно сектору</div>
      <div v-for="item in selectedCommunity.stats.economyDistribution" :key="item.label" class="stats-row">
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
  name: 'EconomyDistribution',
  props: {
    selectedCommunity: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>