import React,{ useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
const CreateJob = () => {
    const [ jobTitle,setJobTitle ] = useState("")
    const [ company,setCompany ] = useState("")
    const [ city,setCity ] = useState("")
    const [ jobType,setJobType ] = useState("")
    const [ jobStatus,setJobStatus ] = useState("")
    const [ jobDate,setJobDate ] = useState("")
    const [ error,setError ] = useState("") 
    const navigate = useNavigate()
    const userId = window.localStorage.getItem('id')

    useEffect(() => {
        // axios.get("http://localhost:5000/auth/dashboard")
        axios.get("https://mern-job-portal-backend-url.vercel.app/auth/dashboard")
        .then((res) => {
            console.log(res.data + " vreat page");
            if(res.data == "recruiter"){
                console.log(res.data + ' create');
                console.log(" create you can create job");
            } else{
                console.log("create you are not recruiter");
                navigate('/')
            }
        }).catch(err => console.log(err))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.post("http://localhost:5000/job/createjob", { jobDate,jobStatus,jobTitle,company,city,jobType,userId })
        axios.post("https://mern-job-portal-backend-url.vercel.app/job/createjob", { jobDate,jobStatus,jobTitle,company,city,jobType,userId })
        .then((result) => {
            console.log(result.data.message);
            if(result.data.message === "fill all form fields"){
               setError("fill all form fields")
            } else if (result.data.message === "job created"){
                navigate('/job')
            }
        })
    }
  return (
    <>
       <div className="create-job-container">
          <form onSubmit={handleSubmit}>
          <h1 className="cr-title">Create Job</h1> 
            <div className='make-it-flex'>
                <div>
                    <p>Job Title</p>
                    <input 
                       type="text" 
                       placeholder='Job Title'
                       className='cr-fields'
                       value={jobTitle}
                       onChange={(e) => setJobTitle(e.target.value)}
                    />
                </div>
                <div>
                    <p>Company Name</p>
                    <input 
                       type="text" 
                       placeholder='Company Name'
                       className='cr-fields'
                       value={company}
                       onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
            </div>
            <div className='make-it-flex'>
                <div>
                    <p>Date</p>
                    <input 
                       type="date" 
                       placeholder='Job Title'
                       className='cr-fields'
                       value={jobDate}
                       onChange={(e) => setJobDate(e.target.value)}
                    />
                </div>
                <div>
                    <p>City</p>
                    <input 
                       type="text" 
                       placeholder='Enter City'
                       className='cr-fields'
                       value={city}
                       onChange={(e) => setCity(e.target.value)}
                    />
                </div>
            </div>
            <div className='make-it-flex'>
                <div>
                    <p>Job Type</p>
                    <input 
                       type="text" 
                       placeholder='Internship'
                       className='cr-fields'
                       value={jobType}
                       onChange={(e) => setJobType(e.target.value)}
                    />
                </div>
                <div>
                    <p>Job Status</p>
                    <input 
                       type="text" 
                       placeholder='Pending'
                       className='cr-fields'
                       value={jobStatus}
                       onChange={(e) => setJobStatus(e.target.value)}
                    />
                </div>
            </div>
                <p className='error'>{error}</p>
                <button className="apply-now common-btn" type='submit'>Create Job</button>
          </form>
       </div> 
    </>
  )
}

export default CreateJob
