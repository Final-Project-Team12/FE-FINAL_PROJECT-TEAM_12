import RegisterForm from '../components/UI/RegisterForm';
import AuthBanner from '../components/Elements/Banner/AuthBanner';
import Otp from '../components/UI/Otp';

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

{
  /* <div>
<Otp />
</div> */
}
// import RegisterForm from '../components/UI/RegisterForm';
// import AuthBanner from '../components/Elements/Banner/AuthBanner';

// const RegisterPage = () => {
//   return (
//     <div className="flex">
//       <div className="w-1/2">
//         <AuthBanner />
//       </div>
//       <div className="w-1/2">
//         <RegisterForm />
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
