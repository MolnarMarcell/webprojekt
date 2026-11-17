import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Engedélyezi a cookie-k küldését a kéréshez
});


export default api;