import { useRef } from "react";

function RegisterForm({ login, register }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = usernameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const registrationData = {
      email: enteredEmail,
      pw: enteredPassword,
      username: enteredName
    }
    await register(registrationData);
    login(registrationData);
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={submitHandler}>
        <div>Enter Name:<input type="text" name="name" ref={usernameRef}/></div>
        <div>Enter Email:<input type="text" name="email" ref={emailRef}/></div>
        <div>Enter Password:<input type="password" name="password" ref={passwordRef} /></div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default RegisterForm;