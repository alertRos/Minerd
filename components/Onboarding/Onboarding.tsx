import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';


type OnboardingPageNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingPage'>;

type Props = {
  navigation: OnboardingPageNavigationProp;
};

const OnboardingPage = ({ navigation }: Props) => {
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
        <Text style={styles.text}>¡Bienvenido, técnico!</Text>
      </View>
      <TouchableOpacity style={styles.continuarButton} onPress={() => navigation.navigate('OnboardingCreatePage')}>
        <Text style={styles.continuarButtonText}>Continuar</Text>
        <Image 
          source={require('../../assets/rowBlue.png')} 
          style={styles.icono}
        />
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
    justifyContent: 'space-between',
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
    flex: 1,
    textAlign: 'center',
    fontFamily: 'alata-regular',
  },
  icono: {
    width: 32,
    height: 32,
  }
});

export default OnboardingPage;
