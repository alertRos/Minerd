import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');

  const login = async () => {
    try {
      const response = await fetch(`https://adamix.net/minerd/def/iniciar_sesion.php?cedula=${cedula}&clave=${clave}`);
      const result = await response.json();

      if (result.exito) {
        await AsyncStorage.setItem('cedula', cedula);
        await AsyncStorage.setItem('clave', clave);

        navigation.navigate('MainApp', { cedula, clave });
      } else {
        console.log( result.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión. Por favor, intente nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/icons/minerd.png')} 
        style={styles.image} 
      />
      <Text style={styles.headerText}>Inicia sesión</Text>
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
        <Text style={{fontWeight:'600', color: '#0071BD', fontSize: 18, marginTop: 30}}>¿Haz olvidado tu contraseña? Recupérala</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 208,
    height: 43,
    marginBottom: 20,
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
    marginBottom: 30,
    fontFamily: 'alata-regular',
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
    borderColor: '#D5D8DC',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: 'alata-regular',
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
});
