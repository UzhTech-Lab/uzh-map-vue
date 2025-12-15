import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const communityService = {
  // Get all community members
  getAllMembers() {
    return api.get('/community');
  },

  // Get member by ID
  getMemberById(id) {
    return api.get(`/community/${id}`);
  },

  // Get member by slug
  getMemberBySlug(slug) {
    return api.get(`/community/slug/${slug}`);
  },

  // Get member statistics
  getMemberStats(id) {
    return api.get(`/community/${id}/stats`);
  },

  // Get member problems
  getMemberProblems(id) {
    return api.get(`/community/${id}/problems`);
  },

  // Get member solutions
  getMemberSolutions(id) {
    return api.get(`/community/${id}/solutions`);
  },

  // Get population data
  getPopulation(id) {
    return api.get(`/population/community/${id}`);
  },

  // Get economy data
  getEconomy(id) {
    return api.get(`/economy/community/${id}`);
  },

  // Get infrastructure data
  getInfrastructure(id) {
    return api.get(`/infrastructure/community/${id}`);
  },

  // Get geography data
  getGeography(id) {
    return api.get(`/geography/community/${id}`);
  }
}; 