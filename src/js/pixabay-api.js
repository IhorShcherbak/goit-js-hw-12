import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50393387-29c967097c23d0e8caeea1a68'; 

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, { params }).then(res => res.data);
}
