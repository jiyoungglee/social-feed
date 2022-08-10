import { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Actions, UserContext } from "../../store/UserContext";

function Login() {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function loginUser(userData) {
    try {
      const response = await axios.post('/users/login', userData);
      dispatch({
        type: Actions.UPDATE,
        payload: {
          userId: response.data.userId,
          email: response.data.email
        }
      })
      navigate('/', {replace:true});
    } catch (error) {
      dispatch({
        type: Actions.RESET
      })
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const loginData = {
      email: enteredEmail,
      pw: enteredPassword,
    }
    loginUser(loginData);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={submitHandler}>
        <div>Enter Email:<input type="text" name="email" ref={emailRef}/></div>
        <div>Enter Password:<input type="password" name="password" ref={passwordRef} /></div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login;
