import { jest } from '@jest/globals';

// Mock Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Setup global error handler
global.ErrorUtils = {
  setGlobalHandler: () => { },
  getGlobalHandler: () => { },
};

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => { };
  return Reanimated;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    TouchableOpacity: View,
    ScrollView: View,
    PanGestureHandlerGestureEvent: jest.fn(),
    useAnimatedGestureHandler: jest.fn(),
    useAnimatedStyle: jest.fn(),
    useSharedValue: jest.fn(),
    withSpring: jest.fn(),
    withTiming: jest.fn(),
    runOnJS: jest.fn(),
  };
});

// Setup global fetch mock
global.fetch = jest.fn();

// Setup error handler mock
global.ErrorHandler = (error, isFatal) => {
  console.error(error);
}; 