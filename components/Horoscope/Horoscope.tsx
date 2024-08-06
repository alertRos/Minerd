import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import zodiacSigns from './Zodiac';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getZodiacSign } from './HoroscopeService';
import { useUser } from '../UserService';

const Horoscope = () => {
  const [sign, setSign] = useState('taurus');
  const [horoscope, setHoroscope] = useState('');
  const [week, setWeek] = useState('');
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const zodiacSign = zodiacSigns[sign];
  const user = useUser(cedula, clave);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedCedula = await AsyncStorage.getItem('cedula');
        const storedClave = await AsyncStorage.getItem('clave');
        if (storedCedula !== null && storedClave !== null) {
          setCedula(storedCedula);
          setClave(storedClave);
        } else {
          console.warn('Credenciales no encontradas en AsyncStorage');
        }
      } catch (error) {
        console.error('Error recuperando credenciales:', error);
      }
    };

    loadCredentials();
  }, []);

  useEffect(() => {
    if (user?.fecha_nacimiento) {
      const newSign = getZodiacSign(user.fecha_nacimiento);
      setSign(newSign);
    }
  }, [user?.fecha_nacimiento]);

  async function Translate(text: string) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyBk-IQ31D_N5_UrCmb53SDvq_iylzkMYf8`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: 'es', 
        source: 'en'  
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud ' + response.statusText);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  }

  const getHoroscopeWeekly = async () => {
    try {
      const response = await axios.get(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/weekly?sign=${sign}`);
      let responseHoroscope = response.data.data.horoscope_data;
      let responseWeekly = response.data.data.week;

      responseHoroscope = await Translate(responseHoroscope);
      responseWeekly = await Translate(responseWeekly);
      setHoroscope(responseHoroscope);
      setWeek(responseWeekly);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getHoroscopeWeekly();
    }, [sign]) 
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/minerd.png')} style={{ width: 208, height: 43, marginTop: 38 }} />
      <View style={styles.body}>
        {zodiacSign && (
          <>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 32, textAlign: 'left' }}>{zodiacSign.name}</Text>
            <Text style={{ color: '#BDBDBD', fontWeight: 'bold', fontSize: 20, textAlign: 'left', marginTop: 8}}>{zodiacSign.dateRange}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ color: '#BDBDBD', fontWeight: 'bold', fontSize: 20, textAlign: 'left', marginTop: 5 }}>Elemento: </Text>
              <Image source={zodiacSign.element} style={{ width: 25, height: 25, alignSelf: 'center'}} />
            </View>
            <Image source={zodiacSign.image} style={{ width: 120, height: 120, alignSelf: 'center', margin: 50}} />
            <Text style={{ color: '#0071BD', fontWeight: 'bold', fontSize: 24, textAlign: 'left' }}>Horoscopo semanal</Text>
            <Text style={{ color: '#BDBDBD', fontWeight: 'bold', fontSize: 18, textAlign: 'left', marginTop: 5 }}>{week}</Text>
            <ScrollView style={{height: 200, backgroundColor: 'white', padding: 20, marginTop: 40, borderRadius: 8}}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{horoscope}</Text>         
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};

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

export default Horoscope;
