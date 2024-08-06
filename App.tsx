import React, { useEffect, useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import OnboardingPage from './components/Onboarding/Onboarding';
import Login from './components/Onboarding/Login';
import OnboardingSigno from './components/Onboarding/Onboarding3';
import News from './components/News';
import Visits from './components/Visits';
import Weather from './components/Weather';
import Profile from './components/Profile';
import Register from './components/Onboarding/Register';
import { RestorePassword } from './components/Onboarding/RestorePassword';
import Horoscope from './components/Horoscope/Horoscope';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  OnboardingPage: undefined;
  OnboardingCreatePage: undefined;
  OnboardingSigno: undefined;
  OnboardingFinish: undefined;
  LoginPage: undefined; // Nueva ruta para inicio de sesión
  MainApp: undefined;
};

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Visits"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          switch (route.name) {
            case 'Visitas':
              iconSource = require('./assets/icons/visits.png');
              break;
            case 'Noticias':
              iconSource = require('./assets/icons/news.png');
              break;
            case 'Clima':
              iconSource = require('./assets/icons/weather.png');
              break;
            case 'Horóscopo':
              iconSource = require('./assets/icons/horoscope.png');
              break;
            case 'Perfil':
              iconSource = require('./assets/icons/profile.png');
              break;
            default:
              iconSource = require('./assets/icons/visits.png');
              break;
          }

          return (
            <Image 
              source={iconSource} 
              style={{ width: size, height: size, tintColor: color }} 
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color, fontSize: 12, fontFamily: 'alata-regular', fontWeight: focused ? 'bold' : 'normal', bottom: 16 }}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: '#DC3545',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#0071BD', 
          borderTopWidth: 0,
          position: 'absolute', 
          elevation: 0, 
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          shadowOpacity: 0, 
          height: 72, 
        },
      })}
    >
      <Tab.Screen name="Visitas" component={Visits} />
      <Tab.Screen name="Noticias" component={News} />
      <Tab.Screen name="Clima" component={Weather} />
      <Tab.Screen name="Horóscopo" component={Horoscope} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

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
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RestorePassword" component={RestorePassword} />
          <Stack.Screen name="MainApp" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
