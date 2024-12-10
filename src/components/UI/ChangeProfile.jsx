import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserById, updateUserProfile } from '../../store/slices/userSlice';
import Swal from 'sweetalert2';

const ChangeProfile = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userState = useSelector((state) => state.user);
  const { userData, loading, error, updateLoading, updateError } = userState;

  const [formData, setFormData] = useState({
    name: '',
    telephone_number: '',
    address: '',
  });

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserById(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        telephone_number: userData.telephone_number || '',
        address: userData.address || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User ID tidak ditemukan',
      });
      return;
    }

    try {
      if (!formData.name || !formData.telephone_number || !formData.address) {
        throw new Error('Semua field harus diisi');
      }

      const result = await dispatch(
        updateUserProfile({
          userId: user.id,
          userData: formData,
        })
      ).unwrap();

      if (result) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Profil berhasil diperbarui',
          showConfirmButton: false,
          timer: 1500,
        });

        dispatch(fetchUserById(user.id));
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'Gagal memperbarui profil',
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4 space-y-4 mt-14 border rounded-lg mb-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-4 mt-14 border rounded-lg mb-10">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-[16px] mt-8">Ubah Data Profil</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <div className="w-full h-[40px] rounded-t-[6px] bg-[#A06ECE] mb-2 flex items-center">
              <div className="ml-3 text-white">Data Diri</div>
            </div>

            <div className="px-4 py-2">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-bold text-purple-800"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                className="border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={updateLoading}
              />
            </div>

            <div className="px-4 py-2">
              <label
                htmlFor="telephone_number"
                className="block mb-1 text-sm font-bold text-purple-800"
              >
                Nomor Telepon
              </label>
              <input
                type="text"
                id="telephone_number"
                className="border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Masukkan nomor telepon"
                value={formData.telephone_number}
                onChange={handleChange}
                required
                disabled={updateLoading}
              />
            </div>

            <div className="px-4 py-2 mb-4">
              <label
                htmlFor="address"
                className="block mb-1 text-sm font-bold text-purple-800"
              >
                Alamat
              </label>
              <input
                type="text"
                id="address"
                className="border text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Masukkan alamat"
                value={formData.address}
                onChange={handleChange}
                required
                disabled={updateLoading}
              />
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className={`mt-1 px-6 py-2 bg-purple-900 text-white rounded-md text-sm hover:bg-purple-950 transition-colors duration-400 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs
                  ${updateLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>Menyimpan...</span>
                  </div>
                ) : (
                  'Simpan'
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-sm text-center">
            Error: {error}
          </div>
        )}

        {updateError && (
          <div className="mt-4 text-red-600 text-sm text-center">
            Error: {updateError}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeProfile;
