import { useForm } from 'react-hook-form';
import Button from '../Elements/Buttons/Button';
import InputField from '../Elements/InputField/InputField';
import { useAuth } from '../../hooks/useAuth';
import useResetPassword from '../../hooks/useResetPassword';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const { handleForgotPassword } = useResetPassword();
  const [showError, setShowError] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [localError, setLocalError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailValue = watch('email');

  useEffect(() => {
    if ((error || localError) && submissionCount > 0) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error, localError, submissionCount]);

  const onSubmit = async (data) => {
    setSubmissionCount((prev) => prev + 1);
    await login(data);
  };

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();
    if (!emailValue) {
      setLocalError('Masukkan email Anda terlebih dahulu');
      setSubmissionCount((prev) => prev + 1);
      return;
    }

    try {
      await handleForgotPassword(emailValue);
    } catch (error) {
      setLocalError(error.message || 'Gagal mengirim OTP');
      setSubmissionCount((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md relative">
        <h1 className="text-2xl font-bold mb-6">Masuk</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <InputField
              label="Email/No Telepon"
              type="email"
              placeholder="Contoh: johndoe@gmail.com"
              error={errors.email}
              {...register('email', {
                required: 'Email wajib diisi',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email tidak valid',
                },
              })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-normal text-gray-900">
                Password
              </label>
              <Link
                to="#"
                onClick={handleForgotPasswordClick}
                className="text-[#7126B5] hover:underline text-sm"
              >
                Lupa Kata Sandi
              </Link>
            </div>

            <InputField
              type="password"
              placeholder="Masukkan password"
              error={errors.password}
              showPasswordToggle
              {...register('password', {
                required: 'Password wajib diisi',
                minLength: {
                  value: 6,
                  message: 'Password minimal 6 karakter',
                },
              })}
            />
          </div>

          <div className="mt-6">
            <Button className="h-[48px]" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Masuk'}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Belum punya akun?{' '}
              <Link
                to="/register"
                className="text-[#7126B5] hover:underline font-bold"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </form>

        <div
          className={`
            absolute 
            right-0 
            -bottom-20
            w-full
            transition-all duration-300 ease-in-out
            ${showError ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          <div className="p-3 text-sm text-white text-center bg-red-500 font-medium rounded-lg shadow-lg">
            {error || localError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
