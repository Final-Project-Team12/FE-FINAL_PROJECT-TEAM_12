import { useNavigate } from 'react-router-dom';

const ChangeProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4 space-y-4 mt-14 border rounded-lg mb-10">
      <div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold mb-[16px] mt-8">
                Ubah Data Profil
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full h-[40px] rounded-t-[6px] bg-[#A06ECE] mb-2 flex items-center">
            <div className="ml-3 text-white">Data Diri</div>
          </div>

          <div className="px-4 py-2">
            <label
              htmlFor="nama-lengkap"
              className="block mb-1 text-sm font-bold text-purple-800 dark:text-white"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama-lengkap"
              className=" border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
              placeholder="Nama Lengkap "
              value="John Doe"
              required
            />
          </div>
          <div className="px-4 py-2">
            <label
              htmlFor="nomor-telepon"
              className="block mb-1 text-sm font-bold text-purple-800 dark:text-white"
            >
              Nomor Telepon
            </label>
            <input
              type="text"
              id="nomor-telepon"
              className=" border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
              placeholder="+628xxxxxxxx "
              value="+6281234567891"
              required
            />
          </div>
          <div className="px-4 py-2 mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-bold text-purple-800 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className=" border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
              placeholder="email@example.com "
              value="johndoe@email.com"
              required
            />
          </div>
          <div className="flex flex-col items-center ">
            <button
              type="submit"
              className="mt-1 px-6 py-2 bg-purple-900 text-white rounded-md text-sm  hover:bg-purple-950  transition-colors duration-400"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
