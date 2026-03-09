import { Link } from "react-router-dom";

function Navbar({ setSearch }) {

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:"sticky",top:1,zIndex:1}}>

      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          LMS
        </Link>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search courses..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Navigation Buttons */}
        <div>

          <Link className="btn btn-outline-light me-2" to="/">
            Home
          </Link>

          <Link className="btn btn-outline-light me-2" to="/my-courses">
            My Courses
          </Link>

          <Link className="btn btn-warning" to="/login">
            Login
          </Link>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;