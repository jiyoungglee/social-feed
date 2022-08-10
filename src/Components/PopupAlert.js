import '../styles/PopupAlert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

function PopupAlert({ onCancel, onConfirm }) {
  return (
    <div className="modal">
    <div className="alert-box">
      <div className="alert-top">
        <div className="alert-header">Delete Comment?</div>
        <div className="close-alert" onClick={onCancel}>
          <FontAwesomeIcon icon={faCircleXmark} size="xl" />
        </div>
      </div>
      <div>Are you sure you want to delete this comment?</div>
      <div className="alert-actions">
        <button className="alert-cancel" onClick={onCancel}>Cancel</button>
        <button className="alert-confirm" onClick={onConfirm}>Delete</button>
      </div>
    </div>
    </div>
  )
}

export default PopupAlert;