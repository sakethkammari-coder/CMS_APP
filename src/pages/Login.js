import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const res = await axios.post(
        "https://lms-backend-eyzj.onrender.com/api/login",
        {
          email,
          password
        }
      );

      const user = res.data;

      // store logged-in user
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      navigate("/");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Login error");
      }

      console.error(error);

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <h3 className="text-center mb-4">Login</h3>

          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-sm mb-3"
            onChange={(e) => setEmail(e.target.value.trim())}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-sm mb-3"
            onChange={(e) => setPassword(e.target.value.trim())}
          />

          <button
            className="btn btn-primary btn-sm w-100"
            onClick={loginUser}
          >
            Login
          </button>

          <p className="mt-3 text-center">
            Not registered?
          </p>

          <button
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>

        </div>

      </div>

    </div>

  );

}

export default Login;