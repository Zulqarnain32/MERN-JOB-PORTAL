import React,{useState,useEffect} from 'react'
import axios from "axios"

const AppliedJobs = () => {
  const [saved,setSaved] = useState([])
  const userId = window.localStorage.getItem("id")
  // console.log("getting userId " + userId);
  const [numOfAppJobs, setNumOfAppJobs] = useState()
  
  useEffect(() => {
    axios.get('http://localhost:5000/job/user-jobs/' + userId)
    .then((res) => {
        
        // console.log("saved recipe component", res.data);
        setSaved(res.data);
        setNumOfAppJobs(res.data.length)
      })
      .catch(err => console.log(err));
  }, []);

  
  return (
    <>
      <h1 className="applied-title" style={{textAlign:"center"}}>Your Applied Jobs </h1>
      <h1 className='applied-title'>You have applied in {numOfAppJobs} jobs</h1>
      <div className="your-job-container job-container">
      
        {saved.map((job, id) => (
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
            <p className={`${job.jobStatus == "pending" ? "yellow" : "green"}`}>{job.jobStatus}</p>
          </div>
          <div className="btns">
           <button className='btn delete'>Delete</button>
          </div>
        </div>
        ))}
      </div>
    </>
  )
}

export default AppliedJobs
