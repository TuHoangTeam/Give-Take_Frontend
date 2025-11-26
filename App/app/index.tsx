import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';


export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkFirstTimeOpen();
  }, []);

  const checkFirstTimeOpen = async () => {
    try {
      // Kiểm tra xem trong bộ nhớ có đánh dấu là đã xem chưa
      const value = await AsyncStorage.getItem('isOnboardingCompleted');
      
      if (value === 'true') {
        // Nếu xem rồi -> Vào thẳng trang Home của bạn bro
        // Lưu ý: Đường dẫn này phải đúng với file home.tsx của bạn bro
        router.replace('/(example-code)/nav/home');
      } else {
        // Nếu chưa xem -> Vào trang Onboarding
        router.replace('/onboarding');
      }
    } catch (e) {
      // Lỗi thì cứ cho vào onboarding cho chắc
      router.replace('/onboarding');
    } finally {
      setLoading(false);
    }
  };

  // Màn hình loading xoay xoay trong lúc chờ kiểm tra
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}