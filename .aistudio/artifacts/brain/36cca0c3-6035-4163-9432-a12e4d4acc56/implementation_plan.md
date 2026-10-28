# AnDayDemo — Vietnamese Food Discovery & Recognition Redesign

A Material 3 redesign of AnDayDemo delivering an authentic, friendly Vietnamese culinary discovery experience with an illustrated regional S-curve food map, AI image and ESP32-CAM food recognition, curated restaurant directories, favorites bookmarking, and account lifecycle management.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The redesign delivers an interactive, tactile Material 3 mobile application with a live Android frame/adaptive viewport, paired with complete Kotlin Jetpack Compose architecture and component code.

- **Brand & Theme Identity**: Retained signature mustard yellow (`#FFC54A`), backed by warm ivory canvases (`#FDFBF7`), deep forest herbs green (`#1B4332`), rich chili red (`#C93B2B`), and warm charcoal text (`#2B2824`).
- **Screen 1 (Discovery Map)**: Custom interactive illustrated Vietnam S-curve map featuring regional badges (Hanoi, Hue, Da Nang, Hoi An, Ho Chi Minh City, Mekong Delta, etc.), cartoon culinary landmarks, and accessible quick-select regional tabs.
- **Screen 2 (Search & AI Inference)**: Dual search modes (instant dish keyword lookup with search history, and AI food vision with camera capture, device gallery upload, and live ESP32-CAM stream connection with connection states and confidence metrics).
- **Screen 3 (Favorites)**: Filterable saved collections (Dishes vs. Restaurants) with quick unsave affordance, detail modals, and friendly empty states.
- **Screen 4 (Account)**: Account profile, authentication status, password change, logout, and confirmation-gated account deletion flow.
- **Kotlin Jetpack Compose Delivery**: Full Kotlin Compose screen references, theme definitions (`Color.kt`, `Theme.kt`, `Type.kt`), and navigation graph documentation provided alongside the working interactive applet.

---

## 1. Overview & Core Concept

- **What It Does**: AnDayDemo connects food lovers and travelers with authentic Vietnamese regional cuisine. Users explore local dishes across Northern, Central, and Southern Vietnam through an illustrated landmark map, identify dishes from photos or live camera/ESP32-CAM feeds using AI vision inference, browse restaurants serving each specialty with ratings and addresses, and bookmark favorites.
- **Target Audience / Persona**: Travelers, street food enthusiasts, and cultural culinary explorers seeking regional Vietnamese dishes, authentic eateries, and instant visual dish identification.
- **Key Value**: Replaces cluttered screens and tiny map pins with an accessible, joyful illustrated food map and an intuitive image recognition workflow.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Regional Food Discovery**:
   - User lands on **Home** (`Screen 1`), greeted by a warm illustrated S-curve map of Vietnam with regional markers (North, Central, South).
   - Tapping an illustrated region (e.g. Hanoi, Hue, Da Nang, Saigon) or selecting an accessible city pill smooth-scrolls and highlights the curated regional specialties (e.g., Phở Bò, Bún Chả, Cơm Tấm, Mì Quảng, Bún Bò Huế).
   - Tapping any dish card transitions into a Dish Detail modal showing origin story, key herbs/ingredients, taste profile, and curated restaurants.
2. **Dual-Mode Food Search & Recognition**:
   - User navigates to **Search** (`Screen 2`), with clear segmented tabs: **Keyword Search** and **Visual Recognition**.
   - *Keyword Search*: Auto-suggest dish search with recent search tags and direct culinary category chips (Noodles, Rice, Soups, Rolls, Desserts).
   - *Visual Recognition*: Direct photo capture, gallery picker, or live ESP32-CAM stream connect. Once submitted, displays real-time inference loading, predicted dish name, confidence score (e.g., 96.4%), and verified dataset image with restaurant recommendations.
3. **Favorites Management**:
   - User taps **Favorites** (`Screen 3`), toggling between **Dishes (Món Ăn)** and **Restaurants (Quán Ăn)**.
   - Immediate swipe or one-tap bookmark toggle with undo snackbar and empty state graphics.
4. **Account & Settings**:
   - User visits **Account** (`Screen 4`), reviewing profile stats, managing credentials, logging in/out, or initiating a two-step confirmation dialog for account deletion.

### Visual Identity & Theme Tokens
- **Canvas Neutral**: Warm Ivory `#FDFBF7` (light), Warm Charcoal `#1E1B18` (dark mode)
- **Primary Accent**: Signature Mustard Yellow `#FFC54A` (with accessible dark amber `#D99B1C` for high-contrast text and icons)
- **Secondary Herb Green**: Deep Forest Green `#1B4332` (evoking fresh mint, coriander, and banana leaf wrapping)
- **Accent Heritage Red**: Lacquer Red `#C93B2B` (for highlights and heart/favorite icons)
- **Surface Elevation**: Single-elevation `rounded-2xl` and `rounded-3xl` cards adhering to Material 3 elevation guidelines (`elevation-1` to `elevation-2` with soft ambient shadows).
- **Typography**: Neo-Grotesque display header (`Plus Jakarta Sans`) paired with warm, legible body prose.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Illustrated Map Representation**
  - *Chosen Approach*: Lightweight, responsive SVG illustrated S-curve with playful landmarks (One Pillar Pagoda, Hue Citadel, Dragon Bridge, Ben Thanh Market) and synchronized accessible horizontal chip selector.
  - *Why*: Eliminates expensive, heavy external map APIs, avoids clutter, and works reliably offline while delivering the requested storybook Vietnamese travel identity.
- **Decision 2: ESP32-CAM Live Feed & AI Inference Integration**
  - *Chosen Approach*: Multi-input vision pipeline supporting device camera snapshot, file upload, and configurable ESP32-CAM stream endpoint (MJPEG/snapshot polling with live status indicator and test feed simulation).
  - *Why*: Guarantees users can test visual recognition immediately even without physical hardware, while supporting actual ESP32-CAM camera hardware IP streams.
- **Decision 3: Dual Delivery (Interactive Material 3 + Kotlin Jetpack Compose Artifacts)**
  - *Chosen Approach*: Build the fully functioning interactive application with full Jetpack Compose Material 3 UI behavior, while providing the clean native Kotlin Jetpack Compose source files (`AnDayNavGraph.kt`, `HomeScreen.kt`, `SearchScreen.kt`, `FavoritesScreen.kt`, `AccountScreen.kt`, `Theme.kt`).
  - *Why*: Allows immediate visual evaluation and interaction in AI Studio while preserving 100% fidelity to the native Android Compose codebase.

---

## 4. Technical Architecture & Data Strategy

### System Architecture & Navigation Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AnDayDemo Main Container                        │
│   (Material 3 Scaffold, Top App Bar, SnackBar Host, Bottom Nav Bar)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│    Screen 1: Home   │  │   Screen 2: Search  │  │ Screen 3: Favorites │
│ ─────────────────── │  │ ─────────────────── │  │ ─────────────────── │
│ • Illustrated Map   │  │ • Keyword Search    │  │ • Saved Dishes      │
│ • Landmark Badges   │  │ • Recent Queries    │  │ • Saved Restaurants │
│ • Region Quick-Bar  │  │ • Vision Camera/Pic │  │ • Segmented Filter  │
│ • Local Specialties │  │ • ESP32-CAM Stream  │  │ • Quick Unsave/Undo │
│ • Dish Detail Sheet │  │ • AI Inference Card │  │ • Empty States      │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Screen 4: Account  │
                         │ ─────────────────── │
                         │ • User Profile Info │
                         │ • Auth State Switch │
                         │ • Password Change   │
                         │ • Account Deletion  │
                         └─────────────────────┘
```

### Key Data Entities
- `Dish`: `id`, `name`, `vietnameseName`, `region` (`North` | `Central` | `South`), `city`, `description`, `imageUrl`, `tags`, `priceRange`, `bestTime`, `spiciness` (1-5), `restaurants` (array of `RestaurantSummary`).
- `Restaurant`: `id`, `name`, `city`, `address`, `rating`, `reviewCount`, `specialtyDishIds`, `openHours`, `imageUrl`.
- `RecognitionResult`: `predictedDishId`, `predictedDishName`, `confidence`, `detectedAt`, `datasetImageUrl`.
- `UserProfile`: `id`, `name`, `email`, `avatarUrl`, `savedDishIds`, `savedRestaurantIds`, `searchHistory`.

---

## 5. Planned File Changes

1. **`src/types/index.ts`**: Comprehensive domain interfaces for dishes, restaurants, regions, recognition results, and user authentication.
2. **`src/data/vietnameseFoodDataset.ts`**: Curated regional Vietnamese culinary dataset (Hanoi, Hue, Da Nang, Hoi An, Ho Chi Minh City, Can Tho) with authentic descriptions, photos, and restaurants.
3. **`src/theme/materialTheme.ts`**: Material 3 color roles, typography scale, and shape tokens matching the mustard yellow `#FFC54A` identity.
4. **`src/components/navigation/BottomNavBar.tsx`**: Material 3 NavigationBar with 4 destinations: Home, Search, Favorites, Account.
5. **`src/components/home/VietnamIllustratedMap.tsx`**: Interactive SVG S-curve discovery map with animated landmark pins and accessible region switchers.
6. **`src/components/home/DishDetailModal.tsx`**: Bottom sheet / dialog showcasing dish heritage, restaurants serving the dish, and bookmarking.
7. **`src/components/search/SearchScreen.tsx`**: Search with keyword history, camera snapshot, gallery picker, and ESP32-CAM stream panel with live inference.
8. **`src/components/favorites/FavoritesScreen.tsx`**: Filterable favorites tab for Dishes and Restaurants with empty states and unsave actions.
9. **`src/components/account/AccountScreen.tsx`**: User settings, password update modal, and two-step confirmation dialog for account deletion.
10. **`src/components/compose_export/KotlinComposeCodeViewer.tsx`**: In-app inspection drawer to view and copy the corresponding Jetpack Compose Kotlin code.
11. **`src/App.tsx`**: Root application shell orchestrating navigation, persistent state, snackbars, and theme wrapping.
12. **`index.html` & `metadata.json`**: Updated branding and titles for AnDayDemo.
