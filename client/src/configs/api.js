import axios from 'axios'

const api = axios.create({
    // KHRABI FIX: Fallback lagaya hai taake agar .env miss ho to localhost:5000 use kare
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json'
    }
})

// Response interceptor
api.interceptors.response.use(
    (response) => {
        try {
            // Nexo Standard Response Handling
            if (response?.data && Object.prototype.hasOwnProperty.call(response.data, 'data')) {
                const original = response.data;
                const innerData = original.data;

                const result = (innerData && typeof innerData === 'object') 
                    ? { ...innerData, _serverMessage: original.message } 
                    : innerData;

                response.data = result;
                
                response.wrapper = {
                    message: original.message,
                    success: original.success,
                    statusCode: response.status,
                };
            }
        } catch (err) {
            console.error('Interceptor Unwrapping Error:', err);
        }
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        console.error(`[API Error] ${error.config?.url}:`, message);

        return Promise.reject({
            message,
            status: error.response?.status,
            originalError: error
        });
    }
);

export default api;