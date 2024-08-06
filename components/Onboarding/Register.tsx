import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import DatePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

export default function LoginPage({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [registered, setRegistered] = useState(false);
  
  const dateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowDatePicker(false);
    setFechaNacimiento(currentDate);
  };

  const register = async () => {
    try {
      const f_fecha = format(fechaNacimiento, 'yyyy-MM-dd');
      const response = await fetch(`https://adamix.net/minerd/def/registro.php?cedula=${cedula}&nombre=${nombre}&apellido=${apellido}&clave=${clave}&correo=${correo}&telefono=${telefono}&fecha_nacimiento=${f_fecha}`);
      const result = await response.json();

      if (result.exito) {
        setRegistered(true); // Cambia el estado a registrado
        Alert.alert('Registro exitoso', '¡Te has registrado correctamente!', [{ text: 'OK', onPress: () => navigation.navigate('LoginPage') }]);
      } else {
        Alert.alert('Error', result.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar registrarse. Por favor, intente nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      {!registered ? (
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          paginationStyle={styles.pagination}
          loop={false}
        >
          <View style={styles.slide}>
            <Text style={styles.headerText}>¡Unete a nosotros! Regístrate</Text>
            <Image 
              source={require('../../assets/onboarding3.png')} 
              style={styles.img_center} 
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su cédula o matrícula"
              value={cedula}
              onChangeText={setCedula}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su apellido"
              value={apellido}
              onChangeText={setApellido}
            />
          </View>
          <View style={styles.slide}>
            <Text style={styles.headerText}>Estás a un paso más</Text>
            <Image 
              source={require('../../assets/onboarding3.png')} 
              style={styles.img_center} 
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su correo electrónico"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text style={{ textAlign: 'center', fontWeight: '600', color: 'gray' }}>
                Toca para elegir tu fecha de nacimiento: {format(fechaNacimiento, 'dd/MM/yyyy')}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DatePicker
                value={fechaNacimiento}
                mode="date"
                display="default"
                onChange={dateChange}
              />
            )}
          </View>
          <View style={styles.slide}>
            <Text style={styles.headerText}>¡Ya casi!</Text>
            <Image 
              source={require('../../assets/onboarding3.png')} 
              style={styles.img_center} 
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu clave de acceso"
              value={clave}
              onChangeText={setClave}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={register}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide}>
          <Text style={styles.headerText}>¡Todo listo querido técnico!</Text>
          <Image 
            source={require('../../assets/onboarding1.png')} 
            style={styles.img_center} 
          />
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
        </Swiper>
      ) : (
        <View style={styles.slide}>
          <Text style={styles.headerText}>¡Todo listo querido técnico!</Text>
          <Image 
            source={require('../../assets/onboarding1.png')} 
            style={styles.img_center} 
          />
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
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
    width: 200,
    height: 190,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0071BD',
    marginBottom: 30,
    fontFamily: 'alata-regular',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    height: 58,
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#D5D8DC',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: 'alata-regular',
    justifyContent: 'center',
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
  wrapper: {
    height: '100%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    bottom: 10,
  },
});
