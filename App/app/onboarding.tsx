import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';


const slides = [
  {
    id: '1',
    title: 'Give & Take',
    description: '"Give & Take" Là Một Ứng Dụng Di Động Được Xây Dựng Để Giải Quyết Vấn Đề Xử Lý Đồ Cũ',
    
    image: require('../assets/images/onboarding.png'),
  },
  {
    id: '2',
    title: 'Give & Take',
    description: 'Dự Án Nhằm Mục Tiêu Tạo Ra Một Nền Tảng Kết Nối Cộng Đồng, Đặc Biệt Là Sinh Viên Và Các Cộng Đồng Địa Phương',
    image: require('../assets/images/onboarding.png'),
  },
  {
    id: '3',
    title: 'Give & Take',
    description: 'Giúp Dễ Dàng Cho Đi, Trao Đổi Hoặc Bán Lại Những Món Đồ Không Còn Sử Dụng',
    image: require('../assets/images/onboarding.png'),
  },
  {
    id: '4',
    title: 'Give & Take',
    description: 'Mục Tiêu Của Chúng Tôi Là Thúc Đẩy Lối Sống Bền Vững, Giảm Thiểu Rác Thải, Xây Dựng Một Cộng Đồng Chia Sẻ Dựa Trên Sự Tin Tưởng',
    image: require('../assets/images/onboarding.png'),
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width, height } = useWindowDimensions();
  const slideRef = useRef<FlatList>(null);

  
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Add getItemLayout for FlatList scrollToIndex
  const getItemLayout = (_data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  // Add onScrollToIndexFailed handler
  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      slideRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

 
  const finishOnboarding = async () => {
    try {
     
      await AsyncStorage.setItem('isOnboardingCompleted', 'true');
      
      router.replace('/(example-code)/nav/home');
    } catch (err) {
      console.log('Lỗi lưu data:', err);
      
      router.replace('/(example-code)/nav/home');
    }
  };

 
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      
      slideRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      
      finishOnboarding();
    }
  };

  
  const handleBack = () => {
    if (currentIndex > 0) {
      slideRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        
        
        <View className="flex-row justify-end px-5 pt-2">
          <TouchableOpacity onPress={finishOnboarding}>
              <Text className="text-gray-500 font-bold text-base">Bỏ qua</Text>
          </TouchableOpacity>
        </View>

       
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View style={{ width }}>
              
              <View style={{ height: height * 0.55, justifyContent: 'center', alignItems: 'center' }}>

                <Image 
                  source={item.image} 
                  style={{ width: width - 40, height: '100%', resizeMode: 'contain' }} 
                />
              </View>
              
              
              <View className="flex-1 px-6 pt-4 items-center">
                <Text className="text-2xl font-bold text-black mb-4 text-center uppercase">
                  {item.title}
                </Text>
                <Text className="text-base text-gray-600 text-center font-medium leading-6">
                  {item.description}
                </Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled 
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
        />

        
        <View className="px-6 pb-10 pt-5">
          <View className="flex-row justify-between items-center">
            
            
            <TouchableOpacity 
              onPress={handleBack}
              className={`bg-green-500 py-2 px-5 rounded-full ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
              disabled={currentIndex === 0}
            >
              <Text className="text-white font-bold">Quay Lại</Text>
            </TouchableOpacity>

            
            <View className="flex-row gap-2">
              {slides.map((_, index) => (
                <View 
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full ${
                    currentIndex === index ? 'bg-green-500' : 'bg-green-200'
                  }`}
                />
              ))}
            </View>

          
            <TouchableOpacity 
              onPress={handleNext}
              className="bg-green-500 py-2 px-5 rounded-full"
            >
              <Text className="text-white font-bold">
                {currentIndex === slides.length - 1 ? 'Bắt Đầu' : 'Tiếp Theo'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}