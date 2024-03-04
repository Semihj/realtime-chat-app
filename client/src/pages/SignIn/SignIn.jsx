import  { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../redux/user/user";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post("/api/auth/login",formData)
        dispatch(signInSuccess(res.data))
        navigate("/")
    } catch (error) {
        setError(error.response.data)
    }
  }

  

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="login">
        <h1>Login</h1>
      <form onSubmit={handleRegister} className="form">
        <div className="">
           <label >Name</label> 
          <input
            type="text"
            required={true}
            placeholder="John Doe"
            id="name"
            onChange={handleChange}
          />
        </div>

        <div className="">
            <label >Password</label>
          <input
            type="password"
            required={true}
            placeholder="John Doe"
            id="password"
            onChange={handleChange}
          />
        </div>
        {error && <p className="err-msg" >{error} </p>  }
        <button>Sign In</button>
        <Link to={"/register"} className="link" >
            <p>Don't have an account?</p>
        </Link>
      </form>
    </div>
  );
}
