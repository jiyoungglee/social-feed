import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search';
import './Navbar.css';
import axios from 'axios';
import { Actions, UserContext } from '../../store/UserContext';


function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    function updatePosition() {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  },[]);

  async function logout() {
    if(state.userId) {
      await axios.post('/users/logout');
    }
    dispatch({
      type: Actions.RESET
    });
    navigate('/', {replace:true});
  }

  return (
    <div className={scrollPosition === 0 ? "navbar" : "navbar shadow" }>
      <div className="navbar-header">
        <Link to="/"><h1>Social Feed</h1></Link>
      </div>
      <Search />
      {state.userId && <button onClick={logout}>Log Out</button>}
    </div>
  )
}

export default Navbar;
