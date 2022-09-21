import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { UserContext, Actions } from '../store/UserContext';
import '../Styles/UserMenu.css';

function UserMenu() {
  const { state, dispatch } = useContext(UserContext);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect( () => {
    function clickHandler(event) {
      if (optionsOpen && optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOptionsOpen(false);
      }
    }

    document.addEventListener('click', clickHandler)

    return () => {
      return document.removeEventListener('click', clickHandler)
    }
  },[optionsOpen])

  function toggleOptions() {
    setOptionsOpen(optionsOpen => !optionsOpen);
  }

  async function logout() {
    if(state.userId) {
      await axios.post('/users/logout');
    }
    dispatch({
      type: Actions.RESET
    });
    navigate('/', {replace:true});
  }

  function renderOptions() {
    return (
      <div className="dropdown-menu">
        <Link to={`/profile/${state.userId}`} onClick={toggleOptions}>My Profile</Link>
        <button onClick={logout}>Log Out</button>
      </div>
    )
  }

  return (
    <div className="user-menu" ref={optionsRef}>
      <div onClick={toggleOptions}>
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
      </div>
      {optionsOpen && renderOptions()}
    </div>
  )
}

export default UserMenu;
