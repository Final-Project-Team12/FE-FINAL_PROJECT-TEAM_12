import AuthBanner from '../components/Elements/Banner/AuthBanner';
import ResetPasswordForm from '../components/UI/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden md:flex md:w-1/2">
        <AuthBanner />
      </div>
      <div className="w-full md:w-1/2">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
