import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.BASE_URL_API
});

// https://to-do-weber.herokuapp.com

export default api;