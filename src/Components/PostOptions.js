import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import '../Styles/PostOptions.css';

function PostOptions({ deletePost }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect( () => {
    function clickHandler(event) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        console.log("clickHandler")
      }
    }

    document.addEventListener('click', clickHandler)

    return () => {
      return document.removeEventListener('click', clickHandler)
    }
  },[menuOpen])

  function toggleMenu() {
    setMenuOpen(menuOpen => !menuOpen);
  }

  function editPost() {
    console.log("To Do: Edit Post");
  }

  function renderMenu() {
    return (
      <div className="menu">
        <button onClick={deletePost}>Delete</button>
        <button onClick={editPost}>Edit</button>
      </div>
    )
  }

  return (
    <div className="post-options" ref={menuRef}>
      <button className="menu-icon" onClick={toggleMenu}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
      {menuOpen && renderMenu()}
    </div>
  )
}

export default PostOptions;
