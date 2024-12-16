import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { notificationService } from '../services/notification.service';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();

      const userNotifications = data.filter(
        (notif) => notif.user_id === user?.id
      );
      setNotifications(userNotifications);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return {
    notifications,
    error,
  };
};
