import AuthBanner from '../components/Elements/Banner/AuthBanner';
import RegisterForm from '../components/UI/RegisterForm';
import Loading from '../components/Elements/Loading/Loading';
import { useSelector } from 'react-redux';

const RegisterPage = () => {
  const loading = useSelector((state) => state.register.loading);

  return (
    <div className="relative flex min-h-screen bg-white">
      {loading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="hidden md:flex md:w-1/2">
        <AuthBanner />
      </div>
      <div className="w-full md:w-1/2 overflow-y-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
