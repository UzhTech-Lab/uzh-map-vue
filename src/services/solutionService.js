import axios from 'axios';

const API_URL = 'https://maps-production-b65e.up.railway.app/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const solutionService = {
  // Get all solutions
  getAllSolutions() {
    return api.get('/solutions');
  },

  // Get solution by ID
  getSolutionById(id) {
    return api.get(`/solutions/${id}`);
  },

  // Get solution by slug
  getSolutionBySlug(slug) {
    return api.get(`/solutions/slug/${slug}`);
  },

  // Get solution statistics
  getSolutionStats(id) {
    return api.get(`/solutions/${id}/stats`);
  },

  // Get solution community
  getSolutionCommunity(id) {
    return api.get(`/solutions/${id}/community`);
  }
}; 