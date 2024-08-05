import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

type OnboardingPageNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingSigno'>;

type Props = {
  navigation: OnboardingPageNavigationProp;
};

const data = [
  { label: 'Aries', value: 'aries' },
  { label: 'Tauro', value: 'tauro' },
  { label: 'Géminis', value: 'geminis' },
  { label: 'Cáncer', value: 'cancer' },
  { label: 'Leo', value: 'leo' },
  { label: 'Virgo', value: 'virgo' },
  { label: 'Libra', value: 'libra' },
  { label: 'Escorpio', value: 'escorpio' },
  { label: 'Sagitario', value: 'sagitario' },
  { label: 'Capricornio', value: 'capricornio' },
  { label: 'Acuario', value: 'acuario' },
  { label: 'Piscis', value: 'piscis' },
];

const OnboardingSigno = ({ navigation }: Props) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FDFEFE', '#0071BD']}
        style={styles.background}
      />
      <Image 
        source={require('../assets/icons/minerd.png')} 
        style={styles.image} 
      />
      <View style={styles.body}>
        <Image 
          source={require('../assets/onboarding3.png')} 
          style={styles.imageOnboarding}
        />
        <Text style={styles.text}>¿Cuál es tu signo zodiacal?</Text>
      </View>
      <View style={styles.profiledata}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#0071BD', borderWidth: 2 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Selecciona tu signo"
          searchPlaceholder="Buscar..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity 
          style={styles.continuarButton} 
          onPress={() => navigation.navigate('OnboardingFinish')}
          accessibilityLabel="Continuar a la siguiente pantalla"
        >
          <Text style={styles.continuarButtonText}>Continuar</Text>
          <Image 
            source={require('../assets/rowWhite.png')} 
            style={styles.icono}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: 208,
    height: 43,
    position: 'absolute',
    left: 20,
    top: 40,
    marginTop: 28,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  imageOnboarding: {
    width: 250,
    height: 250,
    marginTop: 38,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'alata-regular',
    lineHeight: 49,
    marginTop: 20,
  },
  profiledata: {
    marginTop: 20,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
  },
  continuarButton: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0071BD',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: '100%',
  },
  continuarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, 
    textAlign: 'center',
    fontFamily: 'alata-regular',
  },
  icono: {
    width: 32,
    height: 32,
  },
  dropdown: {
    height: 43, // Increased height for better visibility
    width:329,
    borderColor: '#D5D8DC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconStyle: {
    width: 32,
    height: 40,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 24,
    color: '#17202A',
    lineHeight:33,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default OnboardingSigno;
