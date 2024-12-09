import RegisterForm from '../components/UI/RegisterForm';
import AuthBanner from '../components/Elements/Banner/AuthBanner';

const RegisterPage = () => {
  return (
    <div className="flex">
      <div className="w-1/2">
        <AuthBanner />
      </div>
      <div className="w-1/2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
