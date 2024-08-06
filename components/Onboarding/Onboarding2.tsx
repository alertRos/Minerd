import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type OnboardingPageNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingCreatePage'>;

type Props = {
  navigation: OnboardingPageNavigationProp;
};

export default function OnboardingCreatePage({ navigation }: Props) {
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
      <Text style={styles.headerText}>Actualiza tu perfil</Text>
      <View style={styles.profiledata}>
        <View style={styles.profileImgContainer}>
          <Image source={require('../../assets/perfildefault.png')} style={styles.profileImg} />
          <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.cameraButton} 
            onPress={() => {}}
          >
            <Image
              source={require('../../assets/camera.png')}
              style={styles.cameraImage}
            />
          </TouchableOpacity>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre"
        />
        <TextInput 
          style={styles.input}
          placeholder="Apellido"
        />
        <TextInput 
          style={styles.input}
          placeholder="Matricula"
          keyboardType='numeric'
        />
        <TextInput 
          style={styles.textArea}
          placeholder="Reflexión o frase..."
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.continuarButton} onPress={() => navigation.navigate('OnboardingSigno')}>
          <Text style={styles.continuarButtonText}>Continuar</Text>
          <Image 
            source={require('../../assets/rowWhite.png')} 
            style={styles.icono}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  image: {
    width: 208,
    height: 43,
    position: 'absolute',
    left: 20,
    top: 40,
    marginTop: 28,
  },
  headerText: {
    marginTop: 140,
    textAlign: 'center',
    color: '#FDFEFE',
    fontSize: 32,
    fontFamily: 'alata-regular',
    lineHeight: 44,
  },
  profiledata: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileImgContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImg: {
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor:'#D5D8DC'
  },
  input: {
    height: 44,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#D5D8DC',
    borderRadius: 8,
    fontFamily: 'alata-regular',
  },
  textArea: {
    marginVertical: 12,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#1E1E1E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
    width: '100%',
    maxWidth: 339,
    height: 100, 
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign:'center',
    fontFamily: 'alata-regular',
  },
  continuarButton: {
    marginVertical:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0071BD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  cameraButton: {
    position: 'absolute',
    backgroundColor:'#0071BD',
    bottom: -4,
    left: 70,
    borderRadius: 50,
    padding: 8,
  },
  cameraImage: {
    width: 20,
    height: 20,
  },
});
