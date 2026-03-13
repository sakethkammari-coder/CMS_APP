import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

const API = "https://lms-backend-eyzj.onrender.com";
const token = localStorage.getItem("token");

const [courses, setCourses] = useState([]);
const [users, setUsers] = useState([]);

const [title,setTitle]=useState("");
const [instructor,setInstructor]=useState("");
const [duration,setDuration]=useState("");
const [level,setLevel]=useState("");
const [thumbnail,setThumbnail]=useState("");
const [description,setDescription]=useState("");
const [content,setContent]=useState("");
const [videoUrl,setVideoUrl]=useState("");
const [lessons,setLessons]=useState("");

const [editingCourseId,setEditingCourseId]=useState(null);


// ======================
// FETCH COURSES
// ======================
const fetchCourses = async ()=>{

try{

const res = await axios.get(`${API}/api/courses`);
setCourses(res.data);

}catch(error){

console.log(error);

}

};


// ======================
// FETCH USERS
// ======================
const fetchUsers = async ()=>{

try{

const res = await axios.get(`${API}/api/admin/users`,{
headers:{Authorization:`Bearer ${token}`}
});

setUsers(res.data);

}catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchCourses();
fetchUsers();

},[]);


// ======================
// ADD OR UPDATE COURSE
// ======================
const handleSubmit = async ()=>{

try{

const courseData = {

title,
instructor,
duration,
level,
thumbnail,
description,
content,
videoUrl,
lessons: lessons.split(",")

};

if(editingCourseId){

await axios.put(
`${API}/api/admin/course/${editingCourseId}`,
courseData,
{headers:{Authorization:`Bearer ${token}`}}
);

alert("Course Updated");

}else{

await axios.post(
`${API}/api/admin/course`,
courseData,
{headers:{Authorization:`Bearer ${token}`}}
);

alert("Course Added");

}

clearForm();
fetchCourses();

}catch(error){

console.log(error);
alert("Operation Failed");

}

};


// ======================
// EDIT COURSE
// ======================
const editCourse = (course)=>{

setTitle(course.title || "");
setInstructor(course.instructor || "");
setDuration(course.duration || "");
setLevel(course.level || "");
setThumbnail(course.thumbnail || "");
setDescription(course.description || "");
setContent(course.content || "");
setVideoUrl(course.videoUrl || "");
setLessons(course.lessons?.join(",") || "");

setEditingCourseId(course._id);

window.scrollTo({
top:0,
behavior:"smooth"
});

};


// ======================
// DELETE COURSE
// ======================
const deleteCourse = async(id)=>{

if(!window.confirm("Delete this course?")) return;

try{

await axios.delete(
`${API}/api/admin/course/${id}`,
{headers:{Authorization:`Bearer ${token}`}}
);

fetchCourses();

}catch(error){

console.log(error);

}

};


// ======================
// DELETE USER
// ======================
const deleteUser = async(id)=>{

if(!window.confirm("Remove this user?")) return;

try{

await axios.delete(
`${API}/api/admin/user/${id}`,
{headers:{Authorization:`Bearer ${token}`}}
);

fetchUsers();

}catch(error){

console.log(error);

}

};


// ======================
// CLEAR FORM
// ======================
const clearForm = ()=>{

setTitle("");
setInstructor("");
setDuration("");
setLevel("");
setThumbnail("");
setDescription("");
setContent("");
setVideoUrl("");
setLessons("");
setEditingCourseId(null);

};


// ======================
// UI
// ======================
return(

<div className="container mt-4">

<h2>Admin Dashboard</h2>

{/* COURSE FORM */}

<div className="card p-3 mb-4">

<h4>{editingCourseId ? "Edit Course" : "Add Course"}</h4>

<input className="form-control mb-2"
placeholder="Course Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}/>

<input className="form-control mb-2"
placeholder="Instructor Name"
value={instructor}
onChange={(e)=>setInstructor(e.target.value)}/>

<input className="form-control mb-2"
placeholder="Duration (eg:10 hours)"
value={duration}
onChange={(e)=>setDuration(e.target.value)}/>

<input className="form-control mb-2"
placeholder="Level (eg:Beginner,Intermediate,Advanced)"
value={level}
onChange={(e)=>setLevel(e.target.value)}/>

<input className="form-control mb-2"
placeholder="Thumbnail Link"
value={thumbnail}
onChange={(e)=>setThumbnail(e.target.value)}/>

<textarea className="form-control mb-2"
placeholder="Description (1 line)"
value={description}
onChange={(e)=>setDescription(e.target.value)}/>

<textarea className="form-control mb-2"
placeholder="Content (Para)"
value={content}
onChange={(e)=>setContent(e.target.value)}/>

<input className="form-control mb-2"
placeholder="Video URL"
value={videoUrl}
onChange={(e)=>setVideoUrl(e.target.value)}/>

<input className="form-control mb-2"
placeholder="Lessons (comma separated)"
value={lessons}
onChange={(e)=>setLessons(e.target.value)}/>

<div>

<button
className="btn btn-primary me-2"
onClick={handleSubmit}
>
{editingCourseId ? "Update Course" : "Add Course"}
</button>

{editingCourseId && (

<button
className="btn btn-secondary"
onClick={clearForm}
>
Cancel Edit
</button>

)}

</div>

</div>


{/* COURSE TABLE */}

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

{courses.map(course=>(
<tr key={course._id}>

<td>{course.title}</td>
<td>{course.instructor}</td>
<td>{course.duration}</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>editCourse(course)}
>
Edit
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteCourse(course._id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>


{/* USERS TABLE */}

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

{users.map(user=>(
<tr key={user._id}>

<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>

<td>

{user.role!=="admin" &&(

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteUser(user._id)}
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