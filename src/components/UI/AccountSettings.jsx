import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { deleteUserAccount, resetUserData } from '../../store/slices/userSlice';
import { logout } from '../../store/slices/authSlice';
import { AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';

const AccountSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { deleteLoading } = useSelector((state) => state.user);

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Hapus Akun',
      html: `
        <div class="text-left">
          <p class="mb-4">Apakah anda yakin ingin menghapus akun? Tindakan ini akan:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Menghapus semua data profil anda</li>
            <li>Menghapus seluruh riwayat transaksi</li>
            <li>Tidak dapat dikembalikan</li>
          </ul>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus Akun',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700',
        cancelButton: 'bg-gray-500 hover:bg-gray-600',
      },
    });

    if (result.isConfirmed && user?.id) {
      try {
        await dispatch(deleteUserAccount(user.id)).unwrap();
        dispatch(resetUserData());

        await Swal.fire({
          icon: 'success',
          title: 'Akun Terhapus',
          text: 'Akun anda telah berhasil dihapus',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/login', { replace: true });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Gagal menghapus akun',
        });
      }
    }
  };

  return (
    <div className="w-full p-6 space-y-6 mt-14 border rounded-lg mb-10 bg-white shadow-sm">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Pengaturan Akun
        </h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                Zona Berbahaya
              </h3>
              <p className="text-red-600 mb-4">
                Menghapus akun anda akan menghapus secara permanen semua data
                dan tidak dapat dikembalikan.
              </p>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg text-sm font-medium 
                  hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-2"
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Menghapus Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Hapus Akun Saya</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
