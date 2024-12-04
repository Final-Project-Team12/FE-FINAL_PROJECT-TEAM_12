import AccountSidebar from "./UI/AccountSidebar";
import HeaderAccount from "./UI/HeaderAccount";
import NavbarLogin from "./UI/NavbarLogin";

const Account = () => {
  return (
    <>
      <NavbarLogin />
      <HeaderAccount/>
      <div className="flex ml-[260px] mr-[212px]">
        <AccountSidebar/>
      </div>
    </>
  );
}

export default Account