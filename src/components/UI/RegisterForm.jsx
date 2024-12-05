import { Link } from 'react-router-dom';

import InputField from '../Elements/InputField/InputField';
import Button from '../Elements/Buttons/Button';

const RegisterForm = () => {
  return (
    <div className="h-screen flex">
      <div className="my-auto w-full mx-[20%]">
        <h2 className="text-[24px] font-bold mb-4">Daftar</h2>
        <form action="">
          <div>
            <InputField
              label="Nama"
              type="text"
              placeholder="Contoh: Budi agung"
            />
          </div>
          <div>
            <InputField
              label="Email"
              type="email"
              placeholder="Contoh: Budiagung@gmail.com"
            />
          </div>
          <div>
            <InputField
              label="Nomor Telepon"
              type="tel"
              pattern="[0-9]{11,13}"
              placeholder="Contoh: 085818890911"
            />
          </div>
          <div>
            <InputField
              label="Buat Password"
              type="password"
              placeholder="*****"
              showPasswordToggle
            />
          </div>

          <div className="mt-6">
            <Button type="submit" className="h-[48px]">
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
