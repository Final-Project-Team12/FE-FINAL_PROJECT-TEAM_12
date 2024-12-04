import AuthBanner from '../components/Elements/Banner/AuthBanner';
import LoginForm from '../components/UI/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden md:flex md:w-1/2">
        <AuthBanner />
      </div>
      <div className="w-full md:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
