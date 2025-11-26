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
      
      const value = await AsyncStorage.getItem('isOnboardingCompleted');
      
      if (value === 'true') {
        
        router.replace('/(example-code)/nav/home');
      } else {
        
        router.replace('/onboarding');
      }
    } catch (e) {
      
      router.replace('/onboarding');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}