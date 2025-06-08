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
        {
          name: 'Ужгородська міська ТГ',
          lat: 48.6208,
          lng: 22.3000,
          general: {
            population: '115 000',
            area: '142 км²',
            founded: '1248',
            adminCenter: 'Ужгород'
          },
          sections: [
            {
              icon: 'fas fa-history',
              title: 'Історія',
              text: 'Ужгородська ТГ має багату історію, що починається з 1248 року. Місто було важливим торговим та культурним центром.'
            },
            {
              icon: 'fas fa-map-marker-alt',
              title: 'Географія',
              text: 'ТГ розташована на заході України, на кордоні зі Словаччиною. Має вигідне географічне положення.'
            },
            {
              icon: 'fas fa-users',
              title: 'Демографія',
              text: 'Населення складає 115 000 осіб. Більшість — українці, також є угорці, словаки, роми.'
            },
            {
              icon: 'fas fa-coins',
              title: 'Економіка',
              text: 'Основні галузі: торгівля, туризм, легка промисловість, ІТ-сектор.'
            },
            {
              icon: 'fas fa-bus',
              title: 'Транспорт & Інфраструктура',
              text: 'Розвинена мережа громадського транспорту, залізничний та автобусний вокзали.'
            },
            {
              icon: 'fas fa-seedling',
              title: 'Агрокультура',
              text: 'В околицях розвинене садівництво, вирощування овочів, виноградарство.'
            },
            {
              icon: 'fas fa-briefcase',
              title: 'Сервіси & Послуги',
              text: 'Доступні сучасні медичні, освітні, адміністративні та побутові послуги.'
            },
            {
              icon: 'fas fa-university',
              title: 'Освіта & Культура',
              text: 'В ТГ діють університет, театри, музеї, бібліотеки, культурні центри.'
            },
            {
              icon: 'fas fa-trophy',
              title: 'Спортивні установи',
              text: 'Є стадіони, басейни, спортивні школи, секції для дітей та дорослих.'
            },
            {
              icon: 'fas fa-church',
              title: 'Релігійні установи',
              text: 'В ТГ діють православні, греко-католицькі, римо-католицькі церкви, синагога.'
            }
          ],
          stats: {
            ageDistribution: [
              { label: '0 - 14 років', value: 18 },
              { label: '15 - 64 років', value: 67 },
              { label: '65+ років', value: 15 }
            ],
            ethnicDistribution: [
              { label: 'Українці', value: 77 },
              { label: 'Угорці', value: 12 },
              { label: 'Словаки', value: 6 },
              { label: 'Роми', value: 3 },
              { label: 'Інші', value: 2 }
            ],
            economyDistribution: [
              { label: 'Сервіси', value: 52 },
              { label: 'Промисловість', value: 28 },
              { label: 'Сільське господарство', value: 20 }
            ]
          },
          gallery: [
            'https://placehold.co/80x60',
            'https://placehold.co/80x60',
            'https://placehold.co/80x60'
          ]
        },
        {
          name: 'Костринська ТГ',
          lat: 48.9833,
          lng: 22.5000,
          general: {
            population: '5 200',
            area: '95 км²',
            founded: '1500',
            adminCenter: 'Кострино'
          },
          sections: [
            {
              icon: 'fas fa-history',
              title: 'Історія',
              text: "Костринська ТГ відома з XVI століття. Тут збереглися старовинні дерев'яні церкви."
            },
            {
              icon: 'fas fa-map-marker-alt',
              title: 'Географія',
              text: 'Громада розташована у гірській місцевості біля річки Уж.'
            },
          ],
          stats: {
            ageDistribution: [
              { label: '0 - 14 років', value: 18 },
              { label: '15 - 64 років', value: 67 },
              { label: '65+ років', value: 15 }
            ],
            ethnicDistribution: [
              { label: 'Українці', value: 77 },
              { label: 'Угорці', value: 12 },
              { label: 'Словаки', value: 6 },
              { label: 'Роми', value: 3 },
              { label: 'Інші', value: 2 }
            ],
            economyDistribution: [
              { label: 'Сервіси', value: 52 },
              { label: 'Промисловість', value: 28 },
              { label: 'Сільське господарство', value: 20 }
            ]
          },
          gallery: [
            'https://placehold.co/80x60',
            'https://placehold.co/80x60',
            'https://placehold.co/80x60',
          ]
        }
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