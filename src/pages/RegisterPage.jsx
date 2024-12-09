import RegisterForm from '../components/UI/RegisterForm';
import AuthBanner from '../components/Elements/Banner/AuthBanner';

const RegisterPage = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <AuthBanner />
      <div className="flex items-center justify-center">
        <div className="w-2/3">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
