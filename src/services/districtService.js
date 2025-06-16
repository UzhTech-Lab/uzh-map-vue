import axios from 'axios';

const API_URL = 'https://maps-production-b65e.up.railway.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const communityService = {
  // Get all communitys
  getAllCommunities() {
    return api.get('/communitys');
  },

  // Get community by ID
  getCommunityById(id) {
    return api.get(`/communitys/${id}`);
  },

  // Get community by slug
  getCommunityBySlug(slug) {
    return api.get(`/communitys/slug/${slug}`);
  },

  // Get community statistics
  getCommunityStats(id) {
    return api.get(`/communitys/${id}/stats`);
  },

  // Get community problems
  getCommunityProblems(id) {
    return api.get(`/communitys/${id}/problems`);
  },

  // Get community solutions
  getCommunitySolutions(id) {
    return api.get(`/communitys/${id}/solutions`);
  },

  // Get community community
  getCommunityCommunity(id) {
    return api.get(`/communitys/${id}/community`);
  }
}; 