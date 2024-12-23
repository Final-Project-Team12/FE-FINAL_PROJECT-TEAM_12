import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { notificationService } from '../services/notification.service';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await notificationService.getNotifications();
      const userNotifications = data.filter(
        (notif) => notif.user_id === user?.id
      );
      setNotifications(userNotifications);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.notification_id === notificationId
            ? { ...notif, is_read: true }
            : notif
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(
        (notif) => !notif.is_read
      );
      await Promise.all(
        unreadNotifications.map((notif) =>
          notificationService.markAsRead(notif.notification_id)
        )
      );

      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => ({ ...notif, is_read: true }))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();

      const intervalId = setInterval(fetchNotifications, 60000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [user, fetchNotifications]);

  return {
    notifications,
    error,
    loading,
    markAsRead,
    markAllAsRead,
    refreshNotifications: fetchNotifications,
  };
};
