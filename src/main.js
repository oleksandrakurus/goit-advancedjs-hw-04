// Import necessary modules
import { searchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
  showErrorMessage,
  showSuccessMessage,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndOfResultsMessage,
  smoothScrollToNewImages,
} from './js/render-functions.js';

// Import SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Get DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = searchForm.querySelector('input[name="searchQuery"]');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more-btn');

// Global variables for pagination
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

// Initialize SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Event listeners
searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

/**
 * Handles the search form submission
 * @param {Event} event - Form submit event
 */
async function handleSearch(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  // Validate input
  if (!query) {
    showErrorMessage('Please enter a search query!');
    return;
  }

  // Reset pagination variables
  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  // Clear previous results and hide load more button
  clearGallery(gallery);
  hideLoadMoreButton(loadMoreBtn);

  // Show loader
  showLoader(loader);

  try {
    // Perform search
    const data = await searchImages(query, currentPage, perPage);

    // Hide loader
    hideLoader(loader);

    // Update total hits
    totalHits = data.totalHits;

    // Render images
    renderImages(data.hits, gallery);

    // Refresh SimpleLightbox
    lightbox.refresh();

    // Show success message
    showSuccessMessage(`Found ${totalHits} images!`);

    // Show load more button if there are more images
    const totalPages = Math.ceil(totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreButton(loadMoreBtn);
    }

    // Clear the search input
    searchInput.value = '';

  } catch (error) {
    // Hide loader
    hideLoader(loader);

    // Show error message
    if (error.message === 'No images found') {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
    } else {
      showErrorMessage('Something went wrong. Please try again later.');
      console.error('Search error:', error);
    }
  }
}

/**
 * Handles loading more images
 */
async function handleLoadMore() {
  // Increment page
  currentPage += 1;

  // Show loader
  showLoader(loader);

  try {
    // Load more images
    const data = await searchImages(currentQuery, currentPage, perPage);

    // Hide loader
    hideLoader(loader);

    // Render new images
    renderImages(data.hits, gallery);

    // Refresh SimpleLightbox
    lightbox.refresh();

    // Smooth scroll to new images
    smoothScrollToNewImages(gallery);

    // Check if we've reached the end
    const totalPages = Math.ceil(totalHits / perPage);
    if (currentPage >= totalPages) {
      hideLoadMoreButton(loadMoreBtn);
      showEndOfResultsMessage();
    }

  } catch (error) {
    // Hide loader
    hideLoader(loader);

    // Show error message
    showErrorMessage('Failed to load more images. Please try again.');
    console.error('Load more error:', error);

    // Revert page increment on error
    currentPage -= 1;
  }
}
