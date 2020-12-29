import Constants from 'expo-constants'
import Navigation from './navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { makeRedirectUri } from 'expo-auth-session';
import { maybeCompleteAuthSession } from 'expo-web-browser'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

maybeCompleteAuthSession()

const useProxy = Constants.appOwnership === 'expo' && false

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  console.log(
    makeRedirectUri({
      native: 'fb455228658973642://authorize',
      useProxy
    })
  )
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
