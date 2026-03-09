import { useEffect, useState } from "react";
import { getCourses } from "../services/api";
import CourseCard from "../components/CourseCard";

function Home({ search }) {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div className="container mt-4" >

      <h2 className="mb-4">Available Courses</h2>

      <div className="row">

        {courses
          .filter((course) =>
            course.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

      </div>

    </div>
  );
}

export default Home;