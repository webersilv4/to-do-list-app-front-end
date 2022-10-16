import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

// https://to-do-weber.herokuapp.com

export default api;