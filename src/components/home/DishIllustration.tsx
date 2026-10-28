import React from 'react';

export type IllustrationType = 
  | 'pho'
  | 'bun-cha'
  | 'bun-bo'
  | 'mi-quang'
  | 'cao-lau'
  | 'com-tam'
  | 'banh-xeo'
  | 'banh-mi'
  | 'cha-muc'
  | 'banh-trang-nuong'
  | 'seafood'
  | 'pot';

interface DishIllustrationProps {
  type: IllustrationType | string;
  size?: number;
  className?: string;
}

export const DishIllustration: React.FC<DishIllustrationProps> = ({
  type,
  size = 72,
  className = '',
}) => {
  switch (type) {
    case 'pho':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Steam */}
          <path d="M42 22 Q46 14 43 7" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M52 20 Q57 12 53 5" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M62 23 Q66 15 63 8" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          {/* Bowl Rim & Body */}
          <ellipse cx="50" cy="50" rx="42" ry="18" fill="#F3F4F6" stroke="#4B5563" strokeWidth="3" />
          <path d="M8 50 C8 82 26 88 50 88 C74 88 92 82 92 50 Z" fill="#FFFFFF" stroke="#4B5563" strokeWidth="3" />
          {/* Decorative Bowl Ring */}
          <path d="M12 55 Q50 68 88 55" stroke="#FFC54A" strokeWidth="4" strokeLinecap="round" />
          {/* Broth */}
          <ellipse cx="50" cy="49" rx="36" ry="13" fill="#FDE68A" />
          {/* Noodles */}
          <path d="M22 48 Q35 44 48 48 T74 46" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
          <path d="M28 52 Q45 47 62 52 T78 50" stroke="#FEF3C7" strokeWidth="4" strokeLinecap="round" />
          {/* Beef Slices */}
          <ellipse cx="38" cy="47" rx="9" ry="5" fill="#B91C1C" transform="rotate(-10 38 47)" />
          <ellipse cx="60" cy="48" rx="8" ry="4.5" fill="#991B1B" transform="rotate(15 60 48)" />
          {/* Scallions / Green Herbs */}
          <circle cx="48" cy="45" r="3" fill="#16A34A" />
          <circle cx="54" cy="52" r="2.5" fill="#22C55E" />
          <circle cx="34" cy="53" r="2.5" fill="#16A34A" />
          <circle cx="68" cy="46" r="3" fill="#22C55E" />
          {/* Chili Slice */}
          <circle cx="50" cy="49" r="2" fill="#DC2626" />
          {/* Chopsticks resting on bowl */}
          <line x1="18" y1="36" x2="88" y2="28" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="41" x2="90" y2="33" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'bun-bo':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Steam */}
          <path d="M48 20 Q52 12 48 5" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M58 22 Q63 14 59 7" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          {/* Ceramic Bowl */}
          <ellipse cx="50" cy="50" rx="42" ry="18" fill="#FEE2E2" stroke="#374151" strokeWidth="3" />
          <path d="M8 50 C8 82 26 88 50 88 C74 88 92 82 92 50 Z" fill="#FFF1F2" stroke="#374151" strokeWidth="3" />
          {/* Spicy Red Broth */}
          <ellipse cx="50" cy="49" rx="36" ry="13" fill="#EF4444" />
          {/* Round Noodles */}
          <path d="M24 49 Q40 43 56 49 T76 47" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M30 53 Q50 47 70 52" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          {/* Beef Shank */}
          <ellipse cx="36" cy="46" rx="9" ry="5" fill="#7F1D1D" />
          {/* Crab Meatball / Chả Cua */}
          <circle cx="62" cy="48" r="6" fill="#F97316" />
          {/* Herbs & Lemongrass */}
          <circle cx="50" cy="46" r="3" fill="#15803D" />
          <circle cx="48" cy="53" r="2.5" fill="#22C55E" />
          <rect x="54" y="42" width="7" height="3" rx="1.5" fill="#EAB308" transform="rotate(30 54 42)" />
        </svg>
      );

    case 'com-tam':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Plate */}
          <ellipse cx="50" cy="54" rx="46" ry="32" fill="#F9FAFB" stroke="#4B5563" strokeWidth="3" />
          <ellipse cx="50" cy="53" rx="38" ry="24" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
          {/* Broken Rice Mound */}
          <ellipse cx="36" cy="52" rx="16" ry="12" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
          {/* Scallion Oil on rice */}
          <circle cx="34" cy="48" r="2" fill="#16A34A" />
          <circle cx="38" cy="51" r="2" fill="#22C55E" />
          <circle cx="33" cy="53" r="1.5" fill="#15803D" />
          {/* Grilled Pork Chop with Char Marks */}
          <path d="M50 42 Q68 34 76 44 Q80 56 68 64 Q54 62 48 52 Z" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          <line x1="56" y1="42" x2="68" y2="48" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="49" x2="72" y2="55" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          {/* Fried Egg / Chả Trứng */}
          <ellipse cx="52" cy="65" rx="10" ry="7" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="52" cy="65" r="4" fill="#F59E0B" />
          {/* Cucumbers & Tomato */}
          <ellipse cx="26" cy="64" rx="5" ry="3" fill="#86EFAC" stroke="#16A34A" strokeWidth="1" transform="rotate(-20 26 64)" />
          <ellipse cx="32" cy="68" rx="5" ry="3" fill="#86EFAC" stroke="#16A34A" strokeWidth="1" transform="rotate(10 32 68)" />
          <circle cx="72" cy="66" r="5" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
        </svg>
      );

    case 'mi-quang':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Bowl */}
          <ellipse cx="50" cy="50" rx="42" ry="18" fill="#FEF3C7" stroke="#4B5563" strokeWidth="3" />
          <path d="M8 50 C8 82 26 88 50 88 C74 88 92 82 92 50 Z" fill="#FFFBEB" stroke="#4B5563" strokeWidth="3" />
          {/* Turmeric Shallow Broth */}
          <ellipse cx="50" cy="49" rx="36" ry="13" fill="#F59E0B" />
          {/* Golden Turmeric Rice Noodles */}
          <path d="M20 48 Q36 43 54 48 T80 47" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" />
          <path d="M26 53 Q45 47 66 52" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />
          {/* Shrimp */}
          <path d="M58 43 Q66 38 72 45 Q70 51 62 48 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          {/* Quail Egg */}
          <ellipse cx="40" cy="47" rx="5" ry="4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
          <circle cx="40" cy="47" r="2" fill="#EAB308" />
          {/* Peanuts */}
          <circle cx="48" cy="52" r="2" fill="#B45309" />
          <circle cx="53" cy="50" r="1.8" fill="#B45309" />
          <circle cx="46" cy="46" r="1.8" fill="#B45309" />
          {/* Sesame Rice Cracker (Bánh tráng mè) */}
          <polygon points="68,26 84,38 78,52 64,42" fill="#E5E7EB" stroke="#6B7280" strokeWidth="1.5" />
          <circle cx="74" cy="36" r="1" fill="#1F2937" />
          <circle cx="78" cy="44" r="1" fill="#1F2937" />
          <circle cx="70" cy="42" r="1" fill="#1F2937" />
        </svg>
      );

    case 'banh-xeo':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Plate */}
          <ellipse cx="50" cy="54" rx="46" ry="30" fill="#F9FAFB" stroke="#4B5563" strokeWidth="3" />
          {/* Golden Crispy Folded Crepe */}
          <path d="M18 52 C22 28 78 28 82 52 C70 66 30 66 18 52 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
          {/* Crispy Edge Texture */}
          <path d="M22 48 Q50 36 78 48" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
          {/* Prawns poking out */}
          <path d="M60 48 Q70 42 74 48" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
          {/* Sprouts */}
          <line x1="38" y1="52" x2="48" y2="56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="44" y1="50" x2="54" y2="54" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Fresh Herbs Bed */}
          <ellipse cx="26" cy="62" rx="10" ry="6" fill="#22C55E" stroke="#15803D" strokeWidth="1" transform="rotate(-15 26 62)" />
          <ellipse cx="38" cy="66" rx="9" ry="5" fill="#4ADE80" stroke="#16A34A" strokeWidth="1" transform="rotate(10 38 66)" />
          {/* Sweet Chili Dip Bowl */}
          <circle cx="74" cy="64" r="9" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
          <circle cx="74" cy="64" r="6" fill="#F87171" />
        </svg>
      );

    case 'banh-mi':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Golden Baguette */}
          <ellipse cx="50" cy="52" rx="40" ry="18" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" transform="rotate(-8 50 52)" />
          {/* Baguette Score Slashes */}
          <line x1="28" y1="46" x2="38" y2="54" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="43" x2="56" y2="51" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="64" y1="40" x2="74" y2="48" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          {/* Fillings: Cucumber, cilantro, meat, chili */}
          <rect x="22" y="52" width="56" height="5" rx="2" fill="#15803D" transform="rotate(-8 50 54)" />
          <rect x="24" y="56" width="52" height="4" rx="2" fill="#B91C1C" transform="rotate(-8 50 58)" />
          <circle cx="34" cy="55" r="2.5" fill="#EF4444" />
          <circle cx="58" cy="52" r="2.5" fill="#EF4444" />
        </svg>
      );

    case 'bun-cha':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Dipping Sauce Bowl */}
          <ellipse cx="44" cy="50" rx="30" ry="14" fill="#FEF3C7" stroke="#4B5563" strokeWidth="2.5" />
          <path d="M14 50 C14 74 26 78 44 78 C62 78 74 74 74 50 Z" fill="#FFFBEB" stroke="#4B5563" strokeWidth="2.5" />
          <ellipse cx="44" cy="49" rx="25" ry="10" fill="#FDE68A" />
          {/* Charcoal Grilled Patties */}
          <ellipse cx="36" cy="48" rx="8" ry="5" fill="#92400E" />
          <line x1="32" y1="47" x2="40" y2="49" stroke="#451A03" strokeWidth="1.5" />
          <ellipse cx="52" cy="50" rx="7" ry="4.5" fill="#78350F" />
          {/* Pickled Carrots & Papaya */}
          <rect x="36" y="44" width="6" height="2" fill="#EA580C" />
          <rect x="46" y="45" width="5" height="2" fill="#84CC16" />
          {/* Plate of White Vermicelli */}
          <ellipse cx="76" cy="62" rx="18" ry="11" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1.5" />
          <path d="M64 61 Q76 56 86 61" stroke="#E5E7EB" strokeWidth="3" />
        </svg>
      );

    case 'cao-lau':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Bowl */}
          <ellipse cx="50" cy="50" rx="40" ry="16" fill="#F3F4F6" stroke="#4B5563" strokeWidth="3" />
          <path d="M10 50 C10 80 28 86 50 86 C72 86 90 80 90 50 Z" fill="#FFFFFF" stroke="#4B5563" strokeWidth="3" />
          <ellipse cx="50" cy="49" rx="34" ry="11" fill="#D97706" />
          {/* Chewy Thick Noodles */}
          <path d="M24 48 Q40 43 56 48 T76 46" stroke="#FEF08A" strokeWidth="4.5" strokeLinecap="round" />
          {/* Char Siu Pork Slices */}
          <ellipse cx="38" cy="46" rx="8" ry="4.5" fill="#991B1B" />
          <ellipse cx="58" cy="47" rx="8" ry="4.5" fill="#B91C1C" />
          {/* Crispy Fried Dough Squares (Tép mỡ / Bánh ram) */}
          <rect x="46" y="44" width="7" height="6" rx="1" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <rect x="52" y="50" width="6" height="5" rx="1" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          {/* Mint Greens */}
          <circle cx="32" cy="51" r="3" fill="#15803D" />
          <circle cx="68" cy="50" r="3" fill="#22C55E" />
        </svg>
      );

    case 'cha-muc':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Plate */}
          <ellipse cx="50" cy="54" rx="44" ry="28" fill="#FFFFFF" stroke="#4B5563" strokeWidth="3" />
          {/* Golden Fried Squid Patties */}
          <circle cx="38" cy="48" r="12" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <circle cx="38" cy="48" r="8" fill="#F59E0B" opacity="0.6" />
          <circle cx="60" cy="46" r="12" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <circle cx="48" cy="62" r="11" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          {/* Chili Dip */}
          <circle cx="70" cy="65" r="7" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <circle cx="70" cy="65" r="4" fill="#FCA5A5" />
        </svg>
      );

    case 'banh-trang-nuong':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          {/* Round Crispy Grilled Rice Paper */}
          <circle cx="50" cy="50" r="38" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          {/* Egg Spread */}
          <circle cx="50" cy="50" r="30" fill="#FDE047" opacity="0.8" />
          {/* Scallions */}
          <circle cx="40" cy="42" r="2.5" fill="#16A34A" />
          <circle cx="55" cy="38" r="2.5" fill="#22C55E" />
          <circle cx="62" cy="52" r="2.5" fill="#15803D" />
          <circle cx="42" cy="58" r="2.5" fill="#16A34A" />
          {/* Sausage slices */}
          <circle cx="46" cy="48" r="4" fill="#EF4444" />
          <circle cx="58" cy="46" r="4" fill="#DC2626" />
          <circle cx="50" cy="60" r="3.5" fill="#EF4444" />
          {/* Mayonnaise / Chili Drizzle Zigzag */}
          <path d="M26 44 Q50 32 74 46 Q50 68 28 58" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    default: // Generic steaming soup / food pot
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="50" rx="40" ry="16" fill="#F3F4F6" stroke="#4B5563" strokeWidth="3" />
          <path d="M10 50 C10 80 28 86 50 86 C72 86 90 80 90 50 Z" fill="#FFFFFF" stroke="#4B5563" strokeWidth="3" />
          <ellipse cx="50" cy="49" rx="34" ry="11" fill="#FDE68A" />
          <circle cx="42" cy="48" r="4" fill="#EF4444" />
          <circle cx="56" cy="47" r="4" fill="#F97316" />
          <circle cx="50" cy="52" r="3" fill="#16A34A" />
        </svg>
      );
  }
};
