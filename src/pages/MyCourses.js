import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

function MyCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {

    const fetchCourses = async () => {

      const token = localStorage.getItem("token");

      if (!token) return;

      try {

        const res = await axios.get(
          "https://lms-backend-eyzj.onrender.com/api/my-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setCourses(res.data);

      } catch (error) {

        console.log("MyCourses error:", error);

      }

    };

    fetchCourses();

  }, []);

  return (

    <div className="container mt-4">

      <h2 className="mb-4">My Courses</h2>

      <div className="row">

        {courses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        )}

      </div>

    </div>

  );

}

export default MyCourses;