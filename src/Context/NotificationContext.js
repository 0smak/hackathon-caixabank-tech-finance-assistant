import { createContext, useCallback, useContext, useState } from "react";
import NotificationPopup from "../components/NotificationPopup";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = useCallback((message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  }, []);

  const closeNotification = () => {
    setNotificationOpen(false);
    setNotificationMessage("");
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationOpen,
        notificationMessage,
        showNotification,
        closeNotification,
      }}
    >
      {children}
      <NotificationPopup
        open={notificationOpen}
        message={notificationMessage}
        onClose={closeNotification}
      />
    </NotificationContext.Provider>
  );
};
