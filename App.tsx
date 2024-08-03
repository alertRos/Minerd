import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './src/ProfileScreen';
import EditProfileScreen from './src/editProfile';
import CustomHeader from './assets/componentes/CustomHeader';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Home: undefined;
  EditProfile: undefined;
};
export type RootTabParamList = {
  Perfil: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'Alata-Regular': require('./assets/fonts/Alata-Regular.ttf'),
  });
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent',
  },
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
      await SplashScreen.hideAsync();
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
              headerTitle: () => <CustomHeader title="MINERD" />,
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Perfil') {
            iconName = 'account';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          } else {
            iconName = 'home';
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              color={color}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: '#DC3545',
        tabBarInactiveTintColor: '#FDFEFE',
        tabBarStyle: {
          backgroundColor: '#0071BD',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    >
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          headerTitle: () => <CustomHeader title="MINERD" />,
        }}
      />
      {/* Agrega más pantallas aquí si es necesario */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
});
