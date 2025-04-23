import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
const EditJob = () => {
    const [ jobTitle,setJobTitle ] = useState("")
    const [ company,setCompany ] = useState("")
    const [ city,setCity ] = useState("")
    const [ jobType,setJobType ] = useState("")
    const [ jobStatus,setJobStatus ] = useState("")
    const [ jobDate,setJobDate ] = useState("")
    const [ error,setError ] = useState("") 

    const navigate = useNavigate()
    const {id} = useParams()
    console.log("edit " + id);

    useEffect(() => {
        // axios.get('http://localhost:5000/job/getUser/'+ id)
        axios.get('https://mern-job-portal-backend-url.vercel.app/job/getUser/'+ id)
        .then((result) => {
            setCompany(result.data.company);
            setCity(result.data.city);
            setJobDate(result.data.jobDate);
            setJobStatus(result.data.jobStatus);
            setJobType(result.data.jobType);
            setJobTitle(result.data.jobTitle)
             console.log(result);
        }).catch(err => console.log(err))
    }, [])

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


    const handleUpdate = (e) => {
        e.preventDefault();
        // axios.put("http://localhost:5000/job/edit-job/"+ id,{ jobDate,jobStatus,jobTitle,company,city,jobType })
        axios.put("https://mern-job-portal-backend-url.vercel.app/job/edit-job/"+ id,{ jobDate,jobStatus,jobTitle,company,city,jobType })
        .then((result) => {
            navigate("/job")
        })
    }
  return (
    <>
       <div className="create-job-container">
          <form onSubmit={handleUpdate}>
          <h1 className="cr-title">Edit Job</h1> 
            <div className='make-it-flex'>
                <div>
                    <p>Job Title</p>
                    <input 
                       type="text" 
                       placeholder='Job Title'
                       className='cr-fields'
                       onChange={(e) => setJobTitle(e.target.value)}
                       value={jobTitle}
                    />
                </div>
                <div>
                    <p>Company Name</p>
                    <input 
                       type="text" 
                       placeholder='Company Name'
                       className='cr-fields'
                       onChange={(e) => setCompany(e.target.value)}
                       value={company}
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
                       onChange={(e) => setJobDate(e.target.value)}
                       value={jobDate}
                    />
                </div>
                <div>
                    <p>City</p>
                    <input 
                       type="text" 
                       placeholder='Enter City'
                       className='cr-fields'
                       onChange={(e) => setCity(e.target.value)}
                       value={city}
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
                       onChange={(e) => setJobType(e.target.value)}
                       value={jobType}
                    />
                </div>
                <div>
                    <p>Job Status</p>
                    <input 
                       type="text" 
                       placeholder='Pending'
                       className='cr-fields'
                       onChange={(e) => setJobStatus(e.target.value)}
                       value={jobStatus}
                    />
                </div>
            </div>
                <p className='error'>{error}</p>
                <button className="apply-now common-btn" type='submit'>
                Edit Job</button>
          </form>
       </div> 
    </>
  )
}

export default EditJob
