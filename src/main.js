import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const loadMoreBtn = document.querySelector('.load-more'); // 

  let currentQuery = '';
  let currentPage = 1;
  let totalHits = 0;
  let loadedImages = 0;
  const PER_PAGE = 15;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const query = e.target.elements['search-text'].value.trim();

    if (!query) {
      iziToast.warning({
        message: 'Please enter a search term!',
        position: 'topRight',
      });
      return;
    }

    
    currentQuery = query;
    currentPage = 1;
    loadedImages = 0;

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
      const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
      totalHits = data.totalHits;

      if (data.hits.length === 0) {
        iziToast.info({
          message: 'Sorry, no images found. Try another query!',
          position: 'topRight',
        });
        return;
      }

      createGallery(data.hits);
      loadedImages += data.hits.length;

      if (loadedImages < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } catch (error) {
      iziToast.error({
        message: 'Something went wrong. Try again!',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;

    showLoader();
    hideLoadMoreButton();

    try {
      const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);

      if (data.hits.length === 0) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
        return;
      }

      createGallery(data.hits);
      loadedImages += data.hits.length;

      smoothScrollAfterLoad();

      const totalPages = Math.ceil(totalHits / PER_PAGE);
      if (currentPage < totalPages) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } catch (error) {
      iziToast.error({
        message: 'Failed to load more images.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });

  function smoothScrollAfterLoad() {
    const item = document.querySelector('.gallery-item');
    if (!item) return;

    const { height: cardHeight } = item.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  
});
