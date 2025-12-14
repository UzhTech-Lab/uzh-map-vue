import axios from 'axios';

const API_URL = 'https://maps-production-b65e.up.railway.app/api/v1';

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
  }
}; 