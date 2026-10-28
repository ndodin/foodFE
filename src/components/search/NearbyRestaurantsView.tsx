import React, { useState } from 'react';
import { Dish, Restaurant } from '../../types';
import { ArrowLeft, MapPin, Star, Navigation, Compass, Check } from 'lucide-react';

interface NearbyRestaurantsViewProps {
  dish: Dish;
  onBack: () => void;
}

export const NearbyRestaurantsView: React.FC<NearbyRestaurantsViewProps> = ({
  dish,
  onBack,
}) => {
  const [currentLocation, setCurrentLocation] = useState<string>('Đang dùng GPS');
  const [isChangingLocation, setIsChangingLocation] = useState<boolean>(false);
  const [customLocationInput, setCustomLocationInput] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating');

  // Provide realistic fallback restaurants if dish has empty restaurant list
  const baseRestaurants: Restaurant[] = dish.restaurants.length > 0 
    ? dish.restaurants 
    : [
        {
          id: `rest-${dish.id}-1`,
          name: `Quán ${dish.vietnameseName} Phố Cổ`,
          address: 'Số 12 Phố Cổ, Trung Tâm',
          city: dish.city,
          rating: 4.8,
          reviewCount: 145,
          averagePrice: `Giá trung bình ${dish.priceRange.split('-')[0].trim()}`,
          distanceKm: 0.8,
          openHours: '06:30 - 21:30',
          phone: '090 123 4567',
          signatureDishes: [dish.vietnameseName],
        },
        {
          id: `rest-${dish.id}-2`,
          name: `Quán Đặc Sản ${dish.vietnameseName}`,
          address: 'Số 38 Đường Ven Sông',
          city: dish.city,
          rating: 4.7,
          reviewCount: 98,
          averagePrice: `Giá trung bình ${dish.priceRange.split('-')[0].trim()}`,
          distanceKm: 1.6,
          openHours: '07:00 - 22:00',
          phone: '090 876 5432',
          signatureDishes: [dish.vietnameseName],
        },
        {
          id: `rest-${dish.id}-3`,
          name: `Bếp Gia Truyền ${dish.vietnameseName}`,
          address: 'Kiot 5 Khu Ẩm Thực',
          city: dish.city,
          rating: 4.9,
          reviewCount: 312,
          averagePrice: `Giá trung bình ${dish.priceRange.split('-')[0].trim()}`,
          distanceKm: 2.3,
          openHours: '08:00 - 21:00',
          phone: '091 234 5678',
          signatureDishes: [dish.vietnameseName],
        },
      ];

  // Sort restaurants
  const sortedRestaurants = [...baseRestaurants].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return a.distanceKm - b.distanceKm;
    }
  });

  const handleOpenGoogleMaps = (rest: Restaurant) => {
    const destinationQuery = encodeURIComponent(`${rest.name}, ${rest.address}`);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleApplyLocation = (newLoc: string) => {
    setCurrentLocation(newLoc);
    setIsChangingLocation(false);
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-20 animate-in fade-in duration-200">
      {/* Top Header matching image_89a22abb: < Quán bán [Tên món] */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs px-2 py-2.5 flex items-center gap-2 border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-900 transition-colors cursor-pointer"
          aria-label="Quay lại"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-gray-950 truncate">
          Quán bán {dish.vietnameseName}
        </h1>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Location Box matching image_89a22abb */}
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin size={17} className="text-gray-700 shrink-0" />
            <div className="text-xs truncate">
              <span className="text-gray-500">Vị trí: </span>
              <span className="font-semibold text-gray-900">{currentLocation}</span>
            </div>
          </div>

          <button
            onClick={() => setIsChangingLocation(!isChangingLocation)}
            className="text-xs font-bold text-gray-900 underline hover:text-amber-700 px-2 py-1 cursor-pointer shrink-0"
          >
            Đổi
          </button>
        </div>

        {/* Location Change Modal / Dropdown */}
        {isChangingLocation && (
          <div className="p-3.5 rounded-2xl bg-white border-2 border-[#FFC54A] shadow-md space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">Chọn vị trí tìm quán</span>
              <button
                onClick={() => setIsChangingLocation(false)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Đóng
              </button>
            </div>

            <button
              onClick={() => handleApplyLocation('Đang dùng GPS')}
              className="w-full h-9 rounded-xl bg-[#FFF1CC] text-gray-950 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#FFE3A8] transition-colors cursor-pointer"
            >
              <Compass size={14} />
              <span>Bật định vị GPS (Vị trí hiện tại)</span>
            </button>

            <div className="flex gap-1.5">
              <input
                type="text"
                value={customLocationInput}
                onChange={(e) => setCustomLocationInput(e.target.value)}
                placeholder="Nhập quận/huyện hoặc thành phố..."
                className="flex-1 h-9 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC54A]"
              />
              <button
                onClick={() => {
                  if (customLocationInput.trim()) {
                    handleApplyLocation(customLocationInput.trim());
                    setCustomLocationInput('');
                  }
                }}
                className="px-3.5 h-9 rounded-xl bg-gray-900 text-white text-xs font-bold cursor-pointer"
              >
                Lưu
              </button>
            </div>

            {/* Quick Location Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Quận 1, TP.HCM', 'Hoàn Kiếm, Hà Nội', 'Hải Châu, Đà Nẵng', 'TP. Huế'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleApplyLocation(preset)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 text-[11px] text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter / Sort Tabs matching image_89a22abb */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={() => setSortBy('rating')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              sortBy === 'rating'
                ? 'bg-[#FFC54A] text-gray-950 shadow-2xs'
                : 'bg-[#FFF1CC]/60 text-gray-700 hover:bg-[#FFF1CC]'
            }`}
          >
            Đánh giá cao nhất
          </button>

          <button
            onClick={() => setSortBy('distance')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              sortBy === 'distance'
                ? 'bg-[#FFC54A] text-gray-950 shadow-2xs'
                : 'bg-[#FFF1CC]/60 text-gray-700 hover:bg-[#FFF1CC]'
            }`}
          >
            Gần nhất
          </button>
        </div>

        {/* Restaurant Cards matching image_89a22abb */}
        <div className="space-y-3 pt-1">
          {sortedRestaurants.map((rest) => (
            <div
              key={rest.id}
              className="bg-white rounded-3xl p-4 border border-gray-200 shadow-2xs space-y-2 hover:border-[#FFC54A] transition-colors"
            >
              {/* Header: Name & Distance Badge */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-gray-950 leading-snug">
                  {rest.name}
                </h3>

                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold shrink-0">
                  {rest.distanceKm.toFixed(1).replace('.', ',')} km
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <span className="font-bold text-gray-900">{rest.rating.toFixed(1)}</span>
                <span className="text-gray-500 font-normal">({rest.reviewCount} đánh giá)</span>
              </div>

              {/* Average Price */}
              <p className="text-xs text-gray-600">
                {rest.averagePrice}
              </p>

              {/* Address */}
              <p className="text-xs text-gray-500 line-clamp-1">
                {rest.address}
              </p>

              {/* Action Button: Chỉ đường matching image_89a22abb */}
              <div className="pt-2">
                <button
                  onClick={() => handleOpenGoogleMaps(rest)}
                  className="w-36 h-10 rounded-full bg-[#FFC54A] hover:bg-[#F5BA3F] text-gray-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Navigation size={13} className="fill-current" />
                  <span>Chỉ đường</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
