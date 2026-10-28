import React from 'react';
import { Dish, Restaurant } from '../../types';
import { X, Heart, MapPin, Star, Flame, Utensils, Phone, Clock, Share2 } from 'lucide-react';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  isDishFavorite: boolean;
  onToggleFavoriteDish: (dishId: string) => void;
  isRestaurantFavorite: (restId: string) => boolean;
  onToggleFavoriteRestaurant: (restId: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  isDishFavorite,
  onToggleFavoriteDish,
  isRestaurantFavorite,
  onToggleFavoriteRestaurant,
}) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div 
        className="w-full max-w-lg max-h-[90vh] bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle for mobile drag feel */}
        <div className="w-12 h-1.5 bg-[#DDD3BE] rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 no-scrollbar pb-6">
          {/* Hero Image Container with Scrim & Action Overlays */}
          <div className="relative w-full h-64 bg-[#EADFCD] overflow-hidden">
            <img
              src={dish.imageUrl}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback styled background
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Dark gradient scrim for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {/* Top action buttons */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavoriteDish(dish.id)}
                  className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                    isDishFavorite
                      ? 'bg-[#C93B2B] text-white shadow-md scale-105'
                      : 'bg-black/40 hover:bg-black/60 text-white'
                  }`}
                  aria-label={isDishFavorite ? 'Bỏ lưu món ăn' : 'Lưu món ăn yêu thích'}
                >
                  <Heart size={20} fill={isDishFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Dish Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FFC54A] text-[#291C00]">
                  {dish.region === 'north' ? 'Miền Bắc' : dish.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                </span>
                <span className="text-xs text-white/90 font-medium flex items-center gap-1">
                  <MapPin size={12} className="text-[#FFC54A]" />
                  {dish.city}
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                {dish.vietnameseName}
              </h2>
              <p className="text-sm text-white/80 font-medium">
                {dish.name}
              </p>
            </div>
          </div>

          {/* Core Info Bar */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-[#F5EEDC]/60 border-b border-[#E8DFC8]">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 border border-[#EADFCD] text-center">
              <span className="text-[10px] text-[#7A6D5C] font-semibold uppercase">Mức giá</span>
              <span className="text-xs font-bold text-[#1B4332] mt-0.5">{dish.priceRange}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 border border-[#EADFCD] text-center">
              <span className="text-[10px] text-[#7A6D5C] font-semibold uppercase">Độ cay</span>
              <div className="flex items-center gap-0.5 mt-1 text-[#C93B2B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Flame
                    key={i}
                    size={12}
                    className={i < dish.spiciness ? 'fill-current' : 'opacity-20 text-gray-400'}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 border border-[#EADFCD] text-center">
              <span className="text-[10px] text-[#7A6D5C] font-semibold uppercase">Phân loại</span>
              <span className="text-xs font-bold text-[#3B2C14] mt-0.5">{dish.category}</span>
            </div>
          </div>

          {/* Description & Taste Profile */}
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-[#7A6D5C] uppercase tracking-wider mb-1.5">
                Giới Thiệu & Hương Vị
              </h3>
              <p className="text-sm text-[#382F24] leading-relaxed">
                {dish.description}
              </p>
              <div className="mt-2 text-xs font-medium text-[#1B4332] bg-[#E8F5E9] px-3 py-2 rounded-xl">
                <span className="font-bold">Đặc trưng:</span> {dish.flavorProfile}
              </div>
            </div>

            {/* Key Ingredients */}
            <div>
              <h3 className="text-xs font-bold text-[#7A6D5C] uppercase tracking-wider mb-2">
                Nguyên Liệu Chính & Rau Thơm
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-[#E5DAC6] text-[#4A3E31]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Restaurants Serving this Dish */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-[#7A6D5C] uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils size={14} className="text-[#1B4332]" />
                  Quán Ăn Nổi Tiếng ({dish.restaurants.length})
                </h3>
              </div>

              <div className="space-y-2.5">
                {dish.restaurants.map((rest: Restaurant) => {
                  const isSaved = isRestaurantFavorite(rest.id);

                  return (
                    <div
                      key={rest.id}
                      className="p-3 rounded-2xl bg-white border border-[#EADBCC] shadow-xs hover:border-[#FFC54A] transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-[#201A18] leading-snug">
                            {rest.name}
                          </h4>
                          <p className="text-xs text-[#7A6D5C] flex items-center gap-1 mt-0.5">
                            <MapPin size={11} className="text-[#1B4332] shrink-0" />
                            <span className="line-clamp-1">{rest.address}</span>
                          </p>
                        </div>

                        {/* Save Restaurant Button */}
                        <button
                          onClick={() => onToggleFavoriteRestaurant(rest.id)}
                          className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                            isSaved
                              ? 'bg-[#C93B2B]/10 text-[#C93B2B]'
                              : 'bg-[#F5EEDC] text-[#695D4D] hover:text-[#C93B2B]'
                          }`}
                          aria-label={isSaved ? 'Bỏ lưu quán' : 'Lưu quán ăn'}
                        >
                          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2ECE1] text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#B07200] flex items-center gap-1">
                            <Star size={13} fill="currentColor" />
                            {rest.rating}
                            <span className="text-[#8E806F] font-normal">({rest.reviewCount})</span>
                          </span>
                          <span className="text-[#6D6050] font-medium flex items-center gap-1">
                            <Clock size={11} />
                            {rest.openHours}
                          </span>
                        </div>

                        {rest.phone && (
                          <a
                            href={`tel:${rest.phone}`}
                            className="flex items-center gap-1 text-[11px] font-bold text-[#1B4332] hover:underline"
                          >
                            <Phone size={11} />
                            Gọi quán
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Action */}
        <div className="p-3 bg-white border-t border-[#E8DFC8] flex items-center gap-2">
          <button
            onClick={() => onToggleFavoriteDish(dish.id)}
            className={`flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isDishFavorite
                ? 'bg-[#1B4332] text-white shadow-sm'
                : 'bg-[#FFC54A] text-[#291C00] hover:bg-[#F5BA3F] shadow-sm'
            }`}
          >
            <Heart size={18} fill={isDishFavorite ? 'currentColor' : 'none'} />
            {isDishFavorite ? 'Đã Lưu Vào Yêu Thích' : 'Lưu Vào Món Ăn Yêu Thích'}
          </button>
        </div>
      </div>
    </div>
  );
};
