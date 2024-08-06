import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type OnboardingFinishNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingFinish'>;

type Props = {
  route: {
    params: {
      nombre: string;
      apellido: string;
      matricula: string;
      frase: string;
      signo: string;
    };
  };
  navigation: OnboardingFinishNavigationProp;
};

const OnboardingFinish = ({ route, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FDFEFE', '#0071BD']}
        style={styles.background}
      />
      <Image 
        source={require('../../assets/icons/minerd.png')} 
        style={styles.image} 
      />
      <View style={styles.body}>
        <Image 
          source={require('../../assets/onboarding1.png')} 
          style={styles.imageOnboarding}
        />
        <Text style={styles.text}>Eso es todo, ¡Muchas gracias por registrarte!</Text>
      </View>
      <TouchableOpacity 
        style={styles.continuarButton} 
        onPress={() => navigation.replace('MainApp')}
      >
        <Text style={styles.continuarButtonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: 208,
    height: 43,
    marginTop: 38,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  continuarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFEFE',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  continuarButtonText: {
    color: '#0071BD',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'alata-regular',
  },
  icono: {
    width: 32,
    height: 32,
  }
});

export default OnboardingFinish;
