import axios from 'axios';

// Get API key from Vite env
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;
const API_BASE_URL = 'https://api.github.com';

/**
 * Fetch GitHub user data by username
 * @param {string} username
 * @returns {Promise<object>} user data or throws error
 */
export async function fetchUserData(username) {
  if (!username) throw new Error('Username is required');
  try {
    const headers = GITHUB_API_KEY
      ? { Authorization: `Bearer ${GITHUB_API_KEY}` }
      : {};
    const response = await axios.get(`${API_BASE_URL}/users/${username}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Advanced search for GitHub users by username, location, and min repo count
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.location
 * @param {number} params.minRepos
 * @returns {Promise<Array>} List of users
 */
export async function fetchUsersAdvanced({ username, location, minRepos }) {
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;
  query = query.trim();
  if (!query) throw new Error('At least one search parameter is required');
  const headers = GITHUB_API_KEY
    ? { Authorization: `Bearer ${GITHUB_API_KEY}` }
    : {};
  try {
    const response = await axios.get(`${API_BASE_URL}/search/users`, {
      headers,
      params: { q: query, per_page: 10 },
    });
    return response.data.items;
  } catch (error) {
    throw error;
  }
}
