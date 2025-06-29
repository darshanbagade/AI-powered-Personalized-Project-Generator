import axios from "axios";
// import { axiosInstance } from "./axios.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// You can add reusable API functions here using axiosInstance
// Example: export const getItems = async () => await axiosInstance.get('/items');

export const getAuthUser = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth/me`);
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};