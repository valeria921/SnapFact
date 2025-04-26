import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

function handleResponse(response) {}

export function getCategoryList() {
  return axios.get(BASE_URL + 'categories/');
}

export function getRandomFactByCategory(categoryId) {
  return axios.get(BASE_URL + 'categories/' + categoryId + '/random_fact/');
}
