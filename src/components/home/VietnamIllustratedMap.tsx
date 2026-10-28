import React from 'react';
import { RegionId } from '../../types';
import { MapPin } from 'lucide-react';

interface VietnamIllustratedMapProps {
  selectedCity: string;
  onSelectCity: (region: RegionId, city: string) => void;
}

export interface MapPinPoint {
  city: string;
  region: RegionId;
  label: string;
  xPercent: number; // Left % on map
  yPercent: number; // Top % on map
}

export const MAP_LOCATIONS: MapPinPoint[] = [
  { city: 'Sapa', region: 'north', label: 'Sa Pa', xPercent: 35, yPercent: 17 },
  { city: 'Hanoi', region: 'north', label: 'Hà Nội', xPercent: 51, yPercent: 23 },
  { city: 'Halong Bay', region: 'north', label: 'Hạ Long', xPercent: 62, yPercent: 29 },
  { city: 'Hue', region: 'central', label: 'Huế', xPercent: 59, yPercent: 46 },
  { city: 'Da Nang', region: 'central', label: 'Đà Nẵng', xPercent: 65, yPercent: 50 },
  { city: 'Hoi An', region: 'central', label: 'Hội An', xPercent: 69, yPercent: 57 },
  { city: 'Nha Trang', region: 'central', label: 'Nha Trang', xPercent: 73, yPercent: 71 },
  { city: 'Dalat', region: 'central', label: 'Đà Lạt', xPercent: 68, yPercent: 76 },
  { city: 'Ho Chi Minh City', region: 'south', label: 'TP. Hồ Chí Minh', xPercent: 55, yPercent: 83 },
  { city: 'Mekong Delta', region: 'south', label: 'Miền Tây', xPercent: 47, yPercent: 89 },
];

export const VietnamIllustratedMap: React.FC<VietnamIllustratedMapProps> = ({
  selectedCity,
  onSelectCity,
}) => {
  const currentPin = MAP_LOCATIONS.find((loc) => loc.city === selectedCity) || MAP_LOCATIONS[1];

  return (
    <div className="space-y-3">
      {/* Title & Current Selection */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC54A]" />
            Bản Đồ Ẩm Thực Việt Nam
          </h2>
          <p className="text-xs text-gray-500">Chạm vào địa danh trên bản đồ để xem món đặc sản</p>
        </div>

        <div className="text-right">
          <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFC54A] text-gray-900 shadow-xs">
            {currentPin.label}
          </span>
        </div>
      </div>

      {/* Accessible Location Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {MAP_LOCATIONS.map((loc) => {
          const isSelected = selectedCity === loc.city;
          return (
            <button
              key={loc.city}
              onClick={() => onSelectCity(loc.region, loc.city)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FFC54A] text-gray-950 font-bold shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <MapPin size={12} className={isSelected ? 'text-gray-950' : 'text-gray-400'} />
              <span>{loc.label}</span>
            </button>
          );
        })}
      </div>

      {/* Illustrated Map Card using the user reference artwork */}
      <div className="relative w-full rounded-2xl bg-white border border-gray-200 p-2 shadow-xs overflow-hidden">
        <div className="relative mx-auto max-w-[340px] select-none">
          {/* Vietnam Illustrated Reference Image */}
          <img
            src="/assets/aistudio/image_5e056402.png"
            alt="Bản đồ minh họa ẩm thực Việt Nam"
            className="w-full h-auto rounded-xl block pointer-events-none"
          />

          {/* Clickable Map Hotspot Pins */}
          {MAP_LOCATIONS.map((loc) => {
            const isSelected = selectedCity === loc.city;

            return (
              <button
                key={loc.city}
                onClick={() => onSelectCity(loc.region, loc.city)}
                style={{
                  left: `${loc.xPercent}%`,
                  top: `${loc.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-1.5 focus:outline-none"
                aria-label={`Chọn địa danh ${loc.label}`}
              >
                {/* Ping animation when selected */}
                {isSelected && (
                  <span className="absolute inset-0 rounded-full bg-[#FFC54A] opacity-75 animate-ping" />
                )}

                {/* Pin Circle */}
                <span
                  className={`relative flex items-center justify-center rounded-full transition-all duration-200 shadow-md ${
                    isSelected
                      ? 'w-7 h-7 bg-[#FFC54A] text-gray-900 border-2 border-white scale-110 font-bold'
                      : 'w-5 h-5 bg-white text-gray-700 border border-gray-300 hover:scale-110'
                  }`}
                >
                  <MapPin size={isSelected ? 14 : 11} className={isSelected ? 'text-gray-900 fill-current' : 'text-[#FFC54A] fill-current'} />
                </span>

                {/* Floating Tag on Selection or Hover */}
                {isSelected && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded-md bg-gray-900 text-white text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none z-10">
                    {loc.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
