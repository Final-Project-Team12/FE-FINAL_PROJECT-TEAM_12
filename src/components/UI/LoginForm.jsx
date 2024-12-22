import { useForm } from 'react-hook-form';
import Button from '../Elements/Buttons/Button';
import InputField from '../Elements/InputField/InputField';
import { useAuth } from '../../hooks/useAuth';
import useResetPassword from '../../hooks/useResetPassword';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const { login, loading } = useAuth();
  const { handleForgotPassword } = useResetPassword();
  const [submissionCount, setSubmissionCount] = useState(0);

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

  const onSubmit = async (data) => {
    setSubmissionCount((prev) => prev + 1);
    await login(data);
  };

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();
    if (!emailValue) {
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Masukkan email Anda terlebih dahulu',
        showConfirmButton: true,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
          confirmButton:
            'bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded',
        },
      });
      return;
    }

    try {
      await handleForgotPassword(emailValue);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Gagal mengirim OTP',
        showConfirmButton: true,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
          confirmButton:
            'bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded',
        },
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
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
      </div>
    </div>
  );
};

export default LoginForm;
