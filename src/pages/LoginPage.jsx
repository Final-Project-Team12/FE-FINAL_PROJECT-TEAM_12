import AuthBanner from '../components/Elements/Banner/AuthBanner';
import LoginForm from '../components/UI/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <AuthBanner />
      <div className="w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
