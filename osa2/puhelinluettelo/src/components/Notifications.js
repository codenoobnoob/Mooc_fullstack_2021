import React from "react";

const errorMessage = (message, isError, setFunction) => {
  setFunction({
    message: message,
    isError: isError,
  });
};

const setMessageWithTimeout = (message, isError, setFunction, timeout) => {
  setFunction({
    message: message,
    isError: isError,
  });
  setTimeout(() => {
    setFunction({ message: null, isError: false });
  }, timeout);
};

const NotificationMessage = ({ message, isError }) => {
  if (message !== null) {
    if (isError) {
      return <div className="error">{message}</div>;
    } else if (!isError) {
      return <div className="message">{message}</div>;
    }
  }
  return null;
};

const notifications = {
  NotificationMessage,
  setMessageWithTimeout,
  errorMessage,
};

export default notifications;
