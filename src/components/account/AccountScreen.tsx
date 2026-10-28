import React, { useState } from 'react';
import { UserAccount } from '../../types';
import { 
  User, 
  Mail, 
  Key, 
  Lock, 
  LogOut, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface AccountScreenProps {
  user: UserAccount;
  onUpdateUser: (user: Partial<UserAccount>) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onDeleteAccount,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Change Password State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Delete Account Confirmation State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [showNewPass, setShowNewPass] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authEmail.includes('@')) {
      setAuthError('Vui lòng nhập email hợp lệ.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('Mật khẩu tối thiểu 6 ký tự.');
      return;
    }

    onUpdateUser({
      email: authEmail,
      fullName: authFullName.trim() || 'Người Dùng AnDay',
      isLoggedIn: true,
    });
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword) {
      setPasswordError('Vui lòng nhập mật khẩu hiện tại.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu mới tối thiểu 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setPasswordSuccess('Đổi mật khẩu thành công!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordSuccess(null);
    }, 1200);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmationText.trim().toUpperCase() !== 'XÓA' && deleteConfirmationText.trim().toUpperCase() !== 'XOA') {
      setDeleteError('Vui lòng nhập chữ "XOA" để xác nhận.');
      return;
    }

    setShowDeleteModal(false);
    onDeleteAccount();
  };

  return (
    <div className="space-y-4 pb-24">
      {!user.isLoggedIn ? (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC54A] text-gray-950 mx-auto flex items-center justify-center font-bold text-base">
              ĂnĐầy
            </div>
            <h3 className="text-base font-bold text-gray-900">
              {authMode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản Mới'}
            </h3>
            <p className="text-xs text-gray-500">
              Lưu giữ các món ngon đặc sản và đồng bộ danh sách yêu thích
            </p>
          </div>

          <div className="bg-gray-100 p-1 rounded-xl flex items-center">
            <button
              onClick={() => {
                setAuthMode('login');
                setAuthError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'login' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setAuthError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'register' ? 'bg-[#FFC54A] text-gray-950 shadow-xs' : 'text-gray-600'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {authError && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-3">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Họ và tên</label>
                <div className="relative flex items-center">
                  <User size={15} className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    value={authFullName}
                    onChange={(e) => setAuthFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC54A]"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 text-gray-400" />
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC54A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mật khẩu</label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-gray-400" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full h-10 pl-9 pr-9 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC54A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#FFC54A] text-gray-950 font-bold text-xs hover:bg-[#F5BA3F] transition-all cursor-pointer shadow-xs mt-2"
            >
              {authMode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-gray-900 text-[#FFC54A] font-bold text-lg flex items-center justify-center shrink-0">
              {user.fullName.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 truncate">
                {user.fullName}
              </h3>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Thành viên từ {user.memberSince}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <span className="text-[11px] text-gray-500 font-medium">Món đã lưu</span>
              <p className="text-base font-bold text-red-500 mt-0.5">{user.savedDishIds.length}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <span className="text-[11px] text-gray-500 font-medium">Quán đã lưu</span>
              <p className="text-base font-bold text-gray-900 mt-0.5">{user.savedRestaurantIds.length}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <span className="text-[11px] text-gray-500 font-medium">Tìm kiếm</span>
              <p className="text-base font-bold text-amber-600 mt-0.5">{user.recentSearches.length}</p>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                  <Key size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Đổi mật khẩu</h4>
                  <p className="text-[11px] text-gray-500">Cập nhật mật khẩu bảo mật</p>
                </div>
              </div>
              <ChevronRight size={15} className="text-gray-400" />
            </button>

            <button
              onClick={onLogout}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                  <LogOut size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Đăng xuất</h4>
                  <p className="text-[11px] text-gray-500">Đăng xuất khỏi thiết bị này</p>
                </div>
              </div>
              <ChevronRight size={15} className="text-gray-400" />
            </button>
          </div>

          {/* DANGER ZONE: ACCOUNT DELETION */}
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle size={15} />
              <span className="text-xs font-bold uppercase tracking-wider">Vùng Nguy Hiểm</span>
            </div>
            <p className="text-xs text-red-600/90 leading-relaxed">
              Xóa tài khoản vĩnh viễn sẽ xóa sạch toàn bộ danh sách món ăn yêu thích và lịch sử tìm kiếm. Thao tác này không thể hoàn tác.
            </p>

            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteConfirmationText('');
                setDeleteError(null);
              }}
              className="w-full h-9 rounded-xl bg-white border border-red-300 text-red-700 hover:bg-red-600 hover:text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 size={13} />
              <span>Yêu Cầu Xóa Tài Khoản</span>
            </button>
          </div>
        </>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-gray-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Key size={15} />
                Đổi Mật Khẩu
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {passwordError && (
              <div className="p-2 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-200">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle size={14} />
                {passwordSuccess}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  required
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 h-9 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 h-9 rounded-lg bg-[#FFC54A] text-gray-950 text-xs font-bold hover:bg-[#F5BA3F]"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT CONFIRMATION DIALOG */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-red-300 shadow-xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-gray-900">
                Xác Nhận Xóa Tài Khoản?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tất cả dữ liệu cá nhân và món ăn đã lưu sẽ bị xóa vĩnh viễn khỏi AnDayDemo.
              </p>
            </div>

            {deleteError && (
              <p className="text-xs text-red-600 font-medium text-center">{deleteError}</p>
            )}

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1 text-center">
                Nhập chữ <span className="text-red-600 font-mono">XOA</span> bên dưới:
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="XOA"
                className="w-full h-9 text-center font-bold tracking-widest uppercase rounded-lg bg-gray-50 border border-red-300 text-xs text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 h-9 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 h-9 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
