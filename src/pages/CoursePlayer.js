import { useParams } from "react-router-dom";
import { useState } from "react";

function CoursePlayer() {

  const { id } = useParams();

  const lessons = [
    "Introduction",
    "React Setup",
    "Components",
    "Props",
    "Hooks"
  ];

  const [currentLesson, setCurrentLesson] = useState(0);

  return (

    <div className="container mt-4">

      <div className="row">

        {/* Video Section */}
        <div className="col-md-8">

          <div className="card p-3">

            <h4>Course Player</h4>

            <div className="ratio ratio-16x9">

              <iframe
                src="https://www.youtube.com/embed/bMknfKXIFA8"
                title="course video"
                allowFullScreen
              ></iframe>

            </div>

            <h5 className="mt-3">
              Lesson: {lessons[currentLesson]}
            </h5>

          </div>

        </div>

        {/* Lesson List */}
        <div className="col-md-4">

          <div className="card p-3">

            <h5>Lessons</h5>

            {lessons.map((lesson, index) => (

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