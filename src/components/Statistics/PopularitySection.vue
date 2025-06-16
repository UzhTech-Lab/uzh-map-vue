<template>
  <div class="stats-card">
    <div class="stats-title">Статистика населення</div>
    <div class="stats-subtitle">Демографічна статистика регіону</div>
    <div class="stats-section">
      <div class="stats-section-title">Розподіл Віку</div>
      <div v-for="item in selectedCommunity.stats.ageDistribution" :key="item.label" class="stats-row">
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
  name: 'PopularitySection',
  props: {
    selectedCommunity: {
      type: Object,
      required: true
    }
  }
}
</script>