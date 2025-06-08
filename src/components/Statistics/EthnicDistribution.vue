<template>
  <div class="stats-card">
    <div class="stats-title">Етнічний склад</div>
    <div class="stats-subtitle">Розподіл населення за національністю</div>
    <div class="stats-section">
      <div v-for="item in selectedDistrict.stats.ethnicDistribution" :key="item.label" class="stats-row">
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
    selectedDistrict: {
      type: Object,
      required: true
    }
  }
}
</script>