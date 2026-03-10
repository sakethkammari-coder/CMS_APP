import axios from "axios";

const API_URL = "https://lms-backend-eyzj.onrender.com";

export const getCourses = () => {
  return axios.get(`${API_URL}/api/courses`);
};