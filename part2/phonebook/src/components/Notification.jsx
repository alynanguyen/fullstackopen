const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    const notificationClass = type === 'error' ? 'error' : 'success';

    return (
      <div className={`notification ${notificationClass}`}>
        {message}
      </div>
    )
  }

export default Notification;