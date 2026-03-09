import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      // check if user already exists
      const res = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );

      if (res.data.length > 0) {
        alert("User already exists");
        return;
      }

      // create new user
      await axios.post("http://localhost:3001/users", {
        name,
        email,
        password
      });

      alert("Signup successful!");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Error registering user");
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
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control form-control-sm mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-sm mb-3"
            onChange={(e) => setPassword(e.target.value)}
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