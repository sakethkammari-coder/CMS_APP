import { Link, useNavigate } from "react-router-dom";

function Navbar({ setSearch }) {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <nav className="navbar navbar-dark bg-dark sticky-top">

      <div className="container">

        {/* ADMIN NAVBAR */}
        {user?.role === "admin" ? (

          <>
            <Link className="navbar-brand" to="/admin">
              Admin Portal
            </Link>

            <div className="d-flex align-items-center">

              <span className="text-white me-3">
                Admin: {user.name}
              </span>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>

            </div>
          </>

        ) : (

          <>
            {/* USER NAVBAR */}

            <Link className="navbar-brand" to="/">
              LMS
            </Link>

            <input
              type="text"
              className="form-control w-50"
              placeholder="Search courses..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <div>

              <Link className="btn btn-outline-light me-2" to="/">
                Home
              </Link>

              {user && (
                <Link className="btn btn-outline-light me-2" to="/my-courses">
                  My Courses
                </Link>
              )}

              {user ? (
                <>
                  <span className="text-white me-3">
                    Welcome {user.name}
                  </span>

                  <button
                    className="btn btn-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link className="btn btn-warning" to="/login">
                  Login
                </Link>
              )}

            </div>
          </>
        )}

      </div>

    </nav>

  );

}

export default Navbar;