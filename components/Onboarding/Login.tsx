import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image,ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeDatabase, insertPhoto } from '../data/db';  // Ruta al archivo db.ts
import { pickImage } from '../data/imagePicker';  // Ruta al archivo imagePicker.ts

export default function Login({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');


  useEffect(() => {
    initializeDatabase();  // Inicializa la base de datos cuando se monta el componente
  }, []);

  const login = async () => {
    try {
      const response = await fetch(`https://adamix.net/minerd/def/iniciar_sesion.php?cedula=${cedula}&clave=${clave}`);
      const result = await response.json();

      if (result.exito) {
        await AsyncStorage.setItem('cedula', cedula);
        await AsyncStorage.setItem('clave', clave);

        navigation.navigate('MainApp', { cedula, clave });
      } else {
        Alert.alert('Ups ha ocurrido un error :C',(result.mensaje));
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión. Por favor, intente nuevamente.');
    }
  };


  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FDFEFE', '#0071BD']} style={styles.background} />
      <View style={styles.containerLogo}>
      <Image 
        source={require('../../assets/icons/minerd.png')} 
        style={styles.image} 
      />
      
      </View>
      <Text style={styles.headerText}>Inicia sesión</Text>
      <View style={styles.profiledata}>
      <Image 
        source={require('../../assets/onboarding3.png')} 
        style={styles.img_center} 
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cédula"
          value={cedula}
          onChangeText={setCedula}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Clave"
          value={clave}
          onChangeText={setClave}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RestorePassword')}>
        <Text style={{fontWeight:'600', color: '#fff', fontSize: 16, marginTop: 30}}>¿Haz olvidado tu contraseña? Recupérala</Text>
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
  containerLogo:{
    marginTop: 60,
    marginLeft:20,
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  image: {
    width: 208,
    height: 43,
  },
  img_center: {
    width: 208,
    height: 150,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0071BD',
    fontFamily: 'alata-regular',
    marginTop:40,
    marginLeft:20,
    textAlign:'center'
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    height: 44,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#D5D8DC',
    borderRadius: 8,
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#0071BD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 320,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'alata-regular',
  },
  registerButton: {
    backgroundColor: '#0071BD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 320,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'alata-regular',
  },
  profiledata: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

    cameraButton: {
      position: 'absolute',
      backgroundColor:'#0071BD',
      bottom: 5,
      left: 100,
      borderRadius: 50,
      padding: 8,
    },
    cameraImage: {
      width: 24,
      height: 24,
    },

    profileImgContainer: {
      position: 'relative',
      marginBottom: 16,
    },
    profileImg: {
      height: 150,
      width: 150,
      borderRadius: 100,
    },
    profileImgDefault:{
      height: 150,
      width: 150,
      borderRadius: 100,
      backgroundColor:'gray'
    },
    card: {
      marginHorizontal: 20,
      marginVertical: 20,
      backgroundColor: 'white',
      borderRadius: 15,
      shadowColor: '#1E1E1E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 6,
      width: '100%',
      maxWidth: 339,
      height: 109,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextCard: {
      fontFamily: 'Alata-Regular',
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 33.12,
      textAlign: 'center',
      width: 210,
      height: 66,
    },
    deleteButton: {
      marginHorizontal: 20,
      backgroundColor: '#0071BD',
      borderRadius: 10,
      paddingVertical: 10,
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
});
