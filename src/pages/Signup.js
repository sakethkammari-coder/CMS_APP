import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await axios.post(
        "https://lms-backend-eyzj.onrender.com/api/signup",
        {
          name,
          email,
          password
        }
      );

      alert("Signup successful! Please login.");

      navigate("/login");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Signup error");
      }

      console.error(error);

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <h3 className="text-center mb-4">Signup</h3>

          <input
            type="text"
            placeholder="Name"
            className="form-control form-control-sm mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-sm mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-sm mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control form-control-sm mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-success btn-sm w-100"
            onClick={registerUser}
          >
            Signup
          </button>

        </div>

      </div>

    </div>

  );

}

export default Signup;