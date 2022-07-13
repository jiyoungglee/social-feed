import { useState, useEffect } from 'react';
import '../Styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div className={scrollPosition === 0 ? "navbar" : "navbar shadow" }>
      <div className="navbar-header">
        <h1>Social Feed</h1>
      </div>
      <div className="navbar-search">
        <div className="searchbox">
          <FontAwesomeIcon icon={faMagnifyingGlass}  color= "#F4B5E6" />
          <input type="search" placeholder="Search Posts..." />
        </div>
        <button>Search</button>
      </div>
    </div>
  )
}

export default Navbar;
