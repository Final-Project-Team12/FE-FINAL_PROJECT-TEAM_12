import { Eye } from 'lucide-react';
import { useState } from 'react';
import Button from '../Elements/Buttons/Button';
import InputField from '../Elements/InputField/InputField';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Masuk</h1>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-2 text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}
        <InputField
          label="Email/No Telepon"
          type="email"
          placeholder="Contoh: johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-normal text-gray-900">
              Password
            </label>
            <a
              href="/reset-password"
              className="text-sm text-purple-600 hover:underline"
            >
              Lupa Kata Sandi
            </a>
          </div>
          <InputField
            type={showPassword ? 'text' : 'password'}
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Eye size={20} />
              </button>
            }
          />
        </div>

        <Button disabled={loading}>{loading ? 'Loading...' : 'Masuk'}</Button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <a href="/register" className="text-purple-600 hover:underline">
            Daftar di sini
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
