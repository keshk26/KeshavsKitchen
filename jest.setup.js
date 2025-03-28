import { jest } from '@jest/globals';

// Mock Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock the firebase.config module
jest.mock('@/firebase/config', () => {
  return {
    __esModule: true,
    db: {
      type: 'firestore',
      toJSON: () => 'firestore'
    }
  };
});

// Mock firebase/firestore module
jest.mock('@firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn()
}));