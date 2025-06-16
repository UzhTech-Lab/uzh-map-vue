import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { districtService } from '@/services/district.service';
import { problemService } from '@/services/problemService';
import { solutionService } from '@/services/solutionService';
import { communityService } from '@/services/communityService';

export const useMapStore = defineStore('map', () => {
  const districts = ref([]);
  const selectedDistrict = ref(null);
  const selectedProblem = ref(null);
  const selectedSolution = ref(null);
  const selectedCommunity = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getAllDistricts = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await districtService.getAllDistricts();
      districts.value = response.data;
    } catch (err) {
      error.value = err.message || 'Помилка при завантаженні районів';
      console.error('Error fetching districts:', err);
    } finally {
      loading.value = false;
    }
  };

  const getDistrictById = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await districtService.getDistrictById(id);
      return response.data;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні району';
      console.error('Error fetching district:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const setSelectedDistrict = (district) => {
    selectedDistrict.value = district;
  };

  const clearSelectedDistrict = () => {
    selectedDistrict.value = null;
  };

  const getDistrictsByRegion = async (regionId) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await districtService.getDistrictsByRegion(regionId);
      districts.value = response.data;
    } catch (err) {
      error.value = err.message || 'Помилка при завантаженні районів регіону';
      console.error('Error fetching region districts:', err);
    } finally {
      loading.value = false;
    }
  };

  const searchDistricts = async (query) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await districtService.searchDistricts(query);
      districts.value = response.data;
    } catch (err) {
      error.value = err.message || 'Помилка при пошуку районів';
      console.error('Error searching districts:', err);
    } finally {
      loading.value = false;
    }
  };

  const filteredDistricts = computed(() => {
    return districts.value;
  });

  const fetchDistrictProblems = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await districtService.getDistrictProblems(id);
      return response;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні проблем району';
      console.error('Error fetching district problems:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchDistrictSolutions = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await districtService.getDistrictSolutions(id);
      return response;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні рішень району';
      console.error('Error fetching district solutions:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchDistrictCommunity = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await districtService.getDistrictCommunity(id);
      return response;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні громадського району';
      console.error('Error fetching district community:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchProblemById = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await problemService.getProblemById(id);
      selectedProblem.value = response;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні проблеми';
      console.error('Error fetching problem:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchProblemSolutions = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await problemService.getProblemSolutions(id);
      return response;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні рішень проблеми';
      console.error('Error fetching problem solutions:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchSolutionById = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await solutionService.getSolutionById(id);
      selectedSolution.value = response;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні рішення';
      console.error('Error fetching solution:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchCommunityMemberById = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await communityService.getMemberById(id);
      selectedCommunity.value = response;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні члена громади';
      console.error('Error fetching community member:', err);
    } finally {
      loading.value = false;
    }
  };

  const setSelectedProblem = (problem) => {
    selectedProblem.value = problem;
  };

  const clearSelectedProblem = () => {
    selectedProblem.value = null;
  };

  const setSelectedSolution = (solution) => {
    selectedSolution.value = solution;
  };

  const clearSelectedSolution = () => {
    selectedSolution.value = null;
  };

  const setSelectedCommunity = (community) => {
    selectedCommunity.value = community;
  };

  const clearSelectedCommunity = () => {
    selectedCommunity.value = null;
  };

  return {
    districts,
    selectedDistrict,
    selectedProblem,
    selectedSolution,
    selectedCommunity,
    loading,
    error,
    getAllDistricts,
    getDistrictById,
    setSelectedDistrict,
    clearSelectedDistrict,
    getDistrictsByRegion,
    searchDistricts,
    filteredDistricts,
    fetchDistrictProblems,
    fetchDistrictSolutions,
    fetchDistrictCommunity,
    fetchProblemById,
    fetchProblemSolutions,
    fetchSolutionById,
    fetchCommunityMemberById,
    setSelectedProblem,
    clearSelectedProblem,
    setSelectedSolution,
    clearSelectedSolution,
    setSelectedCommunity,
    clearSelectedCommunity
  };
});