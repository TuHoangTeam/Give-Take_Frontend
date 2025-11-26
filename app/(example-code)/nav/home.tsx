import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Or MaterialIcons

// Mock Data based on your image

// Define what a Product looks like
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}
const DATA = [
  {
    id: '1',
    title: 'Máy Hút Bụi',
    description: 'Máy Hút Bụi Đã Qua Sử Dụng 2 Năm...',
    price: 'Miễn Phí',
    image: 'https://via.placeholder.com/150', // Replace with your actual image assets
  },
  {
    id: '2',
    title: 'Máy Hút Bụi',
    description: 'Máy Hút Bụi Đã Qua Sử Dụng 2 Năm...',
    price: 'Miễn Phí',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Máy Tính',
    description: 'Máy Tính Đã Qua Sử Dụng 2 Năm...',
    price: '500,000đ',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Chổi Cũ',
    description: 'Chổi Đã Qua Sử Dụng 2 Năm...',
    price: '320,000đ',
    image: 'https://via.placeholder.com/150',
  },
  // Added extra items to demonstrate scrolling
  {
    id: '5',
    title: 'Quạt Máy',
    description: 'Quạt cũ chạy êm...',
    price: '150,000đ',
    image: 'https://via.placeholder.com/150',
  },
];

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 20; // Calculate width for 2 columns with spacing

const ProductCard = ({ item }: { item: Product }) => (
  <View style={styles.card}>
    {/* Product Image */}
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Footer: Price Button & Seller Avatar */}
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.priceButton}>
          <Text style={styles.priceText}>{item.price}</Text>
        </TouchableOpacity>
        
        {/* Small Seller Avatar */}
        <Image 
            source={{ uri: 'https://via.placeholder.com/30' }} 
            style={styles.sellerAvatar} 
        />
      </View>
    </View>
  </View>
);

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- STATIC HEADER --- */}
      <View style={styles.headerContainer}>
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#666" style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="search for anything" 
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity>
           {/* Top Right User Avatar Icon */}
           <Icon name="person-circle-outline" size={38} color="#222" />
        </TouchableOpacity>
      </View>

      {/* --- SCROLLABLE CONTENT --- */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Optional subtle separator
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8b5c2b', // Brownish border from image
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 45,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  
  // Grid Styles
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 80, // EXTRA PADDING to ensure your bottom bar doesn't cover content
  },
  row: {
    justifyContent: 'space-between',
  },
  
  // Card Styles
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceButton: {
    backgroundColor: '#2b41c9', // Blue color from image
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sellerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default HomeScreen;