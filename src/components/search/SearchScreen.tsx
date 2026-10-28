import React, { useState, useRef } from 'react';
import { Dish, RecognitionResult } from '../../types';
import { 
  Search as SearchIcon, 
  Camera, 
  Image as ImageIcon, 
  Wifi, 
  X, 
  History, 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2, 
  Video,
  Play
} from 'lucide-react';
import { DishIllustration } from '../home/DishIllustration';
import { DishDetailView } from './DishDetailView';
import { NearbyRestaurantsView } from './NearbyRestaurantsView';

interface SearchScreenProps {
  dishes: Dish[];
  recentSearches: string[];
  onAddSearchHistory: (query: string) => void;
  onClearSearchHistory: () => void;
  onRemoveSearchQuery: (query: string) => void;
  onToggleFavoriteDish: (dishId: string) => void;
  isDishFavorite: (dishId: string) => boolean;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  dishes,
  recentSearches,
  onAddSearchHistory,
  onClearSearchHistory,
  onRemoveSearchQuery,
  onToggleFavoriteDish,
  isDishFavorite,
}) => {
  // Navigation sub-states inside Search
  const [selectedDishDetail, setSelectedDishDetail] = useState<Dish | null>(null);
  const [viewingNearbyForDish, setViewingNearbyForDish] = useState<Dish | null>(null);

  const [searchMode, setSearchMode] = useState<'keyword' | 'vision'>('keyword');
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Vision / ESP32-CAM States
  const [visionSubTab, setVisionSubTab] = useState<'upload' | 'camera' | 'esp32'>('upload');
  const [esp32Ip, setEsp32Ip] = useState('http://192.168.1.188:81/stream');
  const [isEsp32Connecting, setIsEsp32Connecting] = useState(false);
  const [isEsp32Connected, setIsEsp32Connected] = useState(false);
  const [esp32Error, setEsp32Error] = useState<string | null>(null);

  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Filter dishes by keyword & category
  const filteredDishes = dishes.filter((dish) => {
    const matchesKeyword =
      dish.name.toLowerCase().includes(keyword.toLowerCase()) ||
      dish.vietnameseName.toLowerCase().includes(keyword.toLowerCase()) ||
      dish.city.toLowerCase().includes(keyword.toLowerCase()) ||
      dish.ingredients.some((i) => i.toLowerCase().includes(keyword.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || dish.category === selectedCategory;

    return matchesKeyword && matchesCategory;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onAddSearchHistory(keyword.trim());
    }
  };

  const processImageForRecognition = (imageSrc: string, sourceType: 'camera' | 'gallery' | 'esp32') => {
    setAnalyzingImage(true);
    setRecognitionResult(null);

    setTimeout(() => {
      let targetDish = dishes[0]; // Bánh mì or Phở

      if (imageSrc.includes('banh_mi') || imageSrc.includes('baguette')) {
        targetDish = dishes.find((d) => d.id === 'dish-banh-mi') || dishes[0];
      } else if (imageSrc.includes('bun_bo') || imageSrc.includes('hue')) {
        targetDish = dishes.find((d) => d.id === 'dish-bun-bo-hue') || dishes[3];
      } else if (imageSrc.includes('com_tam') || imageSrc.includes('suon')) {
        targetDish = dishes.find((d) => d.id === 'dish-com-tam') || dishes[5];
      } else if (imageSrc.includes('mi_quang')) {
        targetDish = dishes.find((d) => d.id === 'dish-mi-quang') || dishes[4];
      } else {
        targetDish = dishes.find((d) => d.id === 'dish-banh-mi') || dishes[0];
      }

      const confidence = Number((0.91 + Math.random() * 0.06).toFixed(2));

      const otherDishes = dishes.filter((d) => d.id !== targetDish.id).slice(0, 2);
      const alternativeGuesses = otherDishes.map((d, index) => ({
        dishId: d.id,
        dishName: d.vietnameseName,
        confidence: Number((0.07 / (index + 1)).toFixed(2)),
      }));

      const result: RecognitionResult = {
        dish: targetDish,
        confidence,
        alternativeGuesses,
        detectedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        sourceType,
        previewUrl: imageSrc,
      };

      setRecognitionResult(result);
      setAnalyzingImage(false);
      onAddSearchHistory(`Nhận diện: ${targetDish.vietnameseName}`);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'camera') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          processImageForRecognition(event.target.result as string, type === 'gallery' ? 'gallery' : 'camera');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConnectEsp32 = () => {
    if (!esp32Ip.trim()) {
      setEsp32Error('Vui lòng nhập địa chỉ IP hoặc luồng của ESP32-CAM');
      return;
    }

    setIsEsp32Connecting(true);
    setEsp32Error(null);

    setTimeout(() => {
      setIsEsp32Connecting(false);
      setIsEsp32Connected(true);
    }, 1200);
  };

  const categories = ['All', 'Noodles', 'Rice', 'Banh & Rolls', 'Snacks'];

  // SCREEN SUB-VIEW 1: NEARBY RESTAURANTS (matching image_89a22abb)
  if (viewingNearbyForDish) {
    return (
      <NearbyRestaurantsView
        dish={viewingNearbyForDish}
        onBack={() => setViewingNearbyForDish(null)}
      />
    );
  }

  // SCREEN SUB-VIEW 2: DISH DETAIL (matching image_d6039261 & image_df09a82e)
  if (selectedDishDetail) {
    return (
      <DishDetailView
        dish={selectedDishDetail}
        onBack={() => setSelectedDishDetail(null)}
        onOpenNearbyRestaurants={(dish) => setViewingNearbyForDish(dish)}
        isFavorite={isDishFavorite(selectedDishDetail.id)}
        onToggleFavorite={onToggleFavoriteDish}
      />
    );
  }

  // DEFAULT VIEW: SEARCH HUB
  return (
    <div className="space-y-4 pb-20">
      {/* Search Mode Segmented Control */}
      <div className="bg-gray-100 p-1 rounded-2xl flex items-center">
        <button
          onClick={() => setSearchMode('keyword')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            searchMode === 'keyword'
              ? 'bg-white text-gray-900 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <SearchIcon size={14} />
          <span>Tìm theo từ khóa</span>
        </button>

        <button
          onClick={() => setSearchMode('vision')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            searchMode === 'vision'
              ? 'bg-[#FFC54A] text-gray-950 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Sparkles size={14} />
          <span>Nhận diện món ăn (AI)</span>
        </button>
      </div>

      {/* MODE A: KEYWORD SEARCH */}
      {searchMode === 'keyword' && (
        <div className="space-y-3.5">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <SearchIcon size={18} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm bánh mì, phở bò, bún chả, cơm tấm..."
                className="w-full h-11 pl-10 pr-10 rounded-2xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC54A] shadow-xs"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  className="absolute right-3 p-1 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FFC54A] text-gray-950 shadow-xs font-bold'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat === 'All' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>

          {/* Search History */}
          {recentSearches.length > 0 && !keyword && (
            <div className="bg-white rounded-2xl p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
                  <History size={13} />
                  Lịch sử tìm kiếm
                </span>
                <button
                  onClick={onClearSearchHistory}
                  className="text-[11px] font-medium text-red-600 hover:underline cursor-pointer"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-xs text-gray-700"
                  >
                    <button
                      onClick={() => setKeyword(item.replace('Nhận diện: ', ''))}
                      className="cursor-pointer hover:text-gray-950"
                    >
                      {item}
                    </button>
                    <button
                      onClick={() => onRemoveSearchQuery(item)}
                      className="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results List: Tapping a card opens Detail View */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Kết quả ({filteredDishes.length})
              </span>
              <span className="text-[11px] text-gray-400">Ấn để xem chi tiết & quán gần bạn</span>
            </div>

            {filteredDishes.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-200 p-6">
                <p className="text-sm font-bold text-gray-900">Không tìm thấy món ăn phù hợp</p>
                <p className="text-xs text-gray-500 mt-1">
                  Hãy thử tìm với từ khóa như "bánh mì", "phở", "cơm tấm"
                </p>
              </div>
            ) : (
              filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => setSelectedDishDetail(dish)}
                  className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex items-center gap-3.5 transition-all cursor-pointer hover:border-[#FFC54A] hover:shadow-sm group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#FFF9E6] transition-colors">
                    <DishIllustration type={dish.illustrationType} size={50} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-amber-900">
                        {dish.vietnameseName}
                      </h4>
                      <span className="text-[11px] text-amber-700 bg-[#FFF1CC] px-2 py-0.5 rounded-full font-semibold shrink-0">
                        Xem chi tiết
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 truncate mt-0.5">{dish.city} · {dish.priceRange}</p>
                    <p className="text-[11px] text-gray-600 font-medium line-clamp-1 mt-0.5">
                      {dish.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODE B: VISUAL AI RECOGNITION & ESP32-CAM */}
      {searchMode === 'vision' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setVisionSubTab('upload')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                visionSubTab === 'upload'
                  ? 'bg-white border-[#FFC54A] shadow-xs'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <ImageIcon size={20} className={visionSubTab === 'upload' ? 'text-gray-900' : ''} />
              <span className="text-xs font-bold">Thư viện ảnh</span>
            </button>

            <button
              onClick={() => setVisionSubTab('camera')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                visionSubTab === 'camera'
                  ? 'bg-white border-[#FFC54A] shadow-xs'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <Camera size={20} className={visionSubTab === 'camera' ? 'text-gray-900' : ''} />
              <span className="text-xs font-bold">Chụp ảnh</span>
            </button>

            <button
              onClick={() => setVisionSubTab('esp32')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                visionSubTab === 'esp32'
                  ? 'bg-white border-[#FFC54A] shadow-xs'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <Wifi size={20} className={visionSubTab === 'esp32' ? 'text-gray-900' : ''} />
              <span className="text-xs font-bold">ESP32-CAM</span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, 'gallery')}
          />
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFileUpload(e, 'camera')}
          />

          {/* SUB-VIEW: GALLERY */}
          {visionSubTab === 'upload' && (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FFF1CC] text-gray-900 mx-auto flex items-center justify-center">
                <ImageIcon size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Tải ảnh món ăn để nhận diện</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Chọn ảnh chụp rõ món ăn để AI xác định tên món và quán ngon xung quanh
                </p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-11 rounded-xl bg-[#FFC54A] text-gray-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#F5BA3F] cursor-pointer shadow-xs"
              >
                <ImageIcon size={16} />
                Chọn Ảnh Từ Thiết Bị
              </button>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-[11px] text-gray-500 block mb-1.5">Hoặc thử nhanh với các món mẫu:</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => processImageForRecognition('banh_mi', 'gallery')}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium text-left truncate cursor-pointer"
                  >
                    🥖 Thử Bánh mì
                  </button>
                  <button
                    onClick={() => processImageForRecognition('pho_bo', 'gallery')}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium text-left truncate cursor-pointer"
                  >
                    🍲 Thử Phở bò
                  </button>
                  <button
                    onClick={() => processImageForRecognition('bun_bo', 'gallery')}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium text-left truncate cursor-pointer"
                  >
                    🌶️ Thử Bún bò Huế
                  </button>
                  <button
                    onClick={() => processImageForRecognition('com_tam', 'gallery')}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium text-left truncate cursor-pointer"
                  >
                    🍚 Thử Cơm tấm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW: CAMERA */}
          {visionSubTab === 'camera' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 mx-auto flex items-center justify-center">
                <Camera size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Chụp ảnh món ăn trực tiếp</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Đặt đĩa món ăn vào giữa khung hình và chụp ảnh
                </p>
              </div>

              <button
                onClick={() => cameraInputRef.current?.click()}
                className="w-full h-11 rounded-xl bg-[#FFC54A] text-gray-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#F5BA3F] cursor-pointer shadow-xs"
              >
                <Camera size={16} />
                Mở Camera
              </button>
            </div>
          )}

          {/* SUB-VIEW: ESP32-CAM */}
          {visionSubTab === 'esp32' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isEsp32Connected ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <h4 className="text-sm font-bold text-gray-900">Luồng ESP32-CAM</h4>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {isEsp32Connected ? 'Đã kết nối' : 'Chưa kết nối'}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={esp32Ip}
                  onChange={(e) => setEsp32Ip(e.target.value)}
                  placeholder="http://192.168.1.xxx:81/stream"
                  className="flex-1 h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-900"
                />
                <button
                  onClick={handleConnectEsp32}
                  disabled={isEsp32Connecting}
                  className="px-4 h-10 rounded-xl bg-[#FFC54A] text-gray-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isEsp32Connecting ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                  <span>{isEsp32Connected ? 'Làm mới' : 'Kết nối'}</span>
                </button>
              </div>

              {esp32Error && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={13} />
                  {esp32Error}
                </p>
              )}

              <div className="relative w-full h-48 rounded-xl bg-gray-900 overflow-hidden flex items-center justify-center">
                {isEsp32Connected ? (
                  <div className="relative w-full h-full">
                    <img
                      src="/src/assets/images/pho_bo_hanoi_1793157175020.jpg"
                      alt="ESP32 Stream Feed"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 text-white/70 space-y-2">
                    <Video size={28} className="mx-auto text-white/40" />
                    <p className="text-xs">Chưa có luồng phát từ ESP32-CAM</p>
                    <button
                      onClick={() => {
                        setIsEsp32Connected(true);
                        setEsp32Ip('http://192.168.1.188:81/stream (Mẫu)');
                      }}
                      className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 text-xs font-semibold cursor-pointer"
                    >
                      Bật Luồng Trực Tiếp Mẫu
                    </button>
                  </div>
                )}
              </div>

              {isEsp32Connected && (
                <button
                  onClick={() => processImageForRecognition('banh_mi', 'esp32')}
                  className="w-full h-10 rounded-xl bg-gray-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-800 cursor-pointer shadow-xs"
                >
                  <Camera size={15} />
                  Chụp Khung Hình Này Để Nhận Diện
                </button>
              )}
            </div>
          )}

          {/* AI Inference Loading */}
          {analyzingImage && (
            <div className="p-5 rounded-2xl bg-white border border-gray-200 text-center space-y-2 shadow-xs">
              <RefreshCw size={24} className="animate-spin text-gray-900 mx-auto" />
              <h4 className="text-sm font-bold text-gray-900">Đang phân tích món ăn...</h4>
              <p className="text-xs text-gray-500">Mô hình AI đang đối chiếu dữ liệu</p>
            </div>
          )}

          {/* AI Inference Result Card -> Tapping opens DishDetailView! */}
          {recognitionResult && !analyzingImage && (
            <div 
              onClick={() => setSelectedDishDetail(recognitionResult.dish)}
              className="p-4 rounded-3xl bg-white border-2 border-[#FFC54A] shadow-md space-y-3 cursor-pointer hover:bg-amber-50/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 bg-[#FFF1CC] px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={14} className="text-amber-700" />
                  <span>Đã Nhận Diện Thành Công</span>
                </div>
                <span className="text-[11px] text-gray-500 font-semibold">
                  Khớp {(recognitionResult.confidence * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="w-18 h-18 rounded-2xl bg-[#FFF9E6] border border-[#FFE3A8] flex items-center justify-center shrink-0">
                  <DishIllustration type={recognitionResult.dish.illustrationType} size={58} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-950 leading-tight">
                    {recognitionResult.dish.vietnameseName}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{recognitionResult.dish.city}</p>
                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                    {recognitionResult.dish.description}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDishDetail(recognitionResult.dish);
                }}
                className="w-full h-11 rounded-2xl bg-[#FFC54A] hover:bg-[#F5BA3F] text-gray-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Xem Chi Tiết Món & Quán Gần Bạn</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
