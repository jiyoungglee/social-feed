import { useRef } from "react";

function LoginForm({ login }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const loginData = {
      email: enteredEmail,
      pw: enteredPassword,
    }
    login(loginData);
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

export default LoginForm;
