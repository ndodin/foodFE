import React from 'react';
import { Dish } from '../../types';
import { DishIllustration } from '../home/DishIllustration';
import { ArrowLeft, Heart } from 'lucide-react';

interface DishDetailViewProps {
  dish: Dish;
  onBack: () => void;
  onOpenNearbyRestaurants: (dish: Dish) => void;
  isFavorite: boolean;
  onToggleFavorite: (dishId: string) => void;
}

export const DishDetailView: React.FC<DishDetailViewProps> = ({
  dish,
  onBack,
  onOpenNearbyRestaurants,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="flex flex-col min-h-full bg-white pb-20 animate-in fade-in duration-200">
      {/* Top Header Navigation */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs px-2 py-2.5 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer"
          aria-label="Quay lại"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Chi tiết món ăn
        </span>
        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="px-5 pt-3 pb-8 space-y-6">
        {/* Top Graphic Illustration Header (matching image_d6039261) */}
        <div className="relative mx-auto flex flex-col items-center text-center">
          {/* Circular Illustration Frame */}
          <div className="relative w-44 h-44 rounded-full bg-gradient-to-b from-[#FFF5DC] to-[#FFE8A3] border-4 border-[#FFF9E6] shadow-sm flex items-center justify-center p-4">
            <DishIllustration type={dish.illustrationType} size={110} />
          </div>

          {/* Dish Name */}
          <h1 className="text-3xl font-bold text-gray-950 mt-4 tracking-tight">
            {dish.vietnameseName}
          </h1>

          {/* AI Recognition Match Tag */}
          <p className="text-xs text-gray-500 mt-1.5 flex items-center justify-center gap-1">
            <span>AI nhận diện: khớp 94%</span>
            <span>·</span>
            <button
              onClick={onBack}
              className="underline text-gray-600 hover:text-gray-900 cursor-pointer font-medium"
            >
              Không đúng? Chọn món khác
            </button>
          </p>
        </div>

        {/* Section: Thành phần thường có */}
        <div className="space-y-2.5 pt-2">
          <h2 className="text-base font-bold text-gray-900">
            Thành phần thường có
          </h2>

          {/* Pill tags matching image_d6039261 */}
          <div className="flex flex-wrap gap-2">
            {dish.ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-[#FFF1CC] text-gray-900 text-xs font-medium shadow-2xs"
              >
                {ing}
              </span>
            ))}
          </div>

          {/* Disclaimer Note */}
          <p className="text-xs text-gray-500 leading-relaxed pt-1">
            Tham khảo theo công thức phổ biến, mỗi quán có thể khác. Nếu bạn dị ứng, hãy hỏi lại quán.
          </p>
        </div>

        {/* Section: Nguồn gốc */}
        <div className="space-y-2 pt-1 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            Nguồn gốc
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed">
            {dish.originStory || dish.description}
          </p>
        </div>
      </div>

      {/* Bottom Sticky Action Bar (matching image_d6039261) */}
      <div className="sticky bottom-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center gap-3 z-30">
        <button
          onClick={() => onToggleFavorite(dish.id)}
          className={`flex-1 h-12 rounded-full font-bold text-xs border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isFavorite
              ? 'border-red-500 bg-red-50 text-red-600'
              : 'border-gray-950 bg-white text-gray-950 hover:bg-gray-50'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          <span>{isFavorite ? 'Đã lưu yêu thích' : 'Lưu yêu thích'}</span>
        </button>

        <button
          onClick={() => onOpenNearbyRestaurants(dish)}
          className="flex-1 h-12 rounded-full font-bold text-xs bg-[#FFC54A] hover:bg-[#F5BA3F] text-gray-950 transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
        >
          <span>Quán gần bạn</span>
        </button>
      </div>
    </div>
  );
};
