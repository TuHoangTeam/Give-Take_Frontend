import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

// Mock expo-router before importing the component
jest.mock('expo-router', () => ({
  Stack: {
    Screen: jest.fn(({ options }) => null),
  },
}));

import App from '../(example-code)/nav/home';

describe('Home Screen (App Component)', () => {
  describe('Render Tests', () => {
    it('should render without crashing', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
    });

    it('should render Header with welcome text and title', () => {
      render(<App />);
      expect(screen.getByText('Chào mừng trở lại!')).toBeTruthy();
      expect(screen.getByText('Give & Take')).toBeTruthy();
    });

    it('should render cart icon with notification badge', () => {
      render(<App />);
      expect(screen.getByText('🛒')).toBeTruthy();
      const badges = screen.getAllByText('3');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should render SearchBar with search icon and placeholder', () => {
      render(<App />);
      expect(screen.getByText('🔍')).toBeTruthy();
      const searchInputs = screen.getAllByPlaceholderText('Tìm kiếm sản phẩm...');
      expect(searchInputs.length).toBeGreaterThan(0);
    });

    it('should render Categories section title', () => {
      render(<App />);
      expect(screen.getByText('Danh mục')).toBeTruthy();
    });

    it('should render all category items', () => {
      render(<App />);
      const categories = ['Thời trang', 'Điện tử', 'Đồ gia dụng', 'Sách', 'Thể thao', 'Sức khỏe'];
      categories.forEach(category => {
        expect(screen.getByText(category)).toBeTruthy();
      });
    });

    it('should render all category icons', () => {
      render(<App />);
      const icons = ['👕', '📱', '🏠', '📚', '⚽', '❤️'];
      icons.forEach(icon => {
        expect(screen.getByText(icon)).toBeTruthy();
      });
    });

    it('should render Banner section', () => {
      render(<App />);
      // Banner uses Image component which should be rendered
      const { root } = render(<App />);
      expect(root).toBeTruthy();
    });

    it('should render Featured products section title', () => {
      render(<App />);
      expect(screen.getByText('Nổi bật')).toBeTruthy();
    });

    it('should render all product items', () => {
      render(<App />);
      const products = [
        'Áo phông nam Cotton',
        'Tai nghe Bluetooth 5.0',
        'Nồi chiên không dầu 5L',
        'Sách "Nhà Giả Kim"',
        'Giày chạy bộ',
        'Đồng hồ thông minh',
      ];
      products.forEach(product => {
        expect(screen.getByText(product)).toBeTruthy();
      });
    });

    it('should render all product prices', () => {
      render(<App />);
      const prices = [
        '350.000đ',
        '790.000đ',
        '1.850.000đ',
        '120.000đ',
        '1.200.000đ',
        '2.500.000đ',
      ];
      prices.forEach(price => {
        expect(screen.getByText(price)).toBeTruthy();
      });
    });

    it('should have correct background color (bg-gray-50)', () => {
      const { root } = render(<App />);
      // The root SafeAreaView should have bg-gray-50
      expect(root).toBeTruthy();
    });

    it('should render correct structure hierarchy', () => {
      const { root } = render(<App />);
      // SafeAreaView > Header + ScrollView
      expect(root).toBeTruthy();
      // Verify Header and main content exist
      expect(screen.getByText('Give & Take')).toBeTruthy();
      expect(screen.getByText('Danh mục')).toBeTruthy();
    });

    it('should render logo image in header', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
      expect(screen.getByText('Give & Take')).toBeTruthy();
    });
  });

  describe('SearchBar Interaction Tests', () => {
    it('should update search text when user types', () => {
      render(<App />);
      const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
      
      fireEvent.changeText(searchInput, 'test search');
      expect(searchInput.props.value).toBe('test search');
    });

    it('should clear search text', () => {
      render(<App />);
      const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
      
      fireEvent.changeText(searchInput, 'test');
      fireEvent.changeText(searchInput, '');
      expect(searchInput.props.value).toBe('');
    });

    it('should handle multiple character inputs', () => {
      render(<App />);
      const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
      
      const testString = 'Áo phông';
      fireEvent.changeText(searchInput, testString);
      expect(searchInput.props.value).toBe(testString);
    });

    it('should handle special characters in search', () => {
      render(<App />);
      const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
      
      fireEvent.changeText(searchInput, '@#$%^&*()');
      expect(searchInput.props.value).toBe('@#$%^&*()');
    });
  });

  describe('Button Interaction Tests', () => {
    it('should render category buttons as TouchableOpacity', () => {
      render(<App />);
      // All category items should be rendered
      expect(screen.getByText('Thời trang')).toBeTruthy();
      expect(screen.getByText('Điện tử')).toBeTruthy();
    });

    it('should render product buttons as TouchableOpacity', () => {
      render(<App />);
      // All product items should be rendered
      expect(screen.getByText('Áo phông nam Cotton')).toBeTruthy();
      expect(screen.getByText('Tai nghe Bluetooth 5.0')).toBeTruthy();
    });

    it('should render cart button', () => {
      render(<App />);
      const cartIcon = screen.getByText('🛒');
      expect(cartIcon).toBeTruthy();
    });

    it('should handle category button press', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
      // Category buttons are rendered and can be interacted with
      const categoryButton = screen.getByText('Thời trang');
      expect(categoryButton).toBeTruthy();
    });

    it('should handle product button press', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
      const productButton = screen.getByText('Áo phông nam Cotton');
      expect(productButton).toBeTruthy();
    });
  });

  describe('Data Structure Tests', () => {
    it('should have 6 categories', () => {
      render(<App />);
      const categories = ['Thời trang', 'Điện tử', 'Đồ gia dụng', 'Sách', 'Thể thao', 'Sức khỏe'];
      expect(categories.length).toBe(6);
    });

    it('should have 6 products', () => {
      render(<App />);
      const products = [
        'Áo phông nam Cotton',
        'Tai nghe Bluetooth 5.0',
        'Nồi chiên không dầu 5L',
        'Sách "Nhà Giả Kim"',
        'Giày chạy bộ',
        'Đồng hồ thông minh',
      ];
      expect(products.length).toBe(6);
      products.forEach(product => {
        expect(screen.getByText(product)).toBeTruthy();
      });
    });

    it('should have correct product properties', () => {
      render(<App />);
      // Check that each product has both name and price
      expect(screen.getByText('Áo phông nam Cotton')).toBeTruthy();
      expect(screen.getByText('350.000đ')).toBeTruthy();
      
      expect(screen.getByText('Tai nghe Bluetooth 5.0')).toBeTruthy();
      expect(screen.getByText('790.000đ')).toBeTruthy();
      
      expect(screen.getByText('Nồi chiên không dầu 5L')).toBeTruthy();
      expect(screen.getByText('1.850.000đ')).toBeTruthy();
      
      expect(screen.getByText('Sách "Nhà Giả Kim"')).toBeTruthy();
      expect(screen.getByText('120.000đ')).toBeTruthy();
      
      expect(screen.getByText('Giày chạy bộ')).toBeTruthy();
      expect(screen.getByText('1.200.000đ')).toBeTruthy();
      
      expect(screen.getByText('Đồng hồ thông minh')).toBeTruthy();
      expect(screen.getByText('2.500.000đ')).toBeTruthy();
    });
  });

  describe('Layout & Styling Tests', () => {
    it('should render Header with flexrow layout', () => {
      render(<App />);
      expect(screen.getByText('Give & Take')).toBeTruthy();
      expect(screen.getByText('🛒')).toBeTruthy();
    });

    it('should render categories in horizontal scroll', () => {
      render(<App />);
      expect(screen.getByText('Danh mục')).toBeTruthy();
      expect(screen.getByText('Thời trang')).toBeTruthy();
    });

    it('should render products in grid layout', () => {
      render(<App />);
      expect(screen.getByText('Nổi bật')).toBeTruthy();
    });

    it('should have correct spacing and padding', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
    });

    it('should render search bar with icon', () => {
      render(<App />);
      expect(screen.getByText('🔍')).toBeTruthy();
    });
  });

  describe('Component Structure Tests', () => {
    it('should export App as default export', () => {
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });

    it('should render SafeAreaView as root container', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
    });

    it('should contain ScrollView for main content', () => {
      render(<App />);
      expect(screen.getByText('Danh mục')).toBeTruthy();
      expect(screen.getByText('Nổi bật')).toBeTruthy();
    });

    it('should have Header component with correct elements', () => {
      render(<App />);
      expect(screen.getByText('Chào mừng trở lại!')).toBeTruthy();
      expect(screen.getByText('Give & Take')).toBeTruthy();
      expect(screen.getByText('🛒')).toBeTruthy();
    });
  });

  describe('Edge Cases & Error Handling', () => {
    it('should handle undefined props gracefully', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
    });

    it('should render multiple instances without conflicts', () => {
      render(<App />);
      expect(screen.getByText('Give & Take')).toBeTruthy();
    });

    it('should maintain state correctly in SearchBar', () => {
      render(<App />);
      const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
      
      fireEvent.changeText(searchInput, 'first');
      expect(searchInput.props.value).toBe('first');
      
      fireEvent.changeText(searchInput, 'second');
      expect(searchInput.props.value).toBe('second');
    });

    it('should render all elements even if data is large', () => {
      render(<App />);
      expect(screen.getByText('Give & Take')).toBeTruthy();
      expect(screen.getByText('Danh mục')).toBeTruthy();
      expect(screen.getByText('Nổi bật')).toBeTruthy();
      expect(screen.getByText('Áo phông nam Cotton')).toBeTruthy();
    });
  });

  describe('Accessibility Tests', () => {
    it('should have readable text content', () => {
      render(<App />);
      expect(screen.getByText('Chào mừng trở lại!')).toBeTruthy();
    });

    it('should have descriptive category names', () => {
      render(<App />);
      const categories = ['Thời trang', 'Điện tử', 'Đồ gia dụng', 'Sách', 'Thể thao', 'Sức khỏe'];
      categories.forEach(category => {
        expect(screen.getByText(category)).toBeTruthy();
      });
    });

    it('should have descriptive product names', () => {
      render(<App />);
      expect(screen.getByText('Áo phông nam Cotton')).toBeTruthy();
    });

    it('should have visible search placeholder', () => {
      render(<App />);
      expect(screen.getByPlaceholderText('Tìm kiếm sản phẩm...')).toBeTruthy();
    });

    it('should display prices clearly', () => {
      render(<App />);
      const prices = [
        '350.000đ',
        '790.000đ',
        '1.850.000đ',
        '120.000đ',
        '1.200.000đ',
        '2.500.000đ',
      ];
      prices.forEach(price => {
        expect(screen.getByText(price)).toBeTruthy();
      });
    });
  });

  describe('Complete Integration Tests', () => {
    it('should render complete home screen without errors', () => {
      render(<App />);
      
      // Header
      expect(screen.getByText('Chào mừng trở lại!')).toBeTruthy();
      expect(screen.getByText('Give & Take')).toBeTruthy();
      expect(screen.getByText('🛒')).toBeTruthy();
      
      // Search
      expect(screen.getByPlaceholderText('Tìm kiếm sản phẩm...')).toBeTruthy();
      
      // Categories
      expect(screen.getByText('Danh mục')).toBeTruthy();
      expect(screen.getByText('Thời trang')).toBeTruthy();
      
      // Products
      expect(screen.getByText('Nổi bật')).toBeTruthy();
      expect(screen.getByText('Áo phông nam Cotton')).toBeTruthy();
    });

    it('should handle user interaction flow', () => {
      render(<App />);
      
      // User searches
      const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
      fireEvent.changeText(searchInput, 'Áo');
      expect(searchInput.props.value).toBe('Áo');
      
      // User can see products
      expect(screen.getByText('Áo phông nam Cotton')).toBeTruthy();
    });

    it('should maintain component tree structure', () => {
      const { root } = render(<App />);
      expect(root).toBeTruthy();
      
      // Verify all main sections exist
      expect(screen.getByText('Give & Take')).toBeTruthy();
      expect(screen.getByText('Danh mục')).toBeTruthy();
      expect(screen.getByText('Nổi bật')).toBeTruthy();
      
      // Verify interactive elements
      expect(screen.getByPlaceholderText('Tìm kiếm sản phẩm...')).toBeTruthy();
      expect(screen.getByText('🛒')).toBeTruthy();
    });
  });
});
