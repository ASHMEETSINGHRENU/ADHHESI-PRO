import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT authorization token
API.interceptors.request.use(
  (config) => {
    const adminAuth = localStorage.getItem('adhhesi_admin_auth');
    if (adminAuth) {
      try {
        const parsed = JSON.parse(adminAuth);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (err) {
        console.error('Failed to parse admin token from storage', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
