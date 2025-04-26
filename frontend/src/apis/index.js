import axios from 'axios';
// Use relative path for API calls, handled by Nginx proxy
const BASE_URL = '/api/';

export function getCategoryList() {
  return axios.get(BASE_URL + 'categories/');
}

export function getRandomFactByCategory(categoryId) {
  return axios.get(BASE_URL + 'categories/' + categoryId + '/random_fact/');
}
