import InputField from '../Elements/InputField/InputField';
import Button from '../Elements/Buttons/Button';

const ResetPasswordForm = () => {
  return (
    <div className="h-screen flex">
      <div className="my-auto w-full mx-[20%]">
        <h2 className="font-bold text-[24px] mb-[24px]">Reset Password</h2>
        <form action="">
          <div>
            <InputField
              label="Masukan Password Baru"
              type="password"
              showPasswordToggle
            />
          </div>
          <div>
            <InputField
              label="Ulangi Password Baru"
              type="password"
              showPasswordToggle
            />
          </div>
          <div className="mt-6">
            <Button type="submit" className="h-[48px]">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
