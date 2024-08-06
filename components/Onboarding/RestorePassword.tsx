import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

const RestorePassword = ({ navigation }: any) => {
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [message, setMessage] = useState('');
  const [exito, setExito] = useState(false);

  const restorePassword = async () => {
    try {
      const response = await fetch(`https://adamix.net/minerd/def/recuperar_clave.php?cedula=${cedula}&correo=${correo}`);
      const result = await response.json();

      if (result.exito) {
        setExito(true);
        setMessage(result.mensaje);
      } else {
        Alert.alert('Error', result.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar recuperar la contraseña. Por favor, intente nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
    {!exito ? 
    (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.headerText}>Recuperar contraseña</Text>
      <Image 
      source={require('../../assets/onboarding3.png')} 
      style={styles.img_center} 
      />
      </View>
    ): (<Text style={styles.headerText}></Text>)}
      
        {!exito ? 
        (
            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Ingrese su cédula"
                value={cedula}
                onChangeText={setCedula}
                keyboardType="numeric"
                />
                <TextInput
                style={styles.input}
                placeholder="Ingrese su correo"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                />
                <TouchableOpacity style={styles.button} onPress={restorePassword}>
                <Text style={styles.buttonText}>Recuperar Contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerButtonText}>Volver al Inicio de Sesión</Text>
                </TouchableOpacity>
            </View>
        ): (
            <>
            <Image 
            source={require('../../assets/onboarding3.png')} 
            style={styles.img_center} 
            />
            <Text style={{fontWeight:'600', color: 'black', fontSize: 20, margin: 30, textAlign: 'center'}}>{message}</Text>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerButtonText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
            </>

        )}
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
    height: 160,
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
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'alata-regular',
  },
  registerButton: {
    marginVertical: 10,
    backgroundColor: '#0071BD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'alata-regular',
  },
});

export { RestorePassword };
