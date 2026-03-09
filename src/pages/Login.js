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

      // find user by email
      const res = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );

      if (res.data.length === 0) {
        alert("User not found");
        return;
      }

      const user = res.data[0];

      // check password
      if (user.password === password) {

        localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful");

        navigate("/");

      } else {

        alert("Incorrect password");

      }

    } catch (error) {

      console.error(error);
      alert("Login error");

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