import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Horoscope from './components/Horoscope';
import News from './components/News';
import Visits from './components/Visits';
import Weather from './components/Weather';
import Profile from './components/Profile';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
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

  if (!fontsLoaded) {
    // Optionally, you can return a loading view here if you want to show something else while loading
    return null; // This will keep the splash screen visible
  }

  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Visits"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            switch (route.name) {
              case 'Visits':
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
        <Tab.Screen name="Visits" component={Visits} />
        <Tab.Screen name="Noticias" component={News} />
        <Tab.Screen name="Clima" component={Weather} />
        <Tab.Screen name="Horóscopo" component={Horoscope} />
        <Tab.Screen name="Perfil" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}