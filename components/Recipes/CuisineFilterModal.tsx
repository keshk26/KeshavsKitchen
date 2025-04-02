import React from 'react';
import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CuisineFilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCuisine: string | undefined;
  onSelectCuisine: (cuisine: string | undefined) => void;
  cuisines: string[];
}

const CuisineFilterModal: React.FC<CuisineFilterModalProps> = ({
  visible,
  onClose,
  selectedCuisine,
  onSelectCuisine,
  cuisines,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="justify-end flex-1 bg-black/50">
        <View className="p-6 bg-white rounded-t-3xl">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-semibold">Filter by Cuisine</Text>
            <Pressable onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={24} color="#FF6B6B" />
            </Pressable>
          </View>

          <ScrollView className="max-h-96">
            <Pressable
              onPress={() => onSelectCuisine(undefined)}
              className="flex-row items-center justify-between py-3 border-b border-gray-100"
            >
              <Text className="text-lg">All Cuisines</Text>
              {selectedCuisine === undefined && (
                <Ionicons name="checkmark" size={24} color="#FF6B6B" />
              )}
            </Pressable>

            {cuisines.map((cuisine) => (
              <Pressable
                key={cuisine}
                onPress={() => onSelectCuisine(cuisine)}
                className="flex-row items-center justify-between py-3 border-b border-gray-100"
              >
                <Text className="text-lg">{cuisine}</Text>
                {selectedCuisine === cuisine && (
                  <Ionicons name="checkmark" size={24} color="#FF6B6B" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CuisineFilterModal; 