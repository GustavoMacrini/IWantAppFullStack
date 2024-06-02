import axios from 'axios';

const api = axios.create({
    headers: {
        'Accepts': 'application/json',        
        "Access-Control-Allow-Origin":"*"
    },
    baseURL: 'https://localhost:7121/api/'
});

export default api;