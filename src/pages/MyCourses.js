import { useEffect, useState } from "react";
import { getCourses } from "../services/api";
import CourseCard from "../components/CourseCard";

function MyCourses() {

  const [courses, setCourses] = useState([]);

  const enrolledCourses =
    JSON.parse(localStorage.getItem("courses")) || [];

  useEffect(() => {

    getCourses().then((res) => {

      const allCourses = res.data;

      const filteredCourses = allCourses.filter(course =>
        enrolledCourses.includes(String(course.id))
      );

      setCourses(filteredCourses);

    });

  }, []);

  return (

    <div className="container mt-4">

      <h2 className="mb-4">My Courses</h2>

      <div className="row">

        {courses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}

      </div>

    </div>

  );

}

export default MyCourses;