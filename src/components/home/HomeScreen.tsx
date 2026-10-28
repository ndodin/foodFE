import React from 'react';
import { Dish, RegionId } from '../../types';
import { VietnamIllustratedMap, MAP_LOCATIONS } from './VietnamIllustratedMap';
import { DishIllustration } from './DishIllustration';
import { Heart, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  selectedCity: string;
  onSelectLocation: (region: RegionId, city: string) => void;
  dishes: Dish[];
  isDishFavorite: (dishId: string) => boolean;
  onToggleFavoriteDish: (dishId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedCity,
  onSelectLocation,
  dishes,
  isDishFavorite,
  onToggleFavoriteDish,
}) => {
  // Filter dishes specifically for the selected city
  const regionalDishes = dishes.filter((dish) => dish.city === selectedCity);

  const currentPin = MAP_LOCATIONS.find((loc) => loc.city === selectedCity) || MAP_LOCATIONS[1];

  return (
    <div className="space-y-4 pb-20">
      {/* Illustrated Vietnam Map from user reference */}
      <VietnamIllustratedMap
        selectedCity={selectedCity}
        onSelectCity={onSelectLocation}
      />

      {/* Regional Specialties Section */}
      <div className="pt-1">
        <div className="flex items-center justify-between px-1 mb-2.5">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <span>Đặc Sản {currentPin.label}</span>
            <span className="text-xs font-normal text-gray-500">({regionalDishes.length} món)</span>
          </h3>
        </div>

        {/* Dish List with Cartoon Artwork & Basic Info Only */}
        <div className="space-y-3">
          {regionalDishes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center text-gray-500">
              <p className="text-xs">Đang cập nhật thêm đặc sản cho {currentPin.label}</p>
            </div>
          ) : (
            regionalDishes.map((dish) => {
              const isSaved = isDishFavorite(dish.id);

              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-2xl p-3.5 border border-gray-200 shadow-xs flex items-center gap-3.5 transition-all"
                >
                  {/* Cartoon Illustrated Artwork */}
                  <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-1">
                    <DishIllustration type={dish.illustrationType} size={66} />
                  </div>

                  {/* Basic Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">
                        {dish.vietnameseName}
                      </h4>

                      {/* Favorite Button */}
                      <button
                        onClick={() => onToggleFavoriteDish(dish.id)}
                        className={`p-1.5 -mr-1 -mt-1 rounded-full transition-colors cursor-pointer ${
                          isSaved
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                        title={isSaved ? 'Bỏ lưu' : 'Lưu món yêu thích'}
                        aria-label={isSaved ? 'Bỏ lưu' : 'Lưu món'}
                      >
                        <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Brief description */}
                    <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Basic details: price & flavor */}
                    <div className="flex items-center justify-between text-xs mt-2 pt-1.5 border-t border-gray-100">
                      <span className="font-semibold text-gray-900">
                        {dish.priceRange}
                      </span>
                      <span className="text-[11px] text-gray-500 truncate max-w-[130px]">
                        {dish.flavorProfile}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
