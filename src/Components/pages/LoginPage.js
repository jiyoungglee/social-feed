import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import { Actions, UserContext } from "../../store/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginFail, setLoginFail] = useState(false);

  const LoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });

  async function login(userData) {
    try {
      const response = await axios.post('/users/login', {
        email: userData.email,
        pw: userData.password
      });
      dispatch({
        type: Actions.UPDATE,
        payload: {
          userId: response.data.userId,
          email: response.data.email
        }
      })
      navigate('/', {replace:true});
    } catch (error) {
        if (error.response.status === 401) {
          setLoginFail(true);
        }
        dispatch({
          type: Actions.RESET
        })
    }
  }

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(login)} className="login-form">
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
        {loginFail && <span>Email or password is invalid</span>}
        <input type="submit" value="Log In" className="login-button" />
      </form>
      <div className="redirect"> 
        <div>OR</div>
        <Link to="/register">Click here to register</Link>
      </div>
    </div>
  )
}

export default LoginPage;
