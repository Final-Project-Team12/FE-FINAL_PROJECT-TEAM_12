import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useRegister from '../../hooks/useRegister';
import InputField from '../Elements/InputField/InputField';
import Button from '../Elements/Buttons/Button';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleRegister } = useRegister();
  const loading = useSelector((state) => state.register.loading);
  const error = useSelector((state) => state.register.error);
  const [showError, setShowError] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    if (error && submissionCount > 0) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error, submissionCount]);

  const onSubmit = async (dataUser) => {
    setSubmissionCount((prev) => prev + 1);
    const transformedData = {
      ...dataUser,
      gender: dataUser.gender === 'laki-laki' ? 'male' : 'female',
    };

    try {
      await handleRegister(transformedData);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="w-full max-w-md mx-auto relative">
        <h2 className="text-2xl font-bold mb-6">Daftar</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Nama"
            type="text"
            placeholder="Nama Lengkap"
            error={errors.name}
            {...register('name', {
              required: 'Nama wajib diisi',
              pattern: {
                value: /^[a-zA-Z\s'-]+$/,
                message: 'Nama hanya boleh berisi huruf dan spasi',
              },
            })}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Contoh: quickfly@gmail.com"
            error={errors.email}
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format email tidak valid',
              },
            })}
          />

          <InputField
            label="Nomor Telepon"
            type="text"
            placeholder="Contoh: 08123456789"
            error={errors.telephone_number}
            {...register('telephone_number', {
              required: 'Nomor telepon wajib diisi',
              pattern: {
                value: /^[0-9]{11,13}$/,
                message: 'Nomor telepon harus 11-13 angka',
              },
            })}
          />

          <InputField
            label="Alamat"
            type="text"
            placeholder="Contoh: Jl. Raya, No. 123"
            error={errors.address}
            {...register('address', {
              required: 'Alamat wajib diisi',
              pattern: {
                value: /^[a-zA-Z0-9\s,./]+$/,
                message: 'Alamat hanya boleh berisi huruf dan angka',
              },
            })}
          />

          <div>
            <label className="block text-sm font-normal text-gray-900 mb-2">
              Jenis Kelamin
            </label>
            <div className="relative">
              <select
                className={`w-full px-4 py-2.5 rounded-lg border appearance-none bg-white
                ${errors.gender ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                {...register('gender', {
                  required: 'Jenis kelamin wajib diisi',
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih jenis kelamin
                </option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">
                {errors.gender.message}
              </p>
            )}
          </div>

          <InputField
            label="Umur"
            type="text"
            placeholder="Minimal 17 tahun"
            error={errors.age}
            {...register('age', {
              required: 'Umur wajib diisi',
              pattern: {
                value: /^(1[7-9]|[2-9][0-9])$/,
                message: 'Umur harus angka dan lebih dari 17 tahun',
              },
            })}
          />

          <InputField
            label="NIK"
            type="text"
            placeholder="Masukkan NIK 16 Digit"
            error={errors.identity_number}
            {...register('identity_number', {
              required: 'NIK wajib diisi',
              pattern: {
                value: /^[0-9]{16}$/,
                message: 'NIK harus terdiri dari 16 digit angka',
              },
            })}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="********"
            showPasswordToggle
            error={errors.password}
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: {
                value: 8,
                message: 'Password minimal 8 karakter',
              },
            })}
          />

          <div className="mt-6">
            <Button type="submit" className="h-[48px]" disabled={loading}>
              {loading ? 'Mendaftar...' : 'Daftar'}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Sudah punya akun?{' '}
              <Link
                to="/login"
                className="text-[#7126B5] hover:underline font-bold"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </form>

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

export default RegisterForm;
