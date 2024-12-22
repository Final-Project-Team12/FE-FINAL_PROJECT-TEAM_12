import { useState } from 'react';
import AccountSidebar from './UI/AccountSidebar';
import ChangeProfile from './UI/ChangeProfile';
import AccountSettings from './UI/AccountSettings';
import HeaderAccount from './UI/HeaderAccount';
import Navbar from './UI/Navbar';

const Account = () => {
  const [activeComponent, setActiveComponent] = useState('ChangeProfile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <HeaderAccount setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-col md:flex-row px-4 md:px-8 lg:ml-[260px] lg:mr-[212px]">
        <AccountSidebar
          setActiveComponent={setActiveComponent}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="w-full">
          {activeComponent === 'ChangeProfile' && <ChangeProfile />}
          {activeComponent === 'AccountSettings' && <AccountSettings />}
        </div>
      </div>
    </>
  );
};

export default Account;
