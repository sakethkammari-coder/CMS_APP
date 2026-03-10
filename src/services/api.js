import axios from "axios";

export const getCourses = () => {
  return axios.get("https://lms-backend.onrender.com/api/message");
};