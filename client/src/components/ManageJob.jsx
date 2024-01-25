import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from "react-router-dom"
import Footer from './Footer'
import axios from "axios"
const ManageJob = () => {
  const [jobData, setJobData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/auth/dashboard")
    .then((res) => {
        console.log(res.data + " manage page");
        if(res.data == "recruiter"){
            console.log(res.data + ' create');
            console.log(" manage you can manage job");
        } else{
            console.log("manage you are not recruiter");
            navigate('/')
        }
    }).catch(err => console.log(err))
}, [])

  useEffect(() => {
    axios.get('http://localhost:5000/job/readjob')
      .then((result) => {
        setJobData(result.data)
      })
  }, [])  


  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/job/delete/'+ id)
  }
 

  return (
    <>
      <div className="job-container">

        {
          jobData.map((job) => (
            <div className="job" key={job._id}>
              <div className='job-heading'>
                <div className='letter'>
                  <div className="l">C</div>
                </div>
                <div>
                  <div className="job-title">{job.jobTitle}</div>
                  <p className="company-name">{job.company}</p>
                </div>
              </div>
              <div className="job-info">
                <p>{job.jobDate}</p>
                <p>{job.city}</p>
                <p>{job.jobType}</p>
                <p className={`${job.jobStatus == "pending" ? "yellow":"green"}`}>{job.jobStatus}</p>
              </div>
              <div className="btns">
                <Link  to = {`edit-jobs/${job._id}`}>
                   <div className="apply-btn btn">Edit</div>
                </Link>
                  <div 
                    className="delete btn" 
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer/> 

    </>
  )
}

export default ManageJob
