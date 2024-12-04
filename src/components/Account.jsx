import AccountSidebar from "./UI/AccountSidebar";
import NavbarLogin from "./UI/NavbarLogin";

const Account = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <NavbarLogin />
      <div className="flex ml-[260px] mr-[212px]">
        <AccountSidebar/>
      </div>
    </div>
  );
}

export default Account