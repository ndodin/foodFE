/**
 * AnDayDemo Material 3 Color Tokens
 * Primary: Mustard Yellow #FFC54A
 * Clean white normal background, dark neutral text, no green supporting color.
 */

export const M3_THEME = {
  colors: {
    primary: '#FFC54A',            // Signature Mustard Yellow
    onPrimary: '#2B2000',          // Deep contrast text on yellow
    primaryContainer: '#FFF1CC',   // Soft light yellow
    onPrimaryContainer: '#241A00',
    
    // Clean neutral dark replaces green
    secondary: '#1E293B',          // Slate 800
    onSecondary: '#FFFFFF',
    secondaryContainer: '#F1F5F9',
    onSecondaryContainer: '#0F172A',

    tertiary: '#EF4444',           // Red for favorites/likes
    onTertiary: '#FFFFFF',

    background: '#FFFFFF',         // Clean Normal White
    onBackground: '#111827',
    surface: '#FFFFFF',
    onSurface: '#111827',
    surfaceVariant: '#F3F4F6',     // Gray 100
    onSurfaceVariant: '#4B5563',
    outline: '#E5E7EB',            // Gray 200
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  shapes: {
    cornerSmall: '8px',
    cornerMedium: '12px',
    cornerLarge: '16px',
    cornerExtraLarge: '24px',
    cornerFull: '9999px',
  }
};
