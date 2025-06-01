import { defineStore } from 'pinia';
import axios from 'axios';

export const useDistrictStore = defineStore('districts', {
  state: () => ({
    districts: [],
    filteredDistricts: [],
    selectedDistrict: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getDistricts: (state) => state.districts,
    getSelectedDistrict: (state) => state.selectedDistrict,
    isLoading: (state) => state.loading
  },
  
  actions: {
    async fetchDistricts() {
      this.loading = true;
      try {
        const response = await axios.get('/api/districts');
        this.districts = response.data;
        this.filteredDistricts = response.data;

        this.error = null;
      } catch (error) {
        console.error('Error fetching districts:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    setSelectedDistrict(district) {
      this.selectedDistrict = district;
    },

    setMockDistricts() {
      this.districts = [
        { name: 'Костринська ТГ', lat: 48.9833, lng: 22.5000 },
        { name: 'Перечинська ТГ', lat: 48.7333, lng: 22.4667 },
        { name: 'Ставненька ТГ', lat: 48.9000, lng: 22.6500 },
        { name: 'Сюртівська ТГ', lat: 48.4500, lng: 22.1333 },
        { name: "Тур'є Реметівьска ТГ", lat: 48.6500, lng: 22.4000 },
        { name: 'Ужгородська міська ТГ', lat: 48.6208, lng: 22.3000 },
        { name: 'Ужгородський район', lat: 48.6333, lng: 22.2500 },
        { name: 'Холмківська ТГ', lat: 48.6167, lng: 22.2833 }
      ];

      this.filteredDistricts = this.districts;
    },

    filterDistricts(query) {
      this.filteredDistricts = this.districts.filter(district => 
        district.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
});