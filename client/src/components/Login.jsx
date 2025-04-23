import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      // .post("http://localhost:5000/auth/login", { email, password })
      .post("https://mern-job-portal-backend-url.vercel.app/auth/login", { email, password })
      .then((result) => {
        if (result.data.message === "logined") {
          toast.success("user login successfully")
          console.log(result.data.role + " you are");
          window.localStorage.setItem("id", result.data.id);
            navigate("/dashboard");
          window.location.reload();
        } else if (result.data.message == "please fil all fields") {
          setError("Please fill all the fields");
          toast.warning("Please fill all the fields")
        } else if (result.data.message == "email not found") {
          setError("Email not found");
          toast.error("Email not found")
        } else if (result.data.message == "incorrect password") {
          setError("incorrect password");
          toast.error("incorrect password")
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  };

  return (
    <div className="register-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <form className="register-form" onSubmit={handleSubmit}>
      <img src="/assets/logi1.png" className="logo-img img-login"/>

        <h2 className="heading">Login</h2>
        <p>Email</p>
        <input
          type="text"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error">{error}</p>
        <button type="submit" className="login-btn common-btn">
           {loading ? <BarLoader color="white" height={4} width={100} /> : "Login"}
        </button>

        <Link to="/register" className="account">
          Don't have an account
        </Link>
      </form>
    </div>
  );
};

export default Login;
