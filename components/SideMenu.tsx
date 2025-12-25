
import React from 'react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, isDarkMode, toggleDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-80 max-w-[80vw] bg-white dark:bg-neutral-900 h-full shadow-2xl p-6 transition-transform">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold dark:text-white">إعدادات المنصة</h2>
          <button onClick={onClose} className="p-2 dark:text-white">&times;</button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-medium dark:text-gray-300">الوضع الليلي</span>
            <button 
              onClick={toggleDarkMode}
              className={`w-14 h-7 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-[#FfC200]' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-0' : '-translate-x-7'}`}></div>
            </button>
          </div>

          <hr className="border-gray-100 dark:border-neutral-800" />

          <nav className="space-y-4">
            <a href="https://links.com" className="block text-gray-700 dark:text-gray-300 hover:text-[#FfC200] transition-colors">موقعنا الإلكتروني</a>
            <a href="https://links.com" className="block text-gray-700 dark:text-gray-300 hover:text-[#FfC200] transition-colors">تواصل معنا</a>
            <a href="https://links.com" className="block text-gray-700 dark:text-gray-300 hover:text-[#FfC200] transition-colors">سياسة الاستخدام</a>
          </nav>

          <div className="absolute bottom-10 left-6 right-6 text-center text-xs text-gray-400">
            QWMY Generator v1.0.0 &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
