import { Box, Heart, DollarSign } from 'lucide-react';

const AccountSidebar = () => {
  return (
    <>
      <div className=" mb-[47px]">
        <div className="w-[260px] bg-white p-6">

          {/* Ubah Profil */}
          <div>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Box size={24} className="text-slate-500" />
                <span className="font-normal text-left">Ubah Profil</span>
              </div>
            </div>
          </div>
          <hr className="my-4 bg-slate-400" />

          {/* Pengaturan Akun */}
          <div>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Heart size={24} className="text-slate-500" />
                <span className="font-normal text-left">Pengaturan Akun</span>
              </div>
            </div>
          </div>
          <hr className="my-4 bg-slate-400" />

        {/* Logout */}
        <div>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <DollarSign size={24} className="text-slate-500" />
              <span className="font-normal text-left">Logout</span>
            </div>
          </div>
        </div>

        </div>
      </div>
    </>
  );
};

export default AccountSidebar;
