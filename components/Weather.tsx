import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [temp, setTemp] = useState('');
  const [locationName, setLocationName] = useState('');
  const [wind, setWind] = useState('');
  const [uv, setUv] = useState('');
  const [feelsLike, setFeelslike] = useState('');
  const [humidity, setHumidity] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [authorized, setAuthorized] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState('https://cdn.weatherapi.com/weather/64x64/day/113.png');

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Por favor, permite la ubicación para una mejor experiencia de usuario");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
      setAuthorized(true);
    };
    getPermissions();
  }, []);

  const getWeather = async () => {
    if (latitude && longitude) {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=b3d81edddafd4063baf195531240308&q=${latitude},${longitude}`);
        setTemp(response.data.current.temp_c);
        setLocationName(response.data.location.name);
        setWind(response.data.current.wind_kph);
        setUv(response.data.current.uv);
        setFeelslike(response.data.current.feelslike_c);
        setHumidity(response.data.current.humidity);
        setWeatherIcon('https:' + response.data.current.condition.icon);
      } catch (error) {
        console.log("Error con la solicitud:", error);
      }
    }
  };

  useEffect(() => {
    if (authorized) {
      getWeather();
    }
  }, [authorized, latitude, longitude]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/minerd.png')} style={{ width: 208, height: 43, marginTop: 38 }} />
      <View style={styles.body}>
        {authorized ? (
          <>
            <Text style={{ color: 'black', fontWeight: '600', fontSize: 32, textAlign: 'left' }}>Clima</Text>
            <Text style={{ color: '#012D4B', fontWeight: '600',fontSize: 20, textAlign: 'left', marginLeft: 28, marginTop: 50}}>{locationName}</Text>
            <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center', margin: 90}}>
              <Text style={{ color: '#012D4B', fontWeight: '600', fontSize: 60, textAlign: 'left' }}>{temp}°</Text>
              <Image source={{ uri: weatherIcon }} style={{ width: 50, height: 50, top: 5, marginLeft: 10 }}/>
            </View>
            
            <View style={{height: 144, borderRadius: 10, width: '100%', justifyContent: 'space-around', alignItems: 'center',backgroundColor: 'white', padding: 20, marginTop: 30,flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image source={require('../assets/weather/humidity.png')} style={{width: 32, height: 32}}/>
                <Text style={{fontSize: 24, color: '#0071BD', fontWeight: '600'}}>{humidity}%</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image source={require('../assets/weather/wind.png')} style={{width: 32, height: 32}}/>
                <Text style={{fontSize: 24, color: '#ABB2B9',fontWeight: '600'}}>{wind} kph</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image source={require('../assets/weather/uv.png')} style={{width: 32, height: 32}}/>
                <Text style={{fontSize: 24, fontWeight: '600', color: '#F4D03F'}}>{uv}</Text>
              </View>
            
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
              <Text style={{fontSize: 24, fontWeight: '400'}}>Se siente como: </Text>
              <Text style={{fontSize: 32, fontWeight: '600', color: ''}}> {feelsLike}°</Text>
            </View>
          </>
        ) : (
          <Text>Obteniendo ubicación...</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F7F9F9'
  },
  body: {
    paddingTop: 40,
  },
});
