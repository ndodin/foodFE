import React, { useState } from 'react';
import { BottomNavDestination } from '../../types';
import { Code2, UtensilsCrossed, Download, Check } from 'lucide-react';
import { downloadAndroidProjectZip } from '../../utils/androidProjectZip';

interface MaterialTopAppBarProps {
  currentDestination: BottomNavDestination;
  onOpenCodeViewer: () => void;
}

export const MaterialTopAppBar: React.FC<MaterialTopAppBarProps> = ({
  currentDestination,
  onOpenCodeViewer,
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await downloadAndroidProjectZip();
      setTimeout(() => setDownloading(false), 2000);
    } catch (err) {
      console.error(err);
      setDownloading(false);
    }
  };

  const getDestinationTitle = () => {
    switch (currentDestination) {
      case 'home':
        return 'Trang chủ';
      case 'search':
        return 'Tìm kiếm';
      case 'favorites':
        return 'Yêu thích';
      case 'account':
        return 'Tài khoản';
      default:
        return 'ĂnĐầy';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-3.5 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#FFC54A] text-gray-950 flex items-center justify-center font-black shadow-xs">
            <UtensilsCrossed size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">
              ĂnĐầy
            </span>
            <span className="text-[10px] text-gray-500 leading-none">
              {getDestinationTitle()}
            </span>
          </div>
        </div>

        {/* Action Zone: Download Android Project ZIP & View Compose Code */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FFC54A] hover:bg-[#F5BA3F] text-gray-950 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap"
            title="Tải toàn bộ source code dự án Android Studio (.zip)"
          >
            {downloading ? (
              <Check size={13} className="text-gray-950" />
            ) : (
              <Download size={13} className="text-gray-950" />
            )}
            <span>{downloading ? 'Đang tải...' : 'Tải ZIP Android'}</span>
          </button>

          <button
            onClick={onOpenCodeViewer}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs whitespace-nowrap"
            title="Xem mã nguồn Kotlin Jetpack Compose"
          >
            <Code2 size={13} className="text-[#FFC54A]" />
            <span>Mã Compose</span>
          </button>
        </div>
      </div>
    </header>
  );
};
