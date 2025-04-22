import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/';

function handleResponse(response) {}

export function getCategoryList() {
  return axios.get(BASE_URL + 'categories/');
}

export function getRandomFactByCategory(categoryId) {
  return axios.get(BASE_URL + 'categories/' + categoryId + '/random_fact/');
}
