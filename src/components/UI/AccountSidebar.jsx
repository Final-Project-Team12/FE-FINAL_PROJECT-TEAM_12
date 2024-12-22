import { LogOut, PencilLine, Settings, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AccountSidebar = ({ setActiveComponent, isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const handleItemClick = (component) => {
    setActiveComponent(component);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white z-50 transition-transform duration-300
          w-[260px] lg:relative lg:translate-x-0 lg:z-0 lg:mb-[47px] lg:mt-6
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-100 p-1 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div
            className="flex items-center justify-between cursor-pointer group hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50"
            onClick={() => handleItemClick('ChangeProfile')}
          >
            <div className="flex items-center gap-2">
              <PencilLine size={24} className="text-purple-700" />
              <span className="font-normal text-left text-sm sm:text-base whitespace-nowrap">
                Ubah Profil
              </span>
            </div>
          </div>
          <hr className="my-4 bg-slate-400" />

          <div
            className="flex items-center justify-between cursor-pointer group hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50"
            onClick={() => handleItemClick('AccountSettings')}
          >
            <div className="flex items-center gap-2">
              <Settings size={24} className="text-purple-700" />
              <span className="font-normal text-left text-sm sm:text-base whitespace-nowrap">
                Pengaturan Akun
              </span>
            </div>
          </div>
          <hr className="my-4 bg-slate-400" />

          <div
            className="flex items-center justify-between cursor-pointer hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-2">
              <LogOut size={24} className="text-purple-700" />
              <span className="font-normal text-left text-sm sm:text-base whitespace-nowrap">
                Logout
              </span>
            </div>
          </div>
          <hr className="my-4 bg-slate-400" />

          <footer className="text-xs font-normal text-slate-500 text-center mt-6">
            Version 1.1.0
          </footer>
        </div>
      </div>
    </>
  );
};

export default AccountSidebar;
