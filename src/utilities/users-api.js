// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from './send-request';
const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export function createWord(wordInfo) {
  return sendRequest(`${BASE_URL}/create-word`, 'POST', wordInfo);
}

export function getWords() {
  return sendRequest(`${BASE_URL}/word-list`);
}