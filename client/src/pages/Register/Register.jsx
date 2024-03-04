import  { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post("/api/auth/register",formData)
        navigate("/login")
    } catch (error) {
        setError(error.response.data)

    }
  }

  

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="register">
        <h1>Register</h1>
      <form onSubmit={handleRegister} className="form">
        <div className="">
           <label >Name</label> 
          <input
            min={3}
            max={16}
            required={true}
            type="text"
            placeholder="John Doe"
            id="name"
            onChange={handleChange}
          />
        </div>

        <div className="">
            <label >Email</label>
          <input
            type="email"
            required={true}
            placeholder="John Doe"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="">
            <label >Password</label>
          <input
            minLength={4}
            maxLength={14}
            required={true}
            type="password"
            placeholder="John Doe"
            id="password"
            onChange={handleChange}
          />
        </div>
        {error && <p className="err-msg" >{error} </p>  }

        <button>Sign Up</button>

        <Link to={"/login"} className="link" >
            <p>Already have an account?</p>
        </Link>
      </form>
    </div>
  );
}
