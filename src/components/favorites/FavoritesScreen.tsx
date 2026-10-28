import React, { useState } from 'react';
import { Dish, Restaurant } from '../../types';
import { Heart, Trash2, Utensils, MapPin, Star, ArrowRight, Phone, Clock } from 'lucide-react';
import { DishIllustration } from '../home/DishIllustration';

interface FavoritesScreenProps {
  savedDishes: Dish[];
  savedRestaurants: Restaurant[];
  onRemoveFavoriteDish: (dishId: string) => void;
  onRemoveFavoriteRestaurant: (restId: string) => void;
  onNavigateToHome: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  savedDishes,
  savedRestaurants,
  onRemoveFavoriteDish,
  onRemoveFavoriteRestaurant,
  onNavigateToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'dishes' | 'restaurants'>('dishes');

  return (
    <div className="space-y-4 pb-20">
      {/* Segmented Filter */}
      <div className="bg-gray-100 p-1 rounded-2xl flex items-center">
        <button
          onClick={() => setActiveTab('dishes')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'dishes'
              ? 'bg-white text-gray-900 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Utensils size={14} />
          <span>Món Ăn ({savedDishes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('restaurants')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'restaurants'
              ? 'bg-[#FFC54A] text-gray-950 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Heart size={14} />
          <span>Quán Ăn ({savedRestaurants.length})</span>
        </button>
      </div>

      {/* DISHES LIST */}
      {activeTab === 'dishes' && (
        <div className="space-y-3">
          {savedDishes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 space-y-3">
              <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Chưa có món ăn yêu thích</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1">
                  Nhấn vào biểu tượng trái tim ở trang chủ để lưu lại các món đặc sản
                </p>
              </div>

              <button
                onClick={onNavigateToHome}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFC54A] text-gray-950 font-bold text-xs hover:bg-[#F5BA3F] transition-all cursor-pointer shadow-xs"
              >
                <span>Khám phá món ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            savedDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex items-center gap-3"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <DishIllustration type={dish.illustrationType} size={52} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {dish.vietnameseName}
                    </h4>
                    <button
                      onClick={() => onRemoveFavoriteDish(dish.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Bỏ lưu"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 truncate">{dish.city} · {dish.priceRange}</p>
                  <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* RESTAURANTS LIST */}
      {activeTab === 'restaurants' && (
        <div className="space-y-3">
          {savedRestaurants.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 space-y-3">
              <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                <Utensils size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Chưa có quán ăn yêu thích</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1">
                  Lưu các quán ăn để dễ dàng tìm kiếm khi ghé thăm
                </p>
              </div>

              <button
                onClick={onNavigateToHome}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 transition-all cursor-pointer shadow-xs"
              >
                <span>Xem bản đồ ẩm thực</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            savedRestaurants.map((rest) => (
              <div
                key={rest.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">
                      {rest.name}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-gray-400 shrink-0" />
                      <span>{rest.address}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onRemoveFavoriteRestaurant(rest.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Bỏ lưu"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star size={13} fill="currentColor" />
                      {rest.rating}
                    </span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock size={11} />
                      {rest.openHours}
                    </span>
                  </div>

                  {rest.phone && (
                    <a
                      href={`tel:${rest.phone}`}
                      className="font-bold text-gray-800 flex items-center gap-1 hover:underline text-[11px]"
                    >
                      <Phone size={11} />
                      {rest.phone}
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
