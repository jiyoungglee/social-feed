import '../Styles/Timestamp.css';

function Timestamp(props) {
  const postTimestamp = new Date(props.timestamp);
  const now = new Date();

  const totalSeconds = (now - postTimestamp)/1000
  const days = Math.floor(totalSeconds/86400);
  const hours = Math.floor((totalSeconds%86400)/3600);
  const minutes = Math.floor((totalSeconds%3600)/60);

  if (days > 0) {
    if(props.type === 'post') {
      return (
        <div className="timestamp">
          {postTimestamp.toLocaleString([], {month: 'short', day:'2-digit'})} at {postTimestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      )
    }
    if(props.type === 'comment') {
      return <div className="timestamp">{days} days ago</div>
    }
  }
  if (hours > 0) {
    return <div className="timestamp">{hours} hours ago</div>;
  }
  if (hours === 0) {
    return <div className="timestamp">{minutes} minutes ago</div>;
  } 
}

export default Timestamp;
