import axios from "axios";

export const getCourses = () => {
  return axios.get("http://localhost:3001/courses");
};