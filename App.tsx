import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingPage from './components/Onboarding';
import OnboardingCreatePage from './components/Onboarding2';
import OnboardingSigno from './components/Onboarding3';
import OnboardingFinish from './components/Onboarding4';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  OnboardingPage: undefined;
  OnboardingCreatePage: undefined;
  OnboardingSigno: undefined;
  OnboardingFinish: undefined;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'alata-regular': require('./assets/fonts/Alata-Regular.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // O muestra una pantalla de carga
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
          <Stack.Screen name="OnboardingCreatePage" component={OnboardingCreatePage} />
          <Stack.Screen name="OnboardingSigno" component={OnboardingSigno} />
          <Stack.Screen name="OnboardingFinish" component={OnboardingFinish} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
