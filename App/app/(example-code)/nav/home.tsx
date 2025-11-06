import React, { useState } from 'react';
// Import các thành phần cốt lõi của React Native
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// --- Định nghĩa kiểu dữ liệu (Types) ---
interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

// --- Dữ liệu giả (Mock Data) ---

const CATEGORIES: Category[] = [
  { id: '1', name: 'Thời trang', icon: '👕' },
  { id: '2', name: 'Điện tử', icon: '📱' },
  { id: '3', name: 'Đồ gia dụng', icon: '🏠' },
  { id: '4', name: 'Sách', icon: '📚' },
  { id: '5', name: 'Thể thao', icon: '⚽' },
  { id: '6', name: 'Sức khỏe', icon: '❤️' },
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Áo phông nam Cotton',
    price: '350.000đ',
    image: 'https://placehold.co/300x300/EBF4FF/333?text=Ao+Phong',
  },
  {
    id: '2',
    name: 'Tai nghe Bluetooth 5.0',
    price: '790.000đ',
    image: 'https://placehold.co/300x300/FFF6E5/333?text=Tai+Nghe',
  },
  {
    id: '3',
    name: 'Nồi chiên không dầu 5L',
    price: '1.850.000đ',
    image: 'https://placehold.co/300x300/E5FFF0/333?text=Noi+Chien',
  },
  {
    id: '4',
    name: 'Sách "Nhà Giả Kim"',
    price: '120.000đ',
    image: 'https://placehold.co/300x300/FFF0F0/333?text=Sach',
  },
  {
    id: '5',
    name: 'Giày chạy bộ',
    price: '1.200.000đ',
    image: 'https://placehold.co/300x300/F0F5FF/333?text=Giay',
  },
  {
    id: '6',
    name: 'Đồng hồ thông minh',
    price: '2.500.000đ',
    image: 'https://placehold.co/300x300/EBEBEB/333?text=Dong+Ho',
  },
];

// --- Các thành phần con (Đã chuyển đổi sang React Native) ---

/**
 * Hiển thị header của ứng dụng
 */
const Header = () => (
  // <header> -> <View>
  <View className="flex-row items-center justify-between p-4 bg-white shadow-sm">
    <View>
      {/* <p> -> <Text> */}
      <Text className="text-sm text-gray-500">Chào mừng trở lại!</Text>
      {/* <h1> -> <Text> */}
      <Text className="text-xl font-bold text-gray-800">ShopOnline</Text>
    </View>
    {/* <button> -> <TouchableOpacity> */}
    <TouchableOpacity className="relative">
      {/* <span> -> <Text> */}
      <Text className="text-3xl">🛒</Text>
      <View className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
        {/* <span> -> <Text> */}
        <Text className="text-white text-xs font-bold">3</Text>
      </View>
    </TouchableOpacity>
  </View>
);

/**
 * Hiển thị thanh tìm kiếm
 */
const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    // <div> -> <View>
    <View className="p-4 bg-white">
      <View className="flex-row items-center bg-gray-100 rounded-lg p-3">
        {/* <span> -> <Text> */}
        <Text className="mr-2 text-xl">🔍</Text>
        {/* <input> -> <TextInput> */}
        <TextInput
          className="flex-1 text-base bg-transparent"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChangeText={setSearch} // Sử dụng onChangeText cho React Native
        />
      </View>
    </View>
  );
};

/**
 * Hiển thị một mục danh mục
 */
const CategoryItem = ({ item }: { item: Category }) => (
  // <button> -> <TouchableOpacity>
  <TouchableOpacity className="flex-col items-center mr-4 w-20">
    {/* <div> -> <View> */}
    <View className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
      {/* <span> -> <Text> */}
      <Text className="text-3xl">{item.icon}</Text>
    </View>
    {/* <span> -> <Text> */}
    <Text className="mt-2 text-xs text-center text-gray-700">{item.name}</Text>
  </TouchableOpacity>
);

/**
 * Hiển thị banner quảng cáo
 */
const Banner = () => (
  // <div> -> <View>
  <View className="px-4 py-2">
    {/* <img> -> <Image> */}
    <Image
      source={{ uri: "https://placehold.co/600x250/3498DB/FFF?text=Giam+Gia+50%25" }}
      alt="Quảng cáo giảm giá"
      className="w-full h-40 rounded-lg"
      resizeMode="cover" // Tương đương object-cover
    />
  </View>
);

/**
 * Hiển thị một sản phẩm trong lưới
 */
const ProductItem = ({ item }: { item: Product }) => (
  // <button> -> <TouchableOpacity>
  // Chú ý: w-[48%] có thể cần nativewind v4 hoặc cấu hình đặc biệt
  // Sử dụng flex-basis để an toàn hơn
  <TouchableOpacity
    className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
    style={{ flexBasis: '48%' }} // Tương đương w-[48%] và an toàn hơn
  >
    {/* <img> -> <Image> */}
    <Image
      source={{ uri: item.image }}
      alt={item.name}
      className="w-full h-40"
      resizeMode="cover"
    />
    {/* <div> -> <View> */}
    <View className="p-3">
      {/* <p> -> <Text> */}
      <Text className="text-sm font-semibold text-gray-800 h-10">{item.name}</Text>
      <Text className="text-base font-bold text-blue-600 mt-1">{item.price}</Text>
    </View>
  </TouchableOpacity>
);

// --- Thành phần chính: App ---

export default function App() {
  return (
    // <div> -> <SafeAreaView> (Tốt hơn cho RN)
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header />

      {/* <main> -> <ScrollView> (Để cuộn được nội dung) */}
      <ScrollView className="flex-1">
        <SearchBar />

        {/* <section> -> <View> */}
        <View className="py-3">
          {/* <h2> -> <Text> */}
          <Text className="text-lg font-bold text-gray-800 px-4 mb-3">Danh mục</Text>
          {/* <div> -> <ScrollView horizontal> (Để cuộn ngang) */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 4 }}
          >
            {CATEGORIES.map((item: Category) => (
              <CategoryItem item={item} key={item.id} />
            ))}
          </ScrollView>
        </View>

        <Banner />

        {/* <section> -> <View> */}
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">Nổi bật</Text>
          {/* <div> -> <View> (Dùng để bọc lưới) */}
          <View className="flex-row flex-wrap justify-between">
            {PRODUCTS.map((item: Product) => (
              <ProductItem item={item} key={item.id} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}