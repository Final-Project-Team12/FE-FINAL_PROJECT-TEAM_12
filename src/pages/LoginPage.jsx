import AuthBanner from '../components/Elements/Banner/AuthBanner';
import LoginForm from '../components/UI/LoginForm';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Elements/Loading/Loading';

const LoginPage = () => {
  const { loading } = useAuth();

  return (
    <div className="relative flex h-[100vh] bg-white">
      {loading && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
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
