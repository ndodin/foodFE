import React, { useState, useEffect } from 'react';
import { BottomNavDestination, Dish, RegionId, UserAccount } from './types';
import { DISHES_DATASET, ALL_RESTAURANTS } from './data/vietnameseFoodDataset';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { MaterialTopAppBar } from './components/common/MaterialTopAppBar';
import { HomeScreen } from './components/home/HomeScreen';
import { SearchScreen } from './components/search/SearchScreen';
import { FavoritesScreen } from './components/favorites/FavoritesScreen';
import { AccountScreen } from './components/account/AccountScreen';
import { KotlinComposeCodeViewer } from './components/compose_export/KotlinComposeCodeViewer';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [currentDestination, setCurrentDestination] = useState<BottomNavDestination>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Hanoi');
  const [isCodeViewerOpen, setIsCodeViewerOpen] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // User and Favorites State (backed by localStorage)
  const [user, setUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('anday_user_state_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      id: 'user-001',
      fullName: 'Nguyễn Minh Quân',
      email: 'minhquan.foodie@gmail.com',
      avatarUrl: '',
      memberSince: 'Tháng 3, 2024',
      isLoggedIn: true,
      savedDishIds: ['dish-pho-bo', 'dish-bun-bo-hue'],
      savedRestaurantIds: ['rest-pho-thin', 'rest-bun-bo-hue-o-cuong'],
      recentSearches: ['Phở bò Hà Nội', 'Bún chả Hà Nội', 'Bún bò Huế'],
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('anday_user_state_v2', JSON.stringify(user));
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Toggle Favorite Dish
  const handleToggleFavoriteDish = (dishId: string) => {
    setUser((prev) => {
      const isSaved = prev.savedDishIds.includes(dishId);
      const newSaved = isSaved
        ? prev.savedDishIds.filter((id) => id !== dishId)
        : [...prev.savedDishIds, dishId];

      const dishName = DISHES_DATASET.find((d) => d.id === dishId)?.vietnameseName || 'Món ăn';
      showToast(isSaved ? `Đã bỏ lưu "${dishName}"` : `Đã lưu "${dishName}"`);

      return {
        ...prev,
        savedDishIds: newSaved,
      };
    });
  };

  // Toggle Favorite Restaurant
  const handleToggleFavoriteRestaurant = (restId: string) => {
    setUser((prev) => {
      const isSaved = prev.savedRestaurantIds.includes(restId);
      const newSaved = isSaved
        ? prev.savedRestaurantIds.filter((id) => id !== restId)
        : [...prev.savedRestaurantIds, restId];

      const restName = ALL_RESTAURANTS.find((r) => r.id === restId)?.name || 'Quán ăn';
      showToast(isSaved ? `Đã bỏ lưu "${restName}"` : `Đã lưu "${restName}"`);

      return {
        ...prev,
        savedRestaurantIds: newSaved,
      };
    });
  };

  const handleSelectLocation = (_region: RegionId, city: string) => {
    setSelectedCity(city);
  };

  const handleAddSearchHistory = (query: string) => {
    setUser((prev) => {
      const filtered = prev.recentSearches.filter((q) => q.toLowerCase() !== query.toLowerCase());
      return {
        ...prev,
        recentSearches: [query, ...filtered].slice(0, 8),
      };
    });
  };

  const handleClearSearchHistory = () => {
    setUser((prev) => ({ ...prev, recentSearches: [] }));
    showToast('Đã xóa lịch sử tìm kiếm');
  };

  const handleRemoveSearchQuery = (query: string) => {
    setUser((prev) => ({
      ...prev,
      recentSearches: prev.recentSearches.filter((q) => q !== query),
    }));
  };

  const handleUpdateUser = (fields: Partial<UserAccount>) => {
    setUser((prev) => ({ ...prev, ...fields }));
    showToast('Cập nhật thành công');
  };

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showToast('Đã đăng xuất');
  };

  const handleDeleteAccount = () => {
    const emptyUser: UserAccount = {
      id: 'guest',
      fullName: 'Khách',
      email: '',
      avatarUrl: '',
      memberSince: '',
      isLoggedIn: false,
      savedDishIds: [],
      savedRestaurantIds: [],
      recentSearches: [],
    };
    setUser(emptyUser);
    showToast('Đã xóa tài khoản');
  };

  const savedDishesList = DISHES_DATASET.filter((d) => user.savedDishIds.includes(d.id));
  const savedRestaurantsList = ALL_RESTAURANTS.filter((r) => user.savedRestaurantIds.includes(r.id));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start text-gray-900 font-sans antialiased selection:bg-[#FFC54A]">
      {/* Top Controls Bar */}
      <div className="w-full max-w-md sm:max-w-4xl py-2 px-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">AnDayDemo</span>
          <span>·</span>
          <span>Giao diện Android Material 3</span>
        </div>

        <button
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 transition-colors cursor-pointer shadow-2xs"
        >
          {deviceFrameMode ? <Smartphone size={13} /> : <Monitor size={13} />}
          <span>{deviceFrameMode ? 'Khung Pixel' : 'Toàn màn hình'}</span>
        </button>
      </div>

      {/* Main Container / Device Frame */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col bg-white ${
          deviceFrameMode
            ? 'max-w-md my-1 sm:my-2 min-h-[840px] rounded-3xl sm:rounded-[40px] shadow-xl border sm:border-8 border-gray-800 overflow-hidden'
            : 'max-w-xl min-h-screen shadow-md'
        }`}
      >
        {/* Android Status Bar */}
        <div className="px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-bold text-gray-700 select-none shrink-0 bg-white">
          <span>09:41</span>
          <div className="w-3.5 h-3.5 rounded-full bg-black/80" />
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div className="w-5 h-2.5 rounded-xs border border-gray-700 p-0.5 flex items-center">
              <div className="w-full h-full bg-gray-900 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Material 3 Top App Bar */}
        <MaterialTopAppBar
          currentDestination={currentDestination}
          onOpenCodeViewer={() => setIsCodeViewerOpen(true)}
        />

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 no-scrollbar bg-white">
          {currentDestination === 'home' && (
            <HomeScreen
              selectedCity={selectedCity}
              onSelectLocation={handleSelectLocation}
              dishes={DISHES_DATASET}
              isDishFavorite={(dishId) => user.savedDishIds.includes(dishId)}
              onToggleFavoriteDish={handleToggleFavoriteDish}
            />
          )}

          {currentDestination === 'search' && (
            <SearchScreen
              dishes={DISHES_DATASET}
              recentSearches={user.recentSearches}
              onAddSearchHistory={handleAddSearchHistory}
              onClearSearchHistory={handleClearSearchHistory}
              onRemoveSearchQuery={handleRemoveSearchQuery}
              onToggleFavoriteDish={handleToggleFavoriteDish}
              isDishFavorite={(dishId) => user.savedDishIds.includes(dishId)}
            />
          )}

          {currentDestination === 'favorites' && (
            <FavoritesScreen
              savedDishes={savedDishesList}
              savedRestaurants={savedRestaurantsList}
              onRemoveFavoriteDish={handleToggleFavoriteDish}
              onRemoveFavoriteRestaurant={handleToggleFavoriteRestaurant}
              onNavigateToHome={() => setCurrentDestination('home')}
            />
          )}

          {currentDestination === 'account' && (
            <AccountScreen
              user={user}
              onUpdateUser={handleUpdateUser}
              onLogout={handleLogout}
              onDeleteAccount={handleDeleteAccount}
            />
          )}
        </main>

        {/* Material 3 Bottom Navigation Bar */}
        <BottomNavBar
          currentDestination={currentDestination}
          onSelectDestination={(dest) => setCurrentDestination(dest)}
          favoritesCount={user.savedDishIds.length + user.savedRestaurantIds.length}
        />

        {/* Toast / Snackbar */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 animate-in fade-in duration-150">
            <span className="w-2 h-2 rounded-full bg-[#FFC54A]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Kotlin Jetpack Compose Code Inspector Modal */}
      <KotlinComposeCodeViewer
        isOpen={isCodeViewerOpen}
        onClose={() => setIsCodeViewerOpen(false)}
      />
    </div>
  );
}
