import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const otgDataService = {
  getAll() {
    return api.get('/otg-data');
  },

  getById(id) {
    return api.get(`/otg-data/${id}`);
  },

  search(query) {
    return api.get('/otg-data/search', {
      params: { name: query }
    });
  }
};

