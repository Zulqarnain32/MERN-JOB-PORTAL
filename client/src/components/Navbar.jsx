import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [userData, setUserData] = useState({});
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    console.log("logout button is clicked");
    window.localStorage.clear();
    axios
      .get("http://localhost:5000/auth/logout")
      .then((result) => {
        console.log(result.data.message);
        window.location.reload();
        console.log("token is clear " + result);
      })
      .catch((err) => console.log(err));
  };

  
  useEffect(() => {
    axios.get('http://localhost:5000/auth/user')  // Use the correct URL
      .then(response =>  setUserData(response.data));
  }, []);

  return (
    <>
      <div className="navbar-container">
        <div className="logo-side">
          <img src="/assets/logi1.png" className="logo-img"/>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/job" className="nav-link">
            Jobs
          </Link>
          
       
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link  className="nav-link">
            {userData.email}
          </Link>
          {window.localStorage.length > 0 ? (
            <Link to="/">
              <button className="login-nav-btn common-btn" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="login-nav-btn common-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
