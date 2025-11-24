import axios from "axios";
import dotenv from "dotenv"



const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // important for refresh token cookies
});

//  Attach token to all outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {}; // ensure headers exist
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Handle token expiration automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.get("/auth/refresh");
        const newAccessToken = res.data.accessToken;

        if (!newAccessToken) throw new Error("No access token returned");

        //  Save new token
        localStorage.setItem("token", newAccessToken);

        //  Ensure headers exist before updating Authorization
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original failed request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Logout and redirect if refresh fails
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
