import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests and attach Bearer token if user is authenticated
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('rethread_user');
    if (userInfo) {
      try {
        const { token } = JSON.parse(userInfo);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error parsing rethread_user token', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
