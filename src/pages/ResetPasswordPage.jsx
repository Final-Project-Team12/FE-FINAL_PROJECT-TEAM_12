import AuthBanner from '../components/Elements/Banner/AuthBanner';
import ResetPasswordForm from '../components/UI/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="flex">
      <div className="w-1/2">
        <AuthBanner />
      </div>
      <div className="w-1/2">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
