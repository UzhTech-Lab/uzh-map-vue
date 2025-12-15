import { createRouter, createWebHistory } from 'vue-router';
import MapPage from './pages/MapPage.vue';

const routes = [
  {
    path: '/',
    name: 'map',
    component: MapPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 