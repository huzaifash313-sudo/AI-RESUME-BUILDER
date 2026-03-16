import axios from 'axios'

// Variable ka naam 'api' rakho taake niche match kare
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        try {
            if (response?.data && Object.prototype.hasOwnProperty.call(response.data, 'data')) {
                const original = response.data;
                const innerData = original.data;
                const result = (innerData && typeof innerData === 'object') 
                    ? { ...innerData, _serverMessage: original.message } 
                    : innerData;
                response.data = result;
            }
        } catch (err) {
            console.error('Interceptor Unwrapping Error:', err);
        }
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return Promise.reject({ message, status: error.response?.status, originalError: error });
    }
);

export default api;