import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useParams,useNavigate,Link } from 'react-router-dom'

const UpdateProfile = () => {
    const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/getUser/" + id)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="heading">Update Profile</h1>

        <p>Name</p>
        <input
          type="text"
          className="login-input"
          placeholder="Name"
          value="hello"
          onChange={(e) => setName(e.target.value)}
        />
        <p>Email</p>
        <input
          type="text"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error">{error}</p>
        <button type="submit" className="login-btn common-btn">
          Update
        </button>
        <Link to="/login" className="account">
          Already have an account{" "}
        </Link>
      </form>
    </div>
    
  );
};

export default UpdateProfile;
