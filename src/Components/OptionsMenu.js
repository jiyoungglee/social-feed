import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import '../styles/OptionsMenu.css';
import PopupAlert from './PopupAlert';

function OptionsMenu({ onDelete, enableEdit, onHide, editMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmRequired, setConfirmRequired] = useState(false);
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

  function confirmDelete() {
    setConfirmRequired(true);
    toggleMenu();
  }

  function renderMenu() {
    if(editMode) {
      return (
        <div className="menu">
          <button onClick={confirmDelete}>Delete</button>
          <button onClick={onEdit}>Edit</button>
        </div>
      )
    } else {
      return (
        <div className="menu">
          <button onClick={onHide}>Hide</button>
        </div>
      )
    }
  }

  return (
    <div className="options" ref={menuRef}>
      {confirmRequired && <PopupAlert onConfirm={onDelete} onCancel={() => setConfirmRequired(false)} />}
      <button className="menu-icon" onClick={toggleMenu}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
      {menuOpen && renderMenu()}
    </div>
  )
}

export default OptionsMenu;
