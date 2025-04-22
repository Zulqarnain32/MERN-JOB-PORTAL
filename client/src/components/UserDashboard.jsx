import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState({});
  const [userExist,setUserExist ] = useState(false)
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Fetch user data from the server
    // axios.get('http://localhost:5000/auth/user')  // Use the correct URL
    axios.get('https://mern-job-portal-backend-url.vercel.app/auth/user')  // Use the correct URL
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
        setUserExist(true)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
 

  return (
    <>
      <div className="recruiter-container user-container">
        <div className="recruiter-control user-control">
          <div>
            <ul className='recruiter-ul user-ul'>
              <div className="user-profile">
              <img src="/assets/user-profile-img.png" className='u-p-img' />
                <p className='bold'>{userData.name}</p> 
                <p>{userData.role}</p>
              </div>
              <Link className='recruiter-link' to = "/job">Apply for Job</Link>
              <Link className='recruiter-link' to = "/job/applied-job">Applied Jobs</Link>
            </ul>

          </div>
        </div>
        {
          userExist && (
            <div className="recruiter-info user-info">
            
            <div className="recruiter-info-container user-info-container">
              <div className="login-user-image">
                <img src="/assets/user-image.png" alt="" />
              </div>
              <p className='login-user-name'>Name  <span>{userData.name}</span>  </p>
              <p className='login-user-name email'>Email  <span>{userData.email}</span>  </p>
              <p className='login-user-name'>Role  <span>{userData.role}</span>  </p>
              <Link to = {`update-profile/${userData.id}`}>
                  <div className="button-update-me common-btn">Update Profile</div>
              </Link>
            </div>
          </div>
          )
        }
        
      </div>
    </>
  );
};

export default UserDashboard;


