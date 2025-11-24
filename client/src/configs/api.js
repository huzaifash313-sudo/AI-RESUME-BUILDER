import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

// Response interceptor: unwrap server ApiResponse { success, statusCode, message, data }
api.interceptors.response.use(
    (response) => {
            try {
                // If server wraps data under response.data.data, return inner data for convenience
                if (response && response.data && response.data.data !== undefined) {
                    const original = response.data;
                    const inner = original.data;
                    // keep server message on the returned data so client code can access it
                    if (typeof inner === 'object' && inner !== null) {
                        inner.message = original.message;
                    }
                    response.data = inner;
                    // also expose wrapper if the caller needs metadata
                    response.wrapper = {
                        message: original.message,
                        statusCode: response.status,
                    };
                }
        } catch (err) {
            // ignore and return original response
        }
        return response;
    },
    (error) => {
        // Log full error for easier debugging in browser console
        console.error('API Error:', error?.response || error?.message || error);
        return Promise.reject(error);
    }
);

export default api