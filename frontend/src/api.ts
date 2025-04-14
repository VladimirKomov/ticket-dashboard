import axios from 'axios';

// Axios instance pre-configured with backend base URL
export const api = axios.create({
    baseURL: 'http://localhost:3000',
});