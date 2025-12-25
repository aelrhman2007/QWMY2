
import React from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  onExport: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onExport, isDarkMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-800 z-50 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="p-1.5 hover:bg-gray-50 dark:hover:bg-neutral-900 rounded-md transition-colors"
          aria-label="القائمة"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <button 
          onClick={onExport}
          className="bg-[#FfC200] hover:bg-[#9d7503] text-black font-bold py-1 px-4 rounded transition-all shadow-sm active:scale-95 text-xs"
        >
          حفظ التصميم
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="font-black text-lg tracking-tighter text-black dark:text-[#FfC200]">QWMY</span>
        <div className="w-6 h-6 bg-[#FfC200] rounded-full flex items-center justify-center font-bold text-black text-[9px]">قومي</div>
      </div>
    </header>
  );
};

export default Header;
