import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import './Navbar.css';
import axios from 'axios';


function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function updatePosition() {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  },[]);

  async function logout() {
    const response = await axios.post('/users/logout');
    console.log(response);
  }

  return (
    <div className={scrollPosition === 0 ? "navbar" : "navbar shadow" }>
      <div className="navbar-header">
        <Link to="/"><h1>Social Feed</h1></Link>
      </div>
      <Search />
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Navbar;
