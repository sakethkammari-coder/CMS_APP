import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

const [courses, setCourses] = useState([]);
const [users, setUsers] = useState([]);

const [title, setTitle] = useState("");
const [instructor, setInstructor] = useState("");
const [duration, setDuration] = useState("");

const [editingCourseId, setEditingCourseId] = useState(null);

const token = localStorage.getItem("token");

const API = "https://lms-backend-eyzj.onrender.com";

// Fetch courses
const fetchCourses = async () => {


try {

  const res = await axios.get(`${API}/api/courses`);

  setCourses(res.data);

} catch (error) {

  console.log(error);

}


};

// Fetch users
const fetchUsers = async () => {


try {

  const res = await axios.get(`${API}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  setUsers(res.data);

} catch (error) {

  console.log(error);

}


};

useEffect(() => {


fetchCourses();
fetchUsers();


}, []);

// Add or Update Course
const handleSubmit = async () => {


try {

  if (editingCourseId) {

    await axios.put(
      `${API}/api/admin/course/${editingCourseId}`,
      { title, instructor, duration },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Course updated");

  } else {

    await axios.post(
      `${API}/api/admin/course`,
      { title, instructor, duration },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Course added");

  }

  setTitle("");
  setInstructor("");
  setDuration("");
  setEditingCourseId(null);

  fetchCourses();

} catch (error) {

  console.log(error);

  alert("Operation failed");

}


};

// Edit course
const editCourse = (course) => {


setTitle(course.title);
setInstructor(course.instructor);
setDuration(course.duration);

setEditingCourseId(course._id);


};

// Delete course
const deleteCourse = async (id) => {


if (!window.confirm("Delete this course?")) return;

try {

  await axios.delete(
    `${API}/api/admin/course/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  fetchCourses();

} catch (error) {

  console.log(error);

}


};

// Remove user
const deleteUser = async (id) => {


if (!window.confirm("Remove this user?")) return;

try {

  await axios.delete(
    `${API}/api/admin/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  fetchUsers();

} catch (error) {

  console.log(error);

}


};

return (


<div className="container mt-4">

  <h2>Admin Dashboard</h2>


  {/* Add / Edit Course */}
  <div className="card p-3 mb-4">

    <h4>{editingCourseId ? "Edit Course" : "Add Course"}</h4>

    <input
      type="text"
      placeholder="Course Title"
      className="form-control mb-2"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <input
      type="text"
      placeholder="Instructor"
      className="form-control mb-2"
      value={instructor}
      onChange={(e) => setInstructor(e.target.value)}
    />

    <input
      type="text"
      placeholder="Duration"
      className="form-control mb-2"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />

    <button
      className="btn btn-primary"
      onClick={handleSubmit}
    >
      {editingCourseId ? "Update Course" : "Add Course"}
    </button>

  </div>



  {/* Courses Table */}
  <div className="card p-3 mb-4">

    <h4>All Courses</h4>

    <table className="table">

      <thead>
        <tr>
          <th>Title</th>
          <th>Instructor</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {courses.map((course) => (

          <tr key={course._id}>

            <td>{course.title}</td>
            <td>{course.instructor}</td>
            <td>{course.duration}</td>

            <td>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editCourse(course)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteCourse(course._id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>



  {/* Users Table */}
  <div className="card p-3">

    <h4>All Users</h4>

    <table className="table">

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {users.map((user) => (

          <tr key={user._id}>

            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>

            <td>

              {user.role !== "admin" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
                >
                  Remove
                </button>
              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


);

}

export default AdminDashboard;
