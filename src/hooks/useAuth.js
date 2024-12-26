import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../store/slices/authSlice';
import { authService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

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
    const interval = setInterval(syncAuthState, 1000);
    return () => clearInterval(interval);
  }, [dispatch, user]);

  const login = async (credentials) => {
    try {
      dispatch(loginStart());
      const { user, decodedToken } = await authService.login(credentials);
      dispatch(loginSuccess({ user, decodedToken }));

      await Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Selamat datang kembali!',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
        },
      });

      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(loginFailure(error.message));

      await Swal.fire({
        icon: 'error',
        title: 'Login Gagal!',
        text: error.message || 'Terjadi kesalahan saat login',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
        },
      });
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout',
      text: 'Apakah anda yakin ingin keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal',
      background: '#fff',
      customClass: {
        popup: 'rounded-lg shadow-lg',
        title: 'text-xl text-gray-800 font-medium',
        content: 'text-gray-600',
        confirmButton:
          'bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded',
        cancelButton:
          'bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded',
      },
    });

    if (result.isConfirmed) {
      authService.logout();
      dispatch(logout());

      await Swal.fire({
        icon: 'success',
        title: 'Logout Berhasil!',
        text: 'Anda telah berhasil keluar.',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
        },
      });

      navigate('/login', { replace: true });
    }
  };

  return {
    user,
    loading,
    login,
    logout: handleLogout,
    isAuthenticated: authService.isAuthenticated(),
  };
};
