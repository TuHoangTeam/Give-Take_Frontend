import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
      
    
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />
      <Tabs.Screen
        name="search"
        options={{ title: 'Search', tabBarIcon: () => <MaterialIcons name="search" size={24} color="black" /> }}
      />
      <Tabs.Screen name="add" options={{ title: 'Add', tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }} />
      <Tabs.Screen name="inbox" options={{ title: 'Inbox', tabBarIcon: () => <Ionicons name="chatbubble-outline" size={24} color="black" /> }} />
      <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: () => <Ionicons name="person-outline" size={24} color="black" /> }} />
      <Tabs.Screen name="login" options={{ title: 'Login', tabBarIcon: () => <AntDesign name="login" size={24} color="black" /> }} />
    </Tabs>
  );
}
