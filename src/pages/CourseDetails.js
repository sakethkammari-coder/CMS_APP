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


axios
  .get("https://lms-backend-eyzj.onrender.com/api/courses")
  .then((res) => {

    const foundCourse = res.data.find((c) => c._id === id);

    setCourse(foundCourse);

  })
  .catch((err) => console.log(err));


}, [id]);

const enrollCourse = async () => {


const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to enroll");
  navigate("/login");
  return;
}

try {

  await axios.post(
    "https://lms-backend-eyzj.onrender.com/api/enroll",
    { courseId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  setEnrolled(true);
  setProgress(10);

  alert("Course Enrolled");

  navigate(`/player/${id}`);

} catch (error) {

  console.log(error);
  alert("Enrollment failed");

}

};

const continueCourse = () => {


navigate(`/player/${id}`);


};

return (

<div className="container mt-4">

  <h2>Course Details</h2>

  {course && (
    <>
      <h4>{course.title}</h4>

      <p><strong>Instructor:</strong> {course.instructor}</p>

      <p><strong>Description:</strong> {course.description}</p>

      <p>{course.content}</p>
    </>
  )}

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
