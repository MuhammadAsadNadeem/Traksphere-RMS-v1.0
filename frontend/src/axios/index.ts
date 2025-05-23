// src/utils/axios.ts
import axios from 'axios';
import { routes } from '../routes';

const instance = axios.create({
    baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('Request Token:', token); // Debug
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = routes.login;
        }
        return Promise.reject(error);
    }
);

instance.defaults.headers.common['Cache-Control'] = 'no-cache';

export default instance;