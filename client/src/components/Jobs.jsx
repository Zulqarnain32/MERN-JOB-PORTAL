import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

const Jobs = () => {
  const [jobData, setJobData] = useState([]);
  const [searchJob, setSearchJob] = useState('');
  const [appliedJobs,setAppliedJobs] = useState([])
  const userId = window.localStorage.getItem("id") 
  console.log("this is user id who is applying for job ",userId);

  useEffect(() => {
    const readJob = () => {
      axios.get('http://localhost:5000/job/readjob')
      .then((result) => {
          setJobData(result.data);
      });
    }
    const getSavedJobs = () => {
      axios.get('http://localhost:5000/job/saved-jobs/' + userId)
        .then((result) => {
          console.log(result.data);
          setAppliedJobs(result.data.savedJobs);
        })
        .catch(err => {
          console.error('Error fetching saved jobs:', err);
          // You can add more specific error handling here
        });
    }
    
    
    readJob()
    getSavedJobs()
  }, []);

  const handleSearchChange = (e) => {
    setSearchJob(e.target.value);
  };

  const filteredJobs = jobData.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchJob.toLowerCase())
  );


  // first step to save an applied jobs inside the login user
  const handleAppliedJobs = (jobId) => {
    axios.put("http://localhost:5000/job/", {userId,jobId})
    .then((res) => {
     setAppliedJobs(res.data.savedJobs)

     console.log(res.data); //will print item food id 
     console.log("from saved jobs");
    }).catch(err => console.log(err))

  }
 
   

  return (

    <>
      <div className="search-job">
        <input
          type="text"
          placeholder="Search job"
          className="search-field"
          value={searchJob}
          onChange={handleSearchChange}
        />
        <p className='awailable-job'>
          { 
            filteredJobs.length > 0 ? 
            <span>{filteredJobs.length} job available</span>:<span className='no-found'> no job found</span>
          }
        </p>
      </div>
      <div className="job-container">
        {filteredJobs.map((job) => (
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
              {/* <Link to={`applied-job/${job._id}`}> */}
              <Link to='applied-job'>
                <div 
                   className="apply-btn btn"
                   onClick={() => handleAppliedJobs(job._id)}
                >
                  Apply
                </div>
              </Link>
              <Link to={`readjob/${job._id}`}>
                <div className="details btn">Details</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Jobs
