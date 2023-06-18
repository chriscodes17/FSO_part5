const NotificationMessage = ({ messageObj }) => {
  const styles = {
    backgroundColor: messageObj.error ? "#FFC9C9" : "#D9FFC9",
    color: messageObj.error ? "#FF0000" : "#00CE48",
    padding: '10px'
  };
  return (
    <div>
      <h3 style={styles}>{messageObj.message}</h3>
    </div>
  );
};

export default NotificationMessage;
