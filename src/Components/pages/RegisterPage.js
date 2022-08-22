import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import { Actions, UserContext } from "../../store/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";


function RegisterPage() {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState();

  const RegistrationSchema = yup.object().shape({
    name: yup.string().min(2).max(80).required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(RegistrationSchema)
  });

  async function registerUser(userData) {
    const body = {
      email: userData.email,
      pw: userData.password,
      username: userData.name
    }
    try {
      await axios.post('/users/register', body);
      const response = await axios.post('/users/login', body);
      dispatch({
        type: Actions.UPDATE,
        payload: {
          userId: response.data.userId,
          email: response.data.email
        }
      })
      navigate('/', {replace:true})
    } catch (error) {
      setUserExists(error.response.data);
    }
  }

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(registerUser)} className="register-form">
        <div className="form-name">
          <label>Enter Name:</label>
          <div className="input-container">
            <input
              type="text"
              name="name"
              {...register("name")} 
            />
          </div>
        </div>
        {errors.name && <span>{errors.name.message}</span>}
        <div className="form-email">
          <label>Email:</label>
          <div className="input-container">
            <input
              type="text"
              name="email"
              {...register("email")} 
            />
          </div>
        </div>
        {errors.email && <span>{errors.email.message}</span>}
        <div className="form-password">
          <label>Password:</label>
          <div className="input-container">
            <input 
              type="password"
              name="password"
              {...register("password")} 
            />
          </div>
        </div>
        {errors.password && <span>{errors.password.message}</span>}
        <span>{userExists}</span>
        <input type="submit" value="Register" className="register-button" />
      </form>
      <div className="redirect">
        <div>OR</div>
        <Link to="/">Click here to login</Link>
      </div>
    </div>
  )
}

export default RegisterPage;
