import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';
import Search from '../Search';
import UserMenu from '../UserMenu';
import './Navbar.css';


function Navbar() {
  const { state } = useContext(UserContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    function updatePosition() {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  },[]);

  return (
    <div className={scrollPosition === 0 ? "navbar" : "navbar shadow" }>
        <div className={state.userId ? "navbar-header" : "navbar-header login"}>
          <Link to="/"><h1>Social Feed</h1></Link>
          {state.userId && <UserMenu />}
        </div>
        {state.userId && <Search />}
    </div>
  )
}

export default Navbar;
