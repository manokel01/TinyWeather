import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://localhost:3000';

/**
 * Get all growers
 * @returns {Promise<Array>} Array of growers
 */
export const getGrowers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/growers`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get all farms based on grower's username.
 * @param {string} username - Username of the grower
 * @returns {Promise<Array>} Array of farms
 */
export const getFarmsByGrower = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/farms/grower/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get sensors based on farm's code.
 * @param {string} farm_code - Code of the farm
 * @returns {Promise<Array>} Array of sensors
 */
export const getSensorsByFarm = async (farm_code) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/sensors/farm/${farm_code}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Get latest weather data based on sensor's id.
 * @param {string} sensorId - ID of the sensor
 * @returns {Promise<Object>} Latest weather data
 */
export const getLatestWeatherBySensorId = async (sensorId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/weather/${sensorId}/latest`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
