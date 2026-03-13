import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CoursePlayer() {

  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  useEffect(() => {

    const fetchCourse = async () => {

      try {

        const res = await axios.get(
          `https://lms-backend-eyzj.onrender.com/api/courses/${id}`
        );

        setCourse(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchCourse();

  }, [id]);


  if (!course) {
    return <div className="container mt-4">Loading player...</div>;
  }

  return (

    <div className="container mt-4">

      <div className="row">

        {/* Video Section */}
        <div className="col-md-8">

          <div className="card p-3">

            <h4>{course.title}</h4>

            <div className="ratio ratio-16x9">

              <iframe
                src={course.videoUrl}
                title="course video"
                allowFullScreen
              ></iframe>

            </div>

            <h5 className="mt-3">
              Lesson: {course.lessons[currentLesson]}
            </h5>

          </div>

        </div>


        {/* Lesson List */}
        <div className="col-md-4">

          <div className="card p-3">

            <h5>Lessons</h5>

            {course.lessons.map((lesson, index) => (

              <div
                key={index}
                className={`p-2 mb-2 ${
                  index === currentLesson
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentLesson(index)}
              >
                {lesson}
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default CoursePlayer;