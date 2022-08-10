import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Actions, UserContext } from "../../store/UserContext";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";


function RegisterLogin() {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  async function login(userData) {
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

  async function register(userData) {
    try {
      await axios.post('/users/register', userData);
      navigate('/login', {replace:true})
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <div>
      <LoginForm login={login} />
      <RegisterForm login={login} register={register} />
    </div>
  )
};

export default RegisterLogin;