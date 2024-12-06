const AccountSettings = () => {
  return (
    <div className="w-full p-4 space-y-4 mt-14 border rounded-lg mb-10">
      <div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold mb-[16px] mt-8">
                Pengaturan Akun
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full h-[40px] rounded-t-[6px] bg-[#A06ECE] mb-2 flex items-center">
            <div className="ml-3 text-white">Reset Password</div>
          </div>

          <div className="px-4 py-2">
            <label
              htmlFor="current-password"
              className="block mb-1 text-sm font-bold text-purple-800 dark:text-white"
            >
              Current Password
            </label>
            <input
              type="password"
              id="current-password"
              className=" border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="px-4 py-2">
            <label
              htmlFor="new-password"
              className="block mb-1 text-sm font-bold text-purple-800 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className=" border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="px-4 py-2 mb-4">
            <label
              htmlFor="confirm-password"
              className="block mb-1 text-sm font-bold text-purple-800 dark:text-white"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="new-password"
              className=" border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
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

export default AccountSettings;
