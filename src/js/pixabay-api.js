import axios from 'axios';

const API_KEY = '50500162-d9264b458cdacee071354b362';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Searches for images using Pixabay API with pagination support
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Number of images per page (default: 15)
 * @returns {Promise} - Promise that resolves to the API response
 */
export async function searchImages(query, page = 1, perPage = 15) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: perPage,
    min_width: 640,
    min_height: 480,
  };

  try {
    const response = await axios.get(BASE_URL, { params: searchParams });
    const data = response.data;

    if (data.hits.length === 0) {
      throw new Error('No images found');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
