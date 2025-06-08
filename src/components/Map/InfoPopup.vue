<template>
  <div v-if="isVisible" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <div class="popup-header">
        <h3 class="popup-title">Про карту</h3>
        <button class="close-button" @click="closePopup">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="popup-body">
        <p>Інтерактивна карта Ужгорода показує різні райони міста та їх розташування.</p>
        <p>Ви можете:</p>
        <ul>
          <li>Переглядати список районів у бічній панелі</li>
          <li>Шукати конкретний район за назвою</li>
          <li>Клікнути на маркер на карті для отримання додаткової інформації</li>
          <li>Вибрати район зі списку для центрування карти</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPopup',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closePopup = () => {
      emit('close');
    };

    return {
      closePopup
    };
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #E2E8F0;
}

.popup-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
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

.popup-body {
  padding: 1.5rem;
  color: #4B5563;
}

.popup-body p {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.popup-body ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.popup-body li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
</style>