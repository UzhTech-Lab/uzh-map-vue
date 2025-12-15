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
      const data = await districtService.getAllDistricts();
      districts.value = data;
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
      const data = await districtService.getDistrictById(id);
      return data;
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
      const data = await districtService.getDistrictsByRegion(regionId);
      districts.value = data;
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
      const data = await districtService.searchDistricts(query);
      districts.value = data;
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
      selectedProblem.value = response?.data || null;
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
      return response?.data || null;
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
      selectedSolution.value = response?.data || null;
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні рішення';
      console.error('Error fetching solution:', err);
    } finally {
      loading.value = false;
    }
  };

  const transformStatsData = (population, economy) => {
    const stats = {
      ageDistribution: [],
      ethnicDistribution: [],
      economyDistribution: []
    };

    if (population && population.age_distribution) {
      if (typeof population.age_distribution === 'string') {
        try {
          stats.ageDistribution = JSON.parse(population.age_distribution);
        } catch (e) {
          console.warn('Error parsing age_distribution:', e);
        }
      } else if (Array.isArray(population.age_distribution)) {
        stats.ageDistribution = population.age_distribution;
      }
    }

    if (population && population.ethnic_distribution) {
      if (typeof population.ethnic_distribution === 'string') {
        try {
          stats.ethnicDistribution = JSON.parse(population.ethnic_distribution);
        } catch (e) {
          console.warn('Error parsing ethnic_distribution:', e);
        }
      } else if (Array.isArray(population.ethnic_distribution)) {
        stats.ethnicDistribution = population.ethnic_distribution;
      }
    }

    if (economy && economy.sector_distribution) {
      if (typeof economy.sector_distribution === 'string') {
        try {
          stats.economyDistribution = JSON.parse(economy.sector_distribution);
        } catch (e) {
          console.warn('Error parsing sector_distribution:', e);
        }
      } else if (Array.isArray(economy.sector_distribution)) {
        stats.economyDistribution = economy.sector_distribution;
      }
    }

    return stats;
  };

  const fetchingCommunityId = ref(null);
  
  const fetchCommunityMemberById = async (id) => {
    if (fetchingCommunityId.value === id) {
      return;
    }
    
    try {
      fetchingCommunityId.value = id;
      loading.value = true;
      error.value = null;
      
      const [communityResponse, populationResponse, economyResponse, infrastructureResponse, geographyResponse] = await Promise.allSettled([
        communityService.getMemberById(id),
        communityService.getPopulation(id).catch(() => null),
        communityService.getEconomy(id).catch(() => null),
        communityService.getInfrastructure(id).catch(() => null),
        communityService.getGeography(id).catch(() => null)
      ]);

      const community = communityResponse.status === 'fulfilled' && communityResponse.value ? communityResponse.value.data : null;
      
      if (!community) {
        throw new Error('Не вдалося завантажити дані громади');
      }

      const population = populationResponse.status === 'fulfilled' && populationResponse.value ? populationResponse.value.data : null;
      const economy = economyResponse.status === 'fulfilled' && economyResponse.value ? economyResponse.value.data : null;
      const infrastructure = infrastructureResponse.status === 'fulfilled' && infrastructureResponse.value ? infrastructureResponse.value.data : null;
      const geography = geographyResponse.status === 'fulfilled' && geographyResponse.value ? geographyResponse.value.data : null;

      const stats = transformStatsData(population, economy);

      selectedCommunity.value = {
        ...community,
        population: population,
        economy: economy,
        infrastructure: infrastructure,
        geography: geography,
        stats: stats
      };
    } catch (err) {
      error.value = err.message || 'Помилка при отриманні члена громади';
      console.error('Error fetching community member:', err);
    } finally {
      loading.value = false;
      fetchingCommunityId.value = null;
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