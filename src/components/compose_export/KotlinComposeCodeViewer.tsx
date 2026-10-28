import React, { useState } from 'react';
import { Code2, Copy, Check, X, FileCode, Download, BookOpen } from 'lucide-react';
import { downloadAndroidProjectZip } from '../../utils/androidProjectZip';

interface KotlinComposeCodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KotlinComposeCodeViewer: React.FC<KotlinComposeCodeViewerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'theme' | 'nav' | 'home' | 'search' | 'detail' | 'nearby'>('guide');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await downloadAndroidProjectZip();
      setTimeout(() => setDownloading(false), 2000);
    } catch (err) {
      console.error(err);
      setDownloading(false);
    }
  };

  const files = {
    theme: {
      name: 'Theme.kt',
      code: `package com.example.andaydemo.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val MustardYellow = Color(0xFFFFC54A)
val OnMustardYellow = Color(0xFF2B2000)
val SoftYellowPill = Color(0xFFFFF1CC)
val CleanWhite = Color(0xFFFFFFFF)
val NeutralDark = Color(0xFF111827)
val GrayBorder = Color(0xFFE5E7EB)
val GraySurface = Color(0xFFF9FAFB)

private val LightColorScheme = lightColorScheme(
    primary = MustardYellow,
    onPrimary = OnMustardYellow,
    primaryContainer = SoftYellowPill,
    background = CleanWhite,
    surface = CleanWhite,
    onSurface = NeutralDark,
    surfaceVariant = GraySurface,
    outline = GrayBorder
)

@Composable
fun AnDayTheme(content: @Composable () -> Unit) {
    MaterialTheme(colorScheme = LightColorScheme, content = content)
}`,
    },
    nav: {
      name: 'AnDayNavGraph.kt',
      code: `package com.example.andaydemo.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.example.andaydemo.ui.account.AccountScreen
import com.example.andaydemo.ui.favorites.FavoritesScreen
import com.example.andaydemo.ui.home.HomeScreen
import com.example.andaydemo.ui.search.DishDetailScreen
import com.example.andaydemo.ui.search.NearbyRestaurantsScreen
import com.example.andaydemo.ui.search.SearchScreen

@Composable
fun AnDayNavGraph() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        bottomBar = {
            if (currentRoute in listOf("home", "search", "favorites", "account")) {
                NavigationBar(containerColor = MaterialTheme.colorScheme.surface) {
                    val items = listOf(
                        Triple("home", "Trang chủ", Icons.Default.Home),
                        Triple("search", "Tìm kiếm", Icons.Default.Search),
                        Triple("favorites", "Yêu thích", Icons.Default.Favorite),
                        Triple("account", "Tài khoản", Icons.Default.Person)
                    )
                    items.forEach { (route, label, icon) ->
                        NavigationBarItem(
                            selected = currentRoute == route,
                            onClick = {
                                navController.navigate(route) {
                                    popUpTo(navController.graph.startDestinationId) { saveState = true }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            icon = { Icon(icon, contentDescription = label) },
                            label = { Text(label) },
                            colors = NavigationBarItemDefaults.colors(
                                indicatorColor = MaterialTheme.colorScheme.primary
                            )
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(navController = navController, startDestination = "home", modifier = Modifier.padding(innerPadding)) {
            composable("home") { HomeScreen(navController) }
            composable("search") { SearchScreen(navController) }
            composable(
                route = "dish_detail/{dishId}",
                arguments = listOf(navArgument("dishId") { type = NavType.StringType })
            ) { backStackEntry ->
                val dishId = backStackEntry.arguments?.getString("dishId") ?: "banh-mi"
                DishDetailScreen(dishId, navController)
            }
            composable(
                route = "nearby/{dishId}",
                arguments = listOf(navArgument("dishId") { type = NavType.StringType })
            ) { backStackEntry ->
                val dishId = backStackEntry.arguments?.getString("dishId") ?: "banh-mi"
                NearbyRestaurantsScreen(dishId, navController)
            }
            composable("favorites") { FavoritesScreen(navController) }
            composable("account") { AccountScreen(navController) }
        }
    }
}`,
    },
    detail: {
      name: 'DishDetailScreen.kt',
      code: `package com.example.andaydemo.ui.search

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.andaydemo.data.LocalFoodDataSource
import com.example.andaydemo.ui.theme.SoftYellowPill

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun DishDetailScreen(dishId: String, navController: NavController) {
    val dish = LocalFoodDataSource.DISHES.find { it.id == dishId } ?: LocalFoodDataSource.DISHES.first()
    var isSaved by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        IconButton(onClick = { navController.popBackStack() }) {
            Icon(Icons.Default.ArrowBack, contentDescription = "Quay lại")
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Top Circular Illustration Banner
        Box(
            modifier = Modifier
                .size(160.dp)
                .clip(CircleShape)
                .background(Color(0xFFFFF5DC))
                .align(Alignment.CenterHorizontally),
            contentAlignment = Alignment.Center
        ) {
            Icon(Icons.Default.Restaurant, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(64.dp))
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = dish.vietnameseName,
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )

        Text(
            text = "AI nhận diện: khớp 94% · Không đúng? Chọn món khác",
            style = MaterialTheme.typography.bodySmall,
            color = Color.Gray,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text("Thành phần thường có", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            dish.ingredients.forEach { ingredient ->
                Surface(color = SoftYellowPill, shape = RoundedCornerShape(20.dp)) {
                    Text(ingredient, style = MaterialTheme.typography.labelMedium, modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp))
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))
        Text("Tham khảo theo công thức phổ biến, mỗi quán có thể khác. Nếu bạn dị ứng, hãy hỏi lại quán.", style = MaterialTheme.typography.bodySmall, color = Color.Gray)

        Spacer(modifier = Modifier.height(20.dp))
        Text("Nguồn gốc", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(6.dp))
        Text(dish.originStory, style = MaterialTheme.typography.bodyMedium, color = Color(0xFF374151))

        Spacer(modifier = Modifier.height(32.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(
                onClick = { isSaved = !isSaved },
                shape = RoundedCornerShape(24.dp),
                modifier = Modifier.weight(1f).height(48.dp)
            ) {
                Text(if (isSaved) "Đã lưu" else "Lưu yêu thích")
            }

            Button(
                onClick = { navController.navigate("nearby/\${dish.id}") },
                shape = RoundedCornerShape(24.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                modifier = Modifier.weight(1f).height(48.dp)
            ) {
                Text("Quán gần bạn", color = MaterialTheme.colorScheme.onPrimary)
            }
        }
    }
}`,
    },
    nearby: {
      name: 'NearbyRestaurantsScreen.kt',
      code: `package com.example.andaydemo.ui.search

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Navigation
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.andaydemo.data.LocalFoodDataSource

@Composable
fun NearbyRestaurantsScreen(dishId: String, navController: NavController) {
    val dish = LocalFoodDataSource.DISHES.find { it.id == dishId } ?: LocalFoodDataSource.DISHES.first()
    val context = LocalContext.current
    var sortByRating by remember { mutableStateOf(true) }

    val sortedList = remember(sortByRating) {
        if (sortByRating) dish.restaurants.sortedByDescending { it.rating }
        else dish.restaurants.sortedBy { it.distanceKm }
    }

    Column(modifier = Modifier.fillMaxSize().background(Color.White).padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = { navController.popBackStack() }) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Quay lại")
            }
            Text("Quán bán \${dish.vietnameseName}", style = MaterialTheme.typography.titleMedium)
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Location Box
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF9FAFB)),
            border = BorderStroke(1.dp, Color(0xFFE5E7EB)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(14.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.LocationOn, contentDescription = null, tint = Color.Gray)
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Vị trí: Đang dùng GPS", style = MaterialTheme.typography.bodySmall)
                }
                Text("Đổi", style = MaterialTheme.typography.labelLarge, color = Color(0xFF111827))
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Sort Filter Chips
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(
                selected = sortByRating,
                onClick = { sortByRating = true },
                label = { Text("Đánh giá cao nhất") },
                colors = FilterChipDefaults.filterChipColors(selectedContainerColor = MaterialTheme.colorScheme.primary)
            )
            FilterChip(
                selected = !sortByRating,
                onClick = { sortByRating = false },
                label = { Text("Gần nhất") },
                colors = FilterChipDefaults.filterChipColors(selectedContainerColor = MaterialTheme.colorScheme.primary)
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items(sortedList) { rest ->
                Card(
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = BorderStroke(1.dp, Color(0xFFE5E7EB)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(rest.name, style = MaterialTheme.typography.titleMedium)
                            Surface(shape = RoundedCornerShape(12.dp), color = Color(0xFFF3F4F6)) {
                                Text("\${rest.distanceKm} km", modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp), style = MaterialTheme.typography.labelSmall)
                            }
                        }

                        Spacer(modifier = Modifier.height(4.dp))
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFF59E0B), modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("\${rest.rating} (\${rest.reviewCount} đánh giá)", style = MaterialTheme.typography.bodySmall)
                        }

                        Text(rest.averagePrice, style = MaterialTheme.typography.bodySmall, color = Color.Gray)
                        Text(rest.address, style = MaterialTheme.typography.bodySmall, color = Color.Gray)

                        Spacer(modifier = Modifier.height(12.dp))

                        Button(
                            onClick = {
                                val gmmIntentUri = Uri.parse("geo:0,0?q=\${Uri.encode("\${rest.name}, \${rest.address}")}")
                                val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri).apply {
                                    setPackage("com.google.android.apps.maps")
                                }
                                if (mapIntent.resolveActivity(context.packageManager) != null) {
                                    context.startActivity(mapIntent)
                                } else {
                                    val webIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.google.com/maps/search/?api=1&query=\${Uri.encode("\${rest.name} \${rest.address}")}"))
                                    context.startActivity(webIntent)
                                }
                            },
                            shape = RoundedCornerShape(20.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
                        ) {
                            Icon(Icons.Default.Navigation, contentDescription = null, modifier = Modifier.size(14.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("Chỉ đường", color = MaterialTheme.colorScheme.onPrimary)
                        }
                    }
                }
            }
        }
    }
}`,
    },
    home: {
      name: 'HomeScreen.kt',
      code: `package com.example.andaydemo.ui.home

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Map
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.andaydemo.data.LocalFoodDataSource

@Composable
fun HomeScreen(navController: NavController) {
    var selectedCity by remember { mutableStateOf("Hanoi") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text("Bản Đồ Ẩm Thực Việt Nam", style = MaterialTheme.typography.titleMedium, color = Color(0xFF111827))
        Text("Chạm vào địa danh để xem món đặc sản", style = MaterialTheme.typography.bodySmall, color = Color.Gray)

        Spacer(modifier = Modifier.height(12.dp))

        LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            items(LocalFoodDataSource.MAP_PINS) { pin ->
                FilterChip(
                    selected = selectedCity == pin.city,
                    onClick = { selectedCity = pin.city },
                    label = { Text(pin.label) },
                    colors = FilterChipDefaults.filterChipColors(selectedContainerColor = MaterialTheme.colorScheme.primary)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text("Đặc Sản Địa Phương", style = MaterialTheme.typography.titleSmall, color = Color(0xFF111827))
        Spacer(modifier = Modifier.height(8.dp))

        LocalFoodDataSource.DISHES.forEach { dish ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, Color(0xFFE5E7EB)),
                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
            ) {
                Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(dish.vietnameseName, style = MaterialTheme.typography.titleSmall)
                        Text(dish.description, style = MaterialTheme.typography.bodySmall, maxLines = 2, color = Color.Gray)
                        Spacer(modifier = Modifier.height(4.dp))
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(dish.priceRange, style = MaterialTheme.typography.labelSmall)
                            Text(dish.flavorProfile, style = MaterialTheme.typography.labelSmall, color = Color.Gray)
                        }
                    }
                }
            }
        }
    }
}`,
    },
    search: {
      name: 'SearchScreen.kt',
      code: `package com.example.andaydemo.ui.search

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.andaydemo.data.LocalFoodDataSource

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SearchScreen(navController: NavController) {
    var query by remember { mutableStateOf("") }
    val filteredDishes = LocalFoodDataSource.DISHES.filter {
        it.vietnameseName.contains(query, ignoreCase = true) || it.name.contains(query, ignoreCase = true)
    }

    Column(modifier = Modifier.fillMaxSize().background(Color.White).padding(16.dp)) {
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            placeholder = { Text("Tìm bánh mì, phở bò, cơm tấm...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        Button(
            onClick = { navController.navigate("dish_detail/banh-mi") },
            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Icon(Icons.Default.CameraAlt, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Nhận diện ảnh món ăn (AI Vision)")
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text("Kết quả (\${filteredDishes.size})", style = MaterialTheme.typography.titleSmall)

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
            items(filteredDishes) { dish ->
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = BorderStroke(1.dp, Color(0xFFE5E7EB)),
                    modifier = Modifier.fillMaxWidth().clickable { navController.navigate("dish_detail/\${dish.id}") }
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(dish.vietnameseName, style = MaterialTheme.typography.titleSmall)
                        Text(dish.description, style = MaterialTheme.typography.bodySmall, maxLines = 1, color = Color.Gray)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(dish.priceRange, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary)
                    }
                }
            }
        }
    }
}`,
    },
  };

  const handleCopy = () => {
    if (activeTab === 'guide') {
      const guideText = document.getElementById('guide-content')?.innerText || '';
      navigator.clipboard.writeText(guideText);
    } else {
      navigator.clipboard.writeText(files[activeTab].code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs">
      <div className="w-full max-w-3xl h-[85vh] bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#FFC54A] text-gray-950 font-bold">
              <Code2 size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Dự Án Android Studio (Kotlin / Jetpack Compose)</h3>
              <p className="text-[11px] text-gray-400">Chạy Offline 100% không cần Server</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Zip CTA */}
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFC54A] hover:bg-[#F5BA3F] text-gray-950 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Download size={13} />
              <span>{downloading ? 'Đang nén ZIP...' : 'Tải File ZIP'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 px-3 py-2 bg-gray-950 border-b border-gray-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-[#FFC54A] text-gray-950 font-bold'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen size={13} />
            <span>📖 Hướng dẫn chạy 3 bước</span>
          </button>

          {(Object.keys(files) as Array<keyof typeof files>).map((key) => {
            const isTabActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                  isTabActive
                    ? 'bg-gray-800 text-[#FFC54A] font-bold border border-gray-700'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <FileCode size={12} />
                <span>{files[key].name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 text-xs leading-relaxed text-gray-200 bg-gray-950">
          {activeTab === 'guide' ? (
            <div id="guide-content" className="max-w-2xl mx-auto space-y-4 py-2 font-sans">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-xs text-amber-300">
                  <Check size={14} /> Không cần cài đặt backend server
                </span>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  Ứng dụng đã được tích hợp sẵn bộ dữ liệu ẩm thực, danh sách quán ăn, tọa độ và logic nhận diện chạy hoàn toàn offline trên điện thoại/máy ảo Android của bạn.
                </p>
              </div>

              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                <h4 className="font-bold text-sm text-[#FFC54A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFC54A] text-gray-950 flex items-center justify-center text-xs font-black">1</span>
                  Tải file ZIP về máy tính
                </h4>
                <p className="text-gray-300">
                  Nhấn nút vàng <strong className="text-white">"Tải File ZIP"</strong> ở góc trên bên phải để tải file <code className="text-amber-300">AnDayDemo_AndroidStudio_Project.zip</code> về máy.
                </p>
                <p className="text-gray-400 text-[11px]">
                  Sau khi tải xong, giải nén thư mục (ví dụ giải nén ra <code className="text-gray-300">D:\AnDayDemo</code>).
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                <h4 className="font-bold text-sm text-[#FFC54A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFC54A] text-gray-950 flex items-center justify-center text-xs font-black">2</span>
                  Mở dự án trong Android Studio
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Mở <strong>Android Studio</strong> trên máy của bạn.</li>
                  <li>Chọn <strong>File</strong> ➔ <strong>Open...</strong>.</li>
                  <li>Trỏ đến thư mục <code className="text-amber-300">AnDayDemo</code> vừa giải nén và nhấn <strong>OK</strong>.</li>
                  <li>Chờ 1-2 phút để Android Studio tải Gradle dependencies và đồng bộ (Sync Gradle).</li>
                </ol>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                <h4 className="font-bold text-sm text-[#FFC54A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFC54A] text-gray-950 flex items-center justify-center text-xs font-black">3</span>
                  Bấm Run ▶ để trải nghiệm demo
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Chọn máy ảo <strong>Pixel Emulator</strong> (hoặc cắm cáp USB điện thoại Android).</li>
                  <li>Nhấn nút <strong>Run ▶</strong> (hoặc tổ hợp phím <kbd className="px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700">Shift + F10</kbd>).</li>
                  <li>Ứng dụng sẽ mở lên với đầy đủ tính năng: Bản đồ minh họa, Tìm kiếm từ khóa, Chi tiết món ăn kèm thành phần/nguồn gốc, Quán gần bạn và nút Chỉ đường Google Maps!</li>
                </ul>
              </div>
            </div>
          ) : (
            <pre className="font-mono">{files[activeTab].code}</pre>
          )}
        </div>
      </div>
    </div>
  );
};
