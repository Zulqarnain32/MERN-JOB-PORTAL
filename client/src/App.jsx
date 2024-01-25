import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RecruiterDashboard from "./components/RecruiterDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Registration from "./components/Registration";
import UserDashboard from "./components/UserDashboard";
import Nothing from "./components/Nothing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import CreateJob from "./components/CreateJob";
import Jobs from "./components/Jobs";
import ManageJob from "./components/ManageJob";
import ReadJobInfo from "./components/ReadJobInfo";
import UpdateProfile from "./components/UpdateProfile";
import EditJob from "./components/EditJob";
import AppliedJobs from "./components/AppliedJobs";

const App = () => {
  const [userIs, setUserIs] = useState("");

  // const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/auth/dashboard").then((res) => {
      console.log(res.data + " dashboard page");
      if (res.data == "admin") {
        console.log("congrats! you are admin");
        setUserIs("admin");
      } else if (res.data == "recruiter") {
        console.log("congrats! you are recruiter");
        setUserIs("recruiter");
      } else if (res.data == "user") {
        console.log("congrats! you are user");
        setUserIs("user");
      } else if (res.data == "token is missing") {
        console.log("not login");
        setUserIs("user");
      } else {
        console.log("you are not logined yet");
      }
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/job" element={<Jobs />} />
          <Route path="/manage-job" element={<ManageJob />} />
          <Route path="job/readjob/:jobId" element={< ReadJobInfo/>} />
          <Route path="/update-profile/:id" element={< UpdateProfile/>} />
          <Route path="/edit-job/:id" element={< EditJob/>} />
          <Route path="/job/applied-job" element={< AppliedJobs/>} />


          <Route
            path="/dashboard"
            element={
              userIs === "admin" ? (
                <AdminDashboard />
              ) : userIs === "recruiter" ? (
                <RecruiterDashboard />
              ) : userIs === "user" ? (
                <UserDashboard />
              ) : (
                <Nothing />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
