import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API
});

// https://to-do-weber.herokuapp.com

export default api;
