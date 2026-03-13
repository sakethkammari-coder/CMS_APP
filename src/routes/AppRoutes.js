import { Routes, Route } from "react-router-dom";
import CoursePlayer from "../pages/CoursePlayer";
import Home from "../pages/Home";
import CourseDetails from "../pages/CourseDetails";
import MyCourses from "../pages/MyCourses";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import AdminDashboard from "../pages/AdminDashboard";

function AppRoutes({ search }) {

  return (

    <Routes>

      <Route 
        path="/" 
        element={<Home search={search} />} 
      />

      <Route
        path="/course/:id"
        element={<CourseDetails />}
      />

      <Route
        path="/player/:id"
        element={
          <ProtectedRoute>
            <CoursePlayer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
/>

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

    </Routes>

  );

}

export default AppRoutes;