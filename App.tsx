import React, { useEffect, useState, useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import OnboardingPage from './components/Onboarding/Onboarding';
import OnboardingCreatePage from './components/Onboarding/Onboarding2';
import OnboardingSigno from './components/Onboarding/Onboarding3';
import OnboardingFinish from './components/Onboarding/Onboarding4';
import Horoscope from './components/Horoscope/Horoscope';
import News from './components/News';
import Visits from './components/Visits';
import Weather from './components/Weather';
import { hasUsers, initializeDatabase } from './components/MinerdDb';
import ProfileScreen from './components/Profile/ProfileScreen';
import EditProfile from './components/Profile/editProfile';

export type RootStackParamList = {
  OnboardingPage: undefined;
  OnboardingCreatePage: undefined;
  OnboardingSigno: {
    nombre: string;
    apellido: string;
    matricula: string;
    frase: string;
  };
  OnboardingFinish: {
    nombre: string;
    apellido: string;
    matricula: string;
    frase: string;
    signo: string;
  };
  MainApp: undefined;
  EditProfile: undefined;
};

export type MainTabsParamList = {
  Visitas: undefined;
  Noticias: undefined;
  Clima: undefined;
  Horóscopo: undefined;
  Perfil: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();
initializeDatabase();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Visitas"
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
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'alata-regular': require('./assets/fonts/Alata-Regular.ttf'),
  });

  const [initialRoute, setInitialRoute] = useState<'OnboardingPage' | 'MainApp'>('OnboardingPage');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // Evitar que el splash screen se oculte automáticamente

    const checkUser = async () => {
      try {
        const userExists = await hasUsers();
        if (userExists) {
          setInitialRoute('MainApp');
        } else {
          setInitialRoute('OnboardingPage');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking if user exists:', error);
        setLoading(false);
      }
    };

    checkUser();
  }, []);

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

  if (loading || !fontsLoaded) {
    return null; // Puedes reemplazar esto con un splash screen personalizado si lo deseas
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {initialRoute === 'OnboardingPage' ? (
            <>
              <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
              <Stack.Screen name="OnboardingCreatePage" component={OnboardingCreatePage} />
              <Stack.Screen name="OnboardingSigno" component={OnboardingSigno} />
              <Stack.Screen name="OnboardingFinish" component={OnboardingFinish} />
              <Stack.Screen name="MainApp" component={MainTabs} />
              <Stack.Screen name="EditProfile" component={EditProfile} /> 
            </>
          ) : (
            <>
              <Stack.Screen name="MainApp" component={MainTabs} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
