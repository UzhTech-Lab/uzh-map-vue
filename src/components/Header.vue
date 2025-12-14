<template>
  <header class="header">
    <div class="header-left">
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/96a6e703609f7c97036f884cc6a5b1206e674834?placeholderIfAbsent=true&apiKey=c668f6bbb7294fd79f8ec70bdbb6e1bd" 
        class="logo" 
        alt="Map Logo"
      />
      <span class="title">Інтерактивна Карта Ужгорода</span>
    </div>

    <div class="header-right">
      <SearchInput />
      <button class="info-button" @click="showPopup = true">
        <i class="fas fa-info-circle"></i>
      </button>
    </div>

    <InfoPopup 
      :is-visible="showPopup"
      @close="showPopup = false"
    />
  </header>
</template>

<script>
import SearchInput from './SearchInput.vue';
import InfoPopup from './Map/InfoPopup.vue';
import { ref } from 'vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  components: {
    SearchInput,
    InfoPopup
  },
  setup() {
    const showPopup = ref(false);

    return {
      showPopup
    };
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #E2E8F0;
  background-color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.75rem;
}

.header-right {
  display: flex;
  align-items: right;
  gap: 1rem;
}

.info-button {
  width: 38px;
  height: 38px;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.info-button:hover {
  background-color: #2563eb;
}

@media (max-width: 768px) {
  .header {
    margin-left: 40px;
    padding: 0.75rem 1rem;
  }

  .header-left {
    gap: 0.75rem;
    display: none;
  }
}
</style>
