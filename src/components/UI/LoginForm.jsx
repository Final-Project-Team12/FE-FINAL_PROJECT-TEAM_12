import { useForm } from 'react-hook-form';
import Button from '../Elements/Buttons/Button';
import InputField from '../Elements/InputField/InputField';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Masuk</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-2 text-xs text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}

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
            <a
              href="/reset-password"
              className="text-[#7126B5] hover:underline text-sm"
            >
              Lupa Kata Sandi
            </a>
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Masuk'}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Belum punya akun?{' '}
            <a href="/register" className="text-[#7126B5] hover:underline">
              Daftar di sini
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
