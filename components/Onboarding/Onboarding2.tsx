import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import { createUser, updateUser, getUser } from '../MinerdDb'; // Import your database functions

type OnboardingPageNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingSigno'>;

type Props = {
  navigation: OnboardingPageNavigationProp;
};

export default function OnboardingCreatePage({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [matricula, setMatricula] = useState('');
  const [frase, setFrase] = useState('');
  const [foto, setFoto] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    try {
      await createUser(foto, nombre, apellido, matricula, frase, ''); // Assuming signo is handled in the next screen
      navigation.navigate('OnboardingSigno', {
        nombre,
        apellido,
        matricula,
        frase,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    }
  };
  

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FDFEFE', '#0071BD']} style={styles.background} />
      <Image source={require('../../assets/icons/minerd.png')} style={styles.image} />
      <Text style={styles.headerText}>Actualiza tu perfil</Text>
      <View style={styles.profiledata}>
        <View style={styles.profileImgContainer}>
          <Image source={foto ? { uri: foto } : require('../../assets/perfildefault.png')} style={styles.profileImg} />
          <TouchableOpacity activeOpacity={0.7} style={styles.cameraButton} onPress={pickImage}>
            <Image source={require('../../assets/camera.png')} style={styles.cameraImage} />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Matricula" keyboardType='numeric' value={matricula} onChangeText={setMatricula} />
        <TextInput
          style={styles.textArea}
          placeholder="Reflexión o frase..."
          multiline
          numberOfLines={4}
          value={frase}
          onChangeText={setFrase}
        />
        <TouchableOpacity style={styles.continuarButton} onPress={handleContinue}>
          <Text style={styles.continuarButtonText}>Continuar</Text>
          <Image source={require('../../assets/rowWhite.png')} style={styles.icono} />
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
    backgroundColor: '#D5D8DC',
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
    fontFamily: 'alata-regular',
  },
  continuarButton: {
    marginVertical: 20,
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
    backgroundColor: '#0071BD',
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
