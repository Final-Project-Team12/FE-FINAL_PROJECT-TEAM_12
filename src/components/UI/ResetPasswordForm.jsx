import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Elements/InputField/InputField';
import Button from '../Elements/Buttons/Button';
import useResetPassword from '../../hooks/useResetPassword';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const { handleResetPassword } = useResetPassword();
  const loading = useSelector((state) => state.resetPassword.loading);

  useEffect(() => {
    const resetToken = Cookies.get('resetToken');
    const resetEmail = Cookies.get('resetEmail');

    if (!resetToken || !resetEmail) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    try {
      await handleResetPassword(newPassword, confirmPassword);
    } catch (error) {
      setError(error.message || 'Gagal mereset password');
    }
  };

  return (
    <div className="h-screen flex">
      <div className="my-auto w-full mx-auto max-w-md px-6">
        <h2 className="font-bold text-2xl mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <InputField
              label="Masukan Password Baru"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              showPasswordToggle
            />
          </div>
          <div>
            <InputField
              label="Ulangi Password Baru"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Masukkan password yang sama"
              showPasswordToggle
            />
          </div>
          <div className="mt-6">
            <Button type="submit" className="h-[48px]" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>

        {/* Error Toast */}
        <div
          className={`
            fixed
            bottom-4
            left-1/2
            -translate-x-1/2
            w-full
            max-w-md
            px-4
            transition-all
            duration-300
            ease-in-out
            ${showError ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          {error && (
            <div className="p-3 text-sm text-white text-center bg-red-500 font-medium rounded-lg shadow-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
