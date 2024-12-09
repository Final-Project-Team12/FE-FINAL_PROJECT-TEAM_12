import { useState } from "react";
import AccountSidebar from "./UI/AccountSidebar";
import ChangeProfile from "./UI/ChangeProfile";
import AccountSettings from "./UI/AccountSettings";
import HeaderAccount from "./UI/HeaderAccount";
import NavbarLogin from "./UI/NavbarLogin";

const Account = () => {
  const [activeComponent, setActiveComponent] = useState("ChangeProfile"); // Default komponen awal

  return (
    <>
      <NavbarLogin />
      <HeaderAccount />
      <div className="flex ml-[260px] mr-[212px]">
        {/* Sidebar menerima fungsi untuk mengubah komponen aktif */}
        <AccountSidebar setActiveComponent={setActiveComponent} />

        {/* Render komponen sesuai dengan state */}
        <div className="w-full">
          {activeComponent === "ChangeProfile" && <ChangeProfile />}
          {activeComponent === "AccountSettings" && <AccountSettings />}
        </div>
      </div>
    </>
  );
};

export default Account;
