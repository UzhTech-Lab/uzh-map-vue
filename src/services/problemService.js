import axios from 'axios';

const API_URL = 'https://maps-production-b65e.up.railway.app/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const problemService = {
  // Get all problems
  getAllProblems() {
    return api.get('/problems');
  },

  // Get problem by ID
  getProblemById(id) {
    return api.get(`/problems/${id}`);
  },

  // Get problem by slug
  getProblemBySlug(slug) {
    return api.get(`/problems/slug/${slug}`);
  },

  // Get problem statistics
  getProblemStats(id) {
    return api.get(`/problems/${id}/stats`);
  },

  // Get problem solutions
  getProblemSolutions(id) {
    return api.get(`/problems/${id}/solutions`);
  },

  // Get problem community
  getProblemCommunity(id) {
    return api.get(`/problems/${id}/community`);
  }
}; 