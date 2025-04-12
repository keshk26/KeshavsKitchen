import { Suspense, ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';

const PageLoading: React.FC = () => (
  <View className="items-center justify-center flex-1 bg-bgDefault">
    <ActivityIndicator testID="activity-indicator" size="large" />
  </View>
);

interface SuspenseFallbackProps {
  children: ReactNode;
}

const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({ children }) => (
  <Suspense fallback={<PageLoading />}>{children}</Suspense>
);

export default SuspenseFallback;
