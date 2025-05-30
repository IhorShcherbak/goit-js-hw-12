

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="gallery-info">
        <p><b>Likes</b><br />${likes}</p>
        <p><b>Views</b><br />${views}</p>
        <p><b>Comments</b><br />${comments}</p>
        <p><b>Downloads</b><br />${downloads}</p>
      </div>
    </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}


export function clearGallery() {
  gallery.innerHTML = '';
}


export function showLoader() {
 
  document.querySelector('#loading-message').classList.remove('hidden');
}


export function hideLoader() {
  document.querySelector('#loading-message').classList.add('hidden');
}
export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('hidden');
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('hidden');
  }
}

