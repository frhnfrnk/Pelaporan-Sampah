import axios from "axios";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Membuat instance axios dengan baseURL
const axiosInstance = axios.create({
  baseURL: LOCAL_API_URL,
});

// Menambahkan interceptors untuk setiap permintaan
axiosInstance.interceptors.request.use(
  (config) => {
    // Mendapatkan token dari local storage
    const token = localStorage.getItem("token");

    // Jika token ada, tambahkan token ke header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menambahkan interceptors untuk menangani respon error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
