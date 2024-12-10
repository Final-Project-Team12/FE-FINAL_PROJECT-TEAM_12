import AuthBanner from '../components/Elements/Banner/AuthBanner';
import RegisterForm from '../components/UI/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
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
