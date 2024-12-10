import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useRegister from '../../hooks/useRegister';

import InputField from '../Elements/InputField/InputField';
import Button from '../Elements/Buttons/Button';
import { useSelector } from 'react-redux';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleRegister } = useRegister();
  const loading = useSelector((state) => state.register.loading);

  const onSubmit = async (dataUser) => {
    const transformedData = {
      ...dataUser,
      gender:
        dataUser.gender.toLowerCase() === 'laki-laki'
          ? 'male'
          : dataUser.gender.toLowerCase() === 'perempuan'
            ? 'female'
            : dataUser.gender,
    };

    try {
      await handleRegister(transformedData);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <div className="">
        <h2 className="text-[24px] font-bold mb-4">Daftar</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <InputField
              label="Nama"
              type="text"
              placeholder="Contoh: Budi agung"
              error={errors.name}
              {...register('name', {
                required: 'Nama wajib diisi',
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: 'Nama hanya boleh berisi huruf dan spasi',
                },
              })}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="Email"
              type="email"
              placeholder="Contoh: Budiagung@gmail.com"
              error={errors.email}
              {...register('email', {
                required: 'Email wajib diisi',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Format email tidak valid',
                },
              })}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="Nomor Telepon"
              type="text"
              placeholder="Contoh: 085818890911"
              error={errors.telephone_number}
              {...register('telephone_number', {
                required: 'Nomor telepon wajib diisi',
                pattern: {
                  value: /^[0-9]{11,13}$/,
                  message: 'Nomor telepon harus 11-13 angka',
                },
              })}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="Alamat"
              type="text"
              placeholder="Contoh: Desa Sukamulya, Kab Bekasi"
              error={errors.address}
              {...register('address', {
                required: 'Alamat wajib diisi',
                pattern: {
                  value: /^[a-zA-Z0-9\s,./]+$/,
                  message: 'Alamat hanya boleh berisi huruf dan angka',
                },
              })}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="Jenis Kelamin"
              type="text"
              placeholder="laki-laki/perempuan"
              error={errors.gender}
              {...register('gender', {
                required: 'Jenis kelamin wajib diisi',
                pattern: {
                  value: /^(laki-laki|perempuan)$/i,
                  message:
                    'Jenis kelamin hanya boleh "laki-laki" atau "perempuan"',
                },
              })}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="Umur"
              type="text"
              placeholder="minimal 17 tahun"
              error={errors.age}
              {...register('age', {
                required: 'Umur wajib diisi',
                pattern: {
                  value: /^(1[7-9]|[2-9][0-9])$/,
                  message: 'Umur harus angka dan lebih dari 17 tahun',
                },
              })}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="NIK"
              type="text"
              placeholder="3602041211870001"
              error={errors.identity_number}
              {...register('identity_number', {
                required: 'NIK wajib diisi',
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: 'NIK harus terdiri dari 16 digit angka',
                },
              })}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="Buat Password"
              type="password"
              placeholder="*****"
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
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className={`h-[48px] ${loading ? 'bg-[#D0B7E6]' : 'bg-[#7126B5]'}`}
              disabled={loading}
            >
              Daftar
            </Button>
          </div>
        </form>

        <div className="mt-[48px] flex justify-center">
          <p>
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-[#7126B5]">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
