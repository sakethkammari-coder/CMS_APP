import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CourseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    // fetch course details
    axios
      .get(`http://localhost:3001/courses/${id}`)
      .then((res) => setCourse(res.data));

    let courses =
      JSON.parse(localStorage.getItem("courses")) || [];

    if (courses.includes(id)) {
      setEnrolled(true);
      setProgress(30);
    }

  }, [id]);

  const enrollCourse = () => {

    let courses =
      JSON.parse(localStorage.getItem("courses")) || [];

    if (!courses.includes(id)) {
      courses.push(id);
    }

    localStorage.setItem(
      "courses",
      JSON.stringify(courses)
    );

    setEnrolled(true);
    setProgress(10);

    alert("Course Enrolled");

    navigate(`/player/${id}`);
  };

  const continueCourse = () => {
    navigate(`/player/${id}`);
  };

  return (

    <div className="container mt-4">

      <h2>Course Details</h2>

      <p><strong>Course ID:</strong> {id}</p>

      {/* Added Description and Content */}
      {course && (
        <>
          <p><strong>Description:</strong> {course.description}</p>
          <p>{course.content}</p>
        </>
      )}

      {/* Progress Bar */}
      <div className="mb-3">

        <label>Course Progress</label>

        <div className="progress">

          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>

        </div>

      </div>

      {/* Buttons */}
      {enrolled ? (

        <button
          className="btn btn-primary"
          onClick={continueCourse}
        >
          Continue Course
        </button>

      ) : (

        <button
          className="btn btn-success"
          onClick={enrollCourse}
        >
          Enroll & Start Course
        </button>

      )}

    </div>

  );

}

export default CourseDetails;