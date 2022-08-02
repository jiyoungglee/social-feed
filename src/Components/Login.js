import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function loginUser(userData) {
    try {
      await axios.post('/users/login', userData);
      navigate('/', {replace:true});
    } catch (error) {
      console.error(error);
    }
  }

  async function getUser() {
    const response = await axios.get('/users/currentUser');
    console.log(response);
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
      <button onClick={getUser}>Get User</button>
    </div>
  )
}

export default Login;
