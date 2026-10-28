import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function downloadAndroidProjectZip() {
  const zip = new JSZip();

  // Root project files
  zip.file(
    'build.gradle.kts',
    `plugins {
    id("com.android.application") version "8.5.0" apply false
    id("org.jetbrains.kotlin.android") version "2.0.0" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.0" apply false
}
`
  );

  zip.file(
    'settings.gradle.kts',
    `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "AnDayDemo"
include(":app")
`
  );

  zip.file(
    'gradle.properties',
    `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true
kotlin.code.style=official
`
  );

  // app/build.gradle.kts
  zip.file(
    'app/build.gradle.kts',
    `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.example.andaydemo"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.andaydemo"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.3")
    implementation("androidx.activity:activity-compose:1.9.0")
    implementation(platform("androidx.compose:compose-bom:2024.06.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.7.7")
    implementation("io.coil-kt:coil-compose:2.6.0")
}
`
  );

  // app/src/main/AndroidManifest.xml
  zip.file(
    'app/src/main/AndroidManifest.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@android:drawable/sym_def_app_icon"
        android:label="ĂnĐầy"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.Material.Light.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@android:style/Theme.Material.Light.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`
  );

  // MainActivity.kt
  zip.file(
    'app/src/main/java/com/example/andaydemo/MainActivity.kt',
    `package com.example.andaydemo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.example.andaydemo.navigation.AnDayNavGraph
import com.example.andaydemo.ui.theme.AnDayTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AnDayTheme {
                AnDayNavGraph()
            }
        }
    }
}
`
  );

  // Models
  zip.file(
    'app/src/main/java/com/example/andaydemo/model/FoodModels.kt',
    `package com.example.andaydemo.model

data class Restaurant(
    val id: String,
    val name: String,
    val address: String,
    val city: String,
    val rating: Double,
    val reviewCount: Int,
    val averagePrice: String,
    val distanceKm: Double,
    val openHours: String,
    val phone: String
)

data class Dish(
    val id: String,
    val name: String,
    val vietnameseName: String,
    val city: String,
    val description: String,
    val originStory: String,
    val ingredients: List<String>,
    val flavorProfile: String,
    val priceRange: String,
    val restaurants: List<Restaurant>
)

data class MapLocationPin(
    val city: String,
    val label: String,
    val xPercent: Float,
    val yPercent: Float
)
`
  );

  // Offline Data Source
  zip.file(
    'app/src/main/java/com/example/andaydemo/data/LocalFoodDataSource.kt',
    `package com.example.andaydemo.data

import com.example.andaydemo.model.Dish
import com.example.andaydemo.model.MapLocationPin
import com.example.andaydemo.model.Restaurant

object LocalFoodDataSource {
    val MAP_PINS = listOf(
        MapLocationPin("Sapa", "Sa Pa", 0.35f, 0.17f),
        MapLocationPin("Hanoi", "Hà Nội", 0.51f, 0.23f),
        MapLocationPin("Halong Bay", "Hạ Long", 0.62f, 0.29f),
        MapLocationPin("Hue", "Huế", 0.59f, 0.46f),
        MapLocationPin("Da Nang", "Đà Nẵng", 0.65f, 0.50f),
        MapLocationPin("Hoi An", "Hội An", 0.69f, 0.57f),
        MapLocationPin("Nha Trang", "Nha Trang", 0.73f, 0.71f),
        MapLocationPin("Dalat", "Đà Lạt", 0.68f, 0.76f),
        MapLocationPin("Ho Chi Minh City", "TP. Hồ Chí Minh", 0.55f, 0.83f),
        MapLocationPin("Mekong Delta", "Miền Tây", 0.47f, 0.89f)
    )

    val DISHES = listOf(
        Dish(
            id = "banh-mi",
            name = "Vietnamese Baguette",
            vietnameseName = "Bánh mì",
            city = "Ho Chi Minh City",
            description = "Vỏ bánh giòn xốp bên trong đầy đặn pa-tê béo ngậy, bơ trứng vàng ươm, thịt nguội thơm ngon, dưa leo tươi mát và đồ chua giòn ngọt.",
            originStory = "Hình thành từ bánh mì Pháp du nhập vào Việt Nam, được người Việt biến tấu thành món ăn đường phố quen thuộc và vang danh thế giới.",
            ingredients = listOf("Bánh mì", "Thịt nguội", "Pa-tê", "Dưa leo", "Đồ chua", "Ngò rí", "Ớt"),
            flavorProfile = "Giòn rụm vỏ, béo ngậy pa-tê, chua ngọt thanh mát",
            priceRange = "25.000₫ - 45.000₫",
            restaurants = listOf(
                Restaurant("rest-1", "Bánh Mì Huỳnh Hoa", "26 Lê Thị Riêng, P. Bến Thành, Quận 1, TP.HCM", "Ho Chi Minh City", 4.8, 3820, "Giá trung bình 58.000đ", 0.8, "11:00 - 21:00", "028 3925 0885"),
                Restaurant("rest-2", "Bánh Mì Bảy Hổ", "19 Huỳnh Khương Ninh, Đa Kao, Quận 1, TP.HCM", "Ho Chi Minh City", 4.7, 1420, "Giá trung bình 28.000đ", 1.4, "13:00 - 19:00", "090 912 3456"),
                Restaurant("rest-3", "Bánh Mì Như Lan", "50 Hàm Nghi, Bến Nghé, Quận 1, TP.HCM", "Ho Chi Minh City", 4.6, 2950, "Giá trung bình 35.000đ", 1.9, "05:00 - 23:00", "028 3829 2970")
            )
        ),
        Dish(
            id = "pho-bo",
            name = "Hanoi Beef Pho",
            vietnameseName = "Phở bò",
            city = "Hanoi",
            description = "Nước dùng trong vắt ninh từ xương ống bò cùng gừng nướng, hoa hồi thảo quả, bánh phở mềm mướt và thịt bò tươi ngon.",
            originStory = "Khởi nguồn từ đầu thế kỷ 20 tại Hà Nội và Nam Định, phở trở thành biểu tượng tinh hoa ẩm thực quốc gia Việt Nam.",
            ingredients = listOf("Bánh phở", "Thịt bò", "Hồi quế", "Gừng nướng", "Hành hoa", "Chanh tươi", "Ớt"),
            flavorProfile = "Thanh ngọt tự nhiên từ xương, thơm nồng quế hồi",
            priceRange = "45.000₫ - 75.000₫",
            restaurants = listOf(
                Restaurant("rest-4", "Phở Thìn Lò Đúc", "13 Lò Đúc, Hai Bà Trưng, Hà Nội", "Hanoi", 4.8, 3420, "Giá trung bình 65.000đ", 0.9, "06:00 - 21:00", "024 3821 2709"),
                Restaurant("rest-5", "Phở Gia Truyền Bát Đàn", "49 Bát Đàn, Hoàn Kiếm, Hà Nội", "Hanoi", 4.7, 4210, "Giá trung bình 55.000đ", 1.2, "06:00 - 20:30", "024 3828 0122")
            )
        ),
        Dish(
            id = "bun-bo-hue",
            name = "Hue Spicy Beef Noodle Soup",
            vietnameseName = "Bún bò Huế",
            city = "Hue",
            description = "Bát bún màu đỏ cam đặc trưng với vị thơm nồng của sả tươi, ruốc Huế đậm đà, thịt bò bắp mềm và sợi bún to tròn.",
            originStory = "Xuất thân từ chốn cung đình triều Nguyễn, bún bò Huế mang phong cách ẩm thực cung đình cầu kỳ, đậm đà và cay nồng.",
            ingredients = listOf("Sợi bún to", "Bắp bò", "Mắm ruốc Huế", "Sả tươi", "Chả cua", "Hoa chuối", "Ớt bột"),
            flavorProfile = "Cay nồng, thơm sả, mặn mà mắm ruốc",
            priceRange = "45.000₫ - 65.000₫",
            restaurants = listOf(
                Restaurant("rest-6", "Bún Bò Huế O Cương Điệp", "6 Trần Thúc Nhẫn, TP. Huế", "Hue", 4.9, 2150, "Giá trung bình 45.000đ", 0.6, "06:30 - 20:30", "090 512 8841")
            )
        ),
        Dish(
            id = "com-tam",
            name = "Saigon Broken Rice",
            vietnameseName = "Cơm tấm",
            city = "Ho Chi Minh City",
            description = "Hạt gạo tấm dẻo thơm ăn cùng miếng sườn cốt lết ướp mật ong nướng xém cạnh, chả trứng hấp, bì heo giòn và mỡ hành bóng bẩy.",
            originStory = "Bữa ăn truyền thống nức tiếng của người Sài Gòn mang hương vị đậm đà, giản dị mà tinh tế.",
            ingredients = listOf("Gạo tấm", "Sườn nướng", "Chả trứng", "Bì heo", "Mỡ hành", "Nước mắm ngọt"),
            flavorProfile = "Ngọt thơm mỡ hành, đậm đà sườn nướng",
            priceRange = "45.000₫ - 75.000₫",
            restaurants = listOf(
                Restaurant("rest-7", "Cơm Tấm Ba Ghiền", "84 Đặng Văn Ngữ, Phú Nhuận, TP.HCM", "Ho Chi Minh City", 4.8, 5210, "Giá trung bình 75.000đ", 1.1, "07:00 - 21:00", "028 3846 1073")
            )
        )
    )
}
`
  );

  // Theme
  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/theme/Color.kt',
    `package com.example.andaydemo.ui.theme

import androidx.compose.ui.graphics.Color

val MustardYellow = Color(0xFFFFC54A)
val OnMustardYellow = Color(0xFF2B2000)
val SoftYellowPill = Color(0xFFFFF1CC)
val CleanWhite = Color(0xFFFFFFFF)
val NeutralDark = Color(0xFF111827)
val GrayBorder = Color(0xFFE5E7EB)
val GraySurface = Color(0xFFF9FAFB)
`
  );

  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/theme/Theme.kt',
    `package com.example.andaydemo.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

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
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}
`
  );

  // Navigation Graph
  zip.file(
    'app/src/main/java/com/example/andaydemo/navigation/AnDayNavGraph.kt',
    `package com.example.andaydemo.navigation

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
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(innerPadding)
        ) {
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
}
`
  );

  // HomeScreen.kt
  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/home/HomeScreen.kt',
    `package com.example.andaydemo.ui.home

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Map
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
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
        Text(
            text = "Bản Đồ Ẩm Thực Việt Nam",
            style = MaterialTheme.typography.titleMedium,
            color = Color(0xFF111827)
        )
        Text(
            text = "Chạm vào địa danh để xem món đặc sản",
            style = MaterialTheme.typography.bodySmall,
            color = Color.Gray
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Accessible Location Chips
        LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            items(LocalFoodDataSource.MAP_PINS) { pin ->
                FilterChip(
                    selected = selectedCity == pin.city,
                    onClick = { selectedCity = pin.city },
                    label = { Text(pin.label) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = MaterialTheme.colorScheme.primary
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Illustrated Map Card
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            border = BorderStroke(1.dp, Color(0xFFE5E7EB)),
            modifier = Modifier.fillMaxWidth().height(320.dp)
        ) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(Icons.Default.Map, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(48.dp))
                    Text("Bản đồ minh họa ẩm thực", style = MaterialTheme.typography.bodyMedium)
                    Text("Đang chọn: $selectedCity", style = MaterialTheme.typography.labelMedium, color = Color.Gray)
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Đặc Sản Địa Phương",
            style = MaterialTheme.typography.titleSmall,
            color = Color(0xFF111827)
        )

        Spacer(modifier = Modifier.height(8.dp))

        LocalFoodDataSource.DISHES.forEach { dish ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, Color(0xFFE5E7EB)),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
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
}
`
  );

  // SearchScreen.kt
  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/search/SearchScreen.kt',
    `package com.example.andaydemo.ui.search

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

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(16.dp)
    ) {
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            placeholder = { Text("Tìm bánh mì, phở bò, cơm tấm...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        // AI Vision Snapshot Button
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
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { navController.navigate("dish_detail/\${dish.id}") }
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
}
`
  );

  // DishDetailScreen.kt (matching image_d6039261 & image_df09a82e)
  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/search/DishDetailScreen.kt',
    `package com.example.andaydemo.ui.search

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

        // Thành phần thường có
        Text(
            text = "Thành phần thường có",
            style = MaterialTheme.typography.titleMedium
        )

        Spacer(modifier = Modifier.height(8.dp))

        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            dish.ingredients.forEach { ingredient ->
                Surface(
                    color = SoftYellowPill,
                    shape = RoundedCornerShape(20.dp)
                ) {
                    Text(
                        text = ingredient,
                        style = MaterialTheme.typography.labelMedium,
                        modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Tham khảo theo công thức phổ biến, mỗi quán có thể khác. Nếu bạn dị ứng, hãy hỏi lại quán.",
            style = MaterialTheme.typography.bodySmall,
            color = Color.Gray
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Nguồn gốc
        Text(
            text = "Nguồn gốc",
            style = MaterialTheme.typography.titleMedium
        )

        Spacer(modifier = Modifier.height(6.dp))

        Text(
            text = dish.originStory,
            style = MaterialTheme.typography.bodyMedium,
            color = Color(0xFF374151)
        )

        Spacer(modifier = Modifier.height(32.dp))

        // Bottom Actions: Lưu yêu thích & Quán gần bạn
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
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
}
`
  );

  // NearbyRestaurantsScreen.kt (matching image_89a22abb)
  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/search/NearbyRestaurantsScreen.kt',
    `package com.example.andaydemo.ui.search

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

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(16.dp)
    ) {
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
                            Surface(
                                shape = RoundedCornerShape(12.dp),
                                color = Color(0xFFF3F4F6)
                            ) {
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

                        // Button Chỉ đường Google Maps
                        Button(
                            onClick = {
                                val gmmIntentUri = Uri.parse("geo:0,0?q=\${Uri.encode("\${rest.name}, \${rest.address}")}")
                                val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
                                mapIntent.setPackage("com.google.android.apps.maps")
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
}
`
  );

  // FavoritesScreen.kt
  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/favorites/FavoritesScreen.kt',
    `package com.example.andaydemo.ui.favorites

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.andaydemo.data.LocalFoodDataSource

@Composable
fun FavoritesScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(16.dp)
    ) {
        Text("Món Ăn Yêu Thích", style = MaterialTheme.typography.titleMedium)

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(LocalFoodDataSource.DISHES.take(2)) { dish ->
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(dish.vietnameseName, style = MaterialTheme.typography.titleSmall)
                        Text(dish.priceRange, style = MaterialTheme.typography.bodySmall, color = Color.Gray)
                    }
                }
            }
        }
    }
}
`
  );

  // AccountScreen.kt
  zip.file(
    'app/src/main/java/com/example/andaydemo/ui/account/AccountScreen.kt',
    `package com.example.andaydemo.ui.account

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun AccountScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(16.dp)
    ) {
        Text("Tài Khoản AnDay", style = MaterialTheme.typography.titleLarge)
        Spacer(modifier = Modifier.height(16.dp))
        Card(
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Người dùng: Nguyễn Minh Quân", style = MaterialTheme.typography.titleSmall)
                Text("Email: minhquan.foodie@gmail.com", style = MaterialTheme.typography.bodySmall, color = Color.Gray)
            }
        }
    }
}
`
  );

  // README with instructions in Vietnamese
  zip.file(
    'HUONG_DAN_CHAY_ANDROID_STUDIO.md',
    `# HƯỚNG DẪN MỞ & CHẠY DỰ ÁN TRÊN ANDROID STUDIO (KHÔNG CẦN SERVER)

Dự án này sử dụng 100% dữ liệu offline (LocalFoodDataSource), tích hợp Jetpack Compose và Material 3. Bạn có thể chạy ngay trên máy ảo (Emulator) hoặc điện thoại Android thật mà KHÔNG CẦN bất kỳ backend server nào.

---

## BƯỚC 1: GIẢI NÉN MÃ NGUỒN
1. Giải nén file zip này vào một thư mục trên máy tính của bạn (Ví dụ: \`C:\\Users\\Admin\\AndroidStudioProjects\\AnDayDemo\`).

---

## BƯỚC 2: MỞ BẰNG ANDROID STUDIO
1. Mở **Android Studio**.
2. Chọn **File -> Open...** (hoặc chọn **Open** ở màn hình chào mừng).
3. Trỏ tới thư mục \`AnDayDemo\` vừa giải nén và nhấn **OK**.
4. Chờ Android Studio đồng bộ Gradle (**Sync Project with Gradle Files**).
   *(Lần đầu mở sẽ mất 1 - 3 phút để tải thư viện Compose).*

---

## BƯỚC 3: CHẠY DEMO (RUN APP)
1. Chọn thiết bị chạy:
   - **Máy ảo (Android Virtual Device / Emulator)**: Pixel 7 hoặc Pixel 8 (Android 12 trở lên).
   - Hoặc cắm **Điện thoại Android thật** qua cáp USB (đã bật chế độ *USB Debugging* trong Tùy chọn nhà phát triển).
2. Nhấn nút **Run** (biểu tượng tam giác màu xanh lá ▶ trên thanh công cụ hoặc phím tắt \`Shift + F10\`).
3. Ứng dụng sẽ tự động build, cài đặt APK và mở giao diện lên thiết bị!

---

## TÍNH NĂNG CHẠY OFFLINE:
1. **Trang chủ**: Bản đồ minh họa ẩm thực Việt Nam với 10 địa danh và danh sách món ăn đặc sản vùng miền.
2. **Tìm kiếm từ khóa & AI Vision**:
   - Gõ tên món ăn (Bánh mì, Phở bò, Cơm tấm...).
   - Nhấn vào món ăn để mở trang **Chi tiết món** (thành phần thường có, nguồn gốc).
   - Nhấn **Quán gần bạn**: Xem danh sách các quán ăn ngon được đánh giá cao, sắp xếp theo Đánh giá hoặc Khoảng cách.
   - Nhấn **Chỉ đường**: Tự động mở Google Maps dẫn đường trực tiếp tới quán ăn!
3. **Mục yêu thích & Tài khoản**: Đầy đủ giao diện xem món lưu và thông tin cá nhân.
`
  );

  // Generate ZIP and trigger browser download
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'AnDayDemo_AndroidStudio_Project.zip');
}
