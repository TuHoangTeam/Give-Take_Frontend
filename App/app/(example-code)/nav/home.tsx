import { Stack } from 'expo-router'; // <-- Import thêm cái này
import React, { useState } from 'react';
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
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Tai nghe Bluetooth 5.0',
    price: '790.000đ',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Nồi chiên không dầu 5L',
    price: '1.850.000đ',
    image: 'https://images.unsplash.com/photo-1585128993285-b82522778848?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    name: 'Sách "Nhà Giả Kim"',
    price: '120.000đ',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '5',
    name: 'Giày chạy bộ',
    price: '1.200.000đ',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '6',
    name: 'Đồng hồ thông minh',
    price: '2.500.000đ',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
  },
];

// --- Các thành phần con ---

const Header = () => (
  <View className="flex-row items-center justify-between p-4 bg-white shadow-sm">
    <View className="flex-row items-center">
      <Image
        source={require('../../../assets/icon/logo.png')}
        style={{ width: 40, height: 40, marginRight: 8 }}
        resizeMode="contain"
      />
      <View>
        <Text className="text-sm text-gray-500">Chào mừng trở lại!</Text>
        <Text className="text-xl font-bold text-gray-800">Give & Take</Text>
      </View>
    </View>
    <TouchableOpacity className="relative">
      <Text className="text-3xl">🛒</Text>
      <View className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
        <Text className="text-white text-xs font-bold">3</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <View className="p-4 bg-white">
      <View className="flex-row items-center bg-gray-100 rounded-lg p-3">
        <Text className="mr-2 text-xl">🔍</Text>
        <TextInput
          className="flex-1 text-base bg-transparent"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
    </View>
  );
};

const CategoryItem = ({ item }: { item: Category }) => (
  <TouchableOpacity className="flex-col items-center mr-4 w-20">
    <View className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
      <Text className="text-3xl">{item.icon}</Text>
    </View>
    <Text className="mt-2 text-xs text-center text-gray-700">{item.name}</Text>
  </TouchableOpacity>
);

const Banner = () => (
  <View className="px-4 py-2">
    <Image
      source={{ uri: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60" }}
      className="w-full h-40 rounded-lg"
      style={{ height: 160 }}
      resizeMode="cover"
    />
  </View>
);

const ProductItem = ({ item }: { item: Product }) => (
  <TouchableOpacity
    className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
    style={{ flexBasis: '48%' }}
  >
    <Image
      source={{ uri: item.image }}
      className="w-full h-40"
      style={{ height: 160, width: '100%' }}
      resizeMode="cover"
    />
    <View className="p-3">
      <Text className="text-sm font-semibold text-gray-800 h-10" numberOfLines={2}>
        {item.name}
      </Text>
      <Text className="text-base font-bold text-blue-600 mt-1">{item.price}</Text>
    </View>
  </TouchableOpacity>
);

// --- Thành phần chính: App ---

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Dòng này sẽ tắt cái Header mặc định 'Home' xấu xí đi nè */}
      <Stack.Screen options={{ headerShown: false }} />

      <Header />

      <ScrollView className="flex-1">
        <SearchBar />

        <View className="py-3">
          <Text className="text-lg font-bold text-gray-800 px-4 mb-3">Danh mục</Text>
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

        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">Nổi bật</Text>
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