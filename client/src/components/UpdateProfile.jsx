import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useParams,useNavigate,Link } from 'react-router-dom'

const UpdateProfile = () => {
    const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/auth/getUser/" + id)
    .then((res) => {
      console.log(res);
      setName(res.data.name)
      setEmail(res.data.email)
    })
  }, [])


  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/auth/update-user/" + id, {name,email})
      .then((result) => {
        console.log(result.data);
        navigate("/dashboard")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleUpdate}>
        <h1 className="heading">Update Profile</h1>

        <p>Name</p>
        <input
          type="text"
          className="login-input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <p>Email</p>
        <input
          type="text"
          className="login-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      
        <p className="error">{error}</p>
        <button type="submit" className="login-btn common-btn">
          Update
        </button>
       
      </form>
    </div>
    
  );
};

export default UpdateProfile;
