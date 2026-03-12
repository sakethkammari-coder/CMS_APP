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


const fetchCourse = async () => {

  try {

    const res = await axios.get(
      `https://lms-backend-eyzj.onrender.com/api/courses/${id}`
    );

    setCourse(res.data);

  } catch (error) {

    console.log("Course fetch error:", error);

  }

};


const checkEnrollment = async () => {

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

    const enrolledCourse = res.data.find(
      (course) => course._id === id
    );

    if (enrolledCourse) {
      setEnrolled(true);
      setProgress(10);
    }

  } catch (error) {

    console.log("Enrollment check error:", error);

  }

};

fetchCourse();
checkEnrollment();


}, [id]);

const enrollCourse = async () => {


const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to enroll");
  navigate("/login");
  return;
}

try {

  const res = await axios.post(
    "https://lms-backend-eyzj.onrender.com/api/enroll",
    { courseId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert(res.data.message);

  setEnrolled(true);
  setProgress(10);

  navigate(`/player/${id}`);

} catch (error) {

  console.log("Enrollment Error:", error);

  if (error.response) {
    alert(error.response.data.message);
  } else if (error.request) {
    alert("No response from server");
  } else {
    alert("Enrollment failed");
  }

}


};

const continueCourse = () => {
navigate(`/player/${id}`);
};

if (!course) {
return <div className="container mt-4">Loading course...</div>;
}

return (


<div className="container mt-4">

  <h2>Course Details</h2>

  <h4>{course.title}</h4>

  <p><strong>Instructor:</strong> {course.instructor}</p>

  <p><strong>Description:</strong> {course.description || "No description available"}</p>

  <p>{course.content || "No course content available"}</p>


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
