import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginSuccess, loginFailure, logout } from '../store/slices/authSlice';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const syncAuthState = () => {
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser();
        if (currentUser && (!user || user.id !== currentUser.id)) {
          dispatch(loginSuccess({ user: currentUser }));
        }
      } else if (user) {
        dispatch(logout());
      }
    };

    syncAuthState();
    const interval = setInterval(syncAuthState, 1000); // Check auth state periodically

    return () => clearInterval(interval);
  }, [dispatch, user]);

  const login = async (credentials) => {
    try {
      const { user, decodedToken } = await authService.login(credentials);
      dispatch(loginSuccess({ user, decodedToken }));

      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    loading,
    error,
    login,
    logout: handleLogout,
    isAuthenticated: authService.isAuthenticated(),
  };
};
