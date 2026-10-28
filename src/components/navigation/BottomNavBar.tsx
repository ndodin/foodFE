import React from 'react';
import { Home, Search, Heart, User } from 'lucide-react';
import { BottomNavDestination } from '../../types';

interface BottomNavBarProps {
  currentDestination: BottomNavDestination;
  onSelectDestination: (dest: BottomNavDestination) => void;
  favoritesCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentDestination,
  onSelectDestination,
  favoritesCount,
}) => {
  const navItems: { id: BottomNavDestination; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'search', label: 'Tìm kiếm', icon: Search },
    { id: 'favorites', label: 'Yêu thích', icon: Heart },
    { id: 'account', label: 'Tài khoản', icon: User },
  ];

  return (
    <nav 
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 pb-safe"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = currentDestination === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectDestination(item.id)}
              className="group flex flex-col items-center justify-center min-h-[52px] min-w-[48px] py-1 transition-all duration-200 cursor-pointer"
            >
              {/* Material 3 active indicator pill */}
              <div 
                className={`relative flex items-center justify-center w-14 h-8 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#FFC54A] text-gray-950 font-bold shadow-xs' 
                    : 'text-gray-500 group-hover:bg-gray-100'
                }`}
              >
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.4 : 1.9}
                  className={`transition-transform duration-200 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
                />
                
                {/* Badge for Favorites */}
                {item.id === 'favorites' && favoritesCount > 0 && (
                  <span className="absolute -top-0.5 right-2 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {favoritesCount}
                  </span>
                )}
              </div>

              {/* Caption */}
              <span 
                className={`text-[11px] mt-1 transition-colors leading-tight ${
                  isActive 
                    ? 'font-bold text-gray-900' 
                    : 'font-medium text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
