import { LogOut, PencilLine, Settings } from "lucide-react";

const AccountSidebar = ({ setActiveComponent }) => {
  return (
    <div className="mb-[47px] mt-6">
      <div className="w-[260px] bg-white p-8">
        {/* Ubah Profil */}
        <div
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => setActiveComponent("ChangeProfile")}
        >
          <div className="flex items-center gap-2">
            <PencilLine size={24} className="text-purple-700" />
            <span className="font-normal text-left">Ubah Profil</span>
          </div>
        </div>
        <hr className="my-4 bg-slate-400" />

        {/* Pengaturan Akun */}
        <div
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => setActiveComponent("AccountSettings")}
        >
          <div className="flex items-center gap-2">
            <Settings size={24} className="text-purple-700" />
            <span className="font-normal text-left">Pengaturan Akun</span>
          </div>
        </div>
        <hr className="my-4 bg-slate-400" />

        {/* Logout */}
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <LogOut size={24} className="text-purple-700" />
            <span className="font-normal text-left">Logout</span>
          </div>
        </div>
        <hr className="my-4 bg-slate-400" />

        <footer className="text-xs font-normal text-slate-500 mb-6 text-center">
          Version 1.1.0
        </footer>
      </div>
    </div>
  );
};

export default AccountSidebar;
