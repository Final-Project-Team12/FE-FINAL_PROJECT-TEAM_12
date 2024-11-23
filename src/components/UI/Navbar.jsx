import { Search, Plane, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-purple-600 font-bold text-xl flex items-center">
              <Plane className="mr-2" size={24} />
              Tiketku
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari di sini ..."
                className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center">
              <User className="mr-2" size={18} />
              Masuk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
