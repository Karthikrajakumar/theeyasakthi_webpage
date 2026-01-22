import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ DO NOT set Content-Type globally
// Axios will automatically set:
// multipart/form-data for FormData
// application/json for normal JSON

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default adminApi;
