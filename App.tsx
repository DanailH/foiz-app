import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider as AuthProvider } from './contexts/AuthContext';
import { theme } from './constants/BaseTheme';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <AuthProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
