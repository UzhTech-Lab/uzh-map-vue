import axios from 'axios';
import { API_URL } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const districtService = {
  async getAllDistricts() {
    try {
      const response = await apiClient.get('/community');
      return response.data;
    } catch (error) {
      console.error('Error in getAllDistricts:', error);
      throw error;
    }
  },

  async getDistrictById(id) {
    try {
      const response = await apiClient.get(`/community/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error in getDistrictById(${id}):`, error);
      throw error;
    }
  },

  async getDistrictsByRegion(regionId) {
    try {
      const response = await apiClient.get(`/community`, {
        params: { region: regionId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error in getDistrictsByRegion(${regionId}):`, error);
      throw error;
    }
  },

  async searchDistricts(query) {
    try {
      const response = await apiClient.get('/community', {
        params: { search: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error in searchDistricts:', error);
      throw error;
    }
  },

  async getDistrictProblems(id) {
    try {
      const response = await apiClient.get(`/community/${id}/problems`);
      return response.data;
    } catch (error) {
      console.error(`Error in getDistrictProblems(${id}):`, error);
      throw error;
    }
  },

  async getDistrictSolutions(id) {
    try {
      const response = await apiClient.get(`/community/${id}/solutions`);
      return response.data;
    } catch (error) {
      console.error(`Error in getDistrictSolutions(${id}):`, error);
      throw error;
    }
  },

  async getDistrictCommunity(id) {
    try {
      const response = await apiClient.get(`/community/${id}/community`);
      return response.data;
    } catch (error) {
      console.error(`Error in getDistrictCommunity(${id}):`, error);
      throw error;
    }
  }
}; 