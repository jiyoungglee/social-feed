import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import '../Styles/OptionsMenu.css';

function OptionsMenu({ onDelete, enableEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect( () => {
    function clickHandler(event) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
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

  function onEdit() {
    enableEdit();
    toggleMenu();
  }

  function renderMenu() {
    return (
      <div className="menu">
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
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

export default OptionsMenu;
