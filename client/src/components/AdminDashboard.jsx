
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
 const [ users,setUsers ] = useState([])


  useEffect(() => {
       axios.get('http://localhost:5000/auth/stakeholders')
       .then((res) => {
        console.log(res.data);
        setUsers(res.data)
        console.log("stake holders");
       }).catch(err => console.log(err))
  }, [])


  return (
    <>
       <div className="admin-panel-container">
            {
              users.map((user) => (
                <div className="login-user-container" key={user._id}>
                  <p><span>Name</span>: {user.name}</p>
                  <p><span>Email</span>: {user.email}</p>
                  <p><span>Role</span>: {user.role}</p>
                  <button className="del-user-btn">Delete</button>
                </div>
              ))
            }
       </div>      
    </>
  );
};

export default AdminDashboard;


