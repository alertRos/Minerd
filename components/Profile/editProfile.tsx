import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../UserService';
const db = SQLite.openDatabase('userProfile.db');

const fetchUserProfile = (cedula: string, setPhotoUri: (uri: string | null) => void, setPhrase: (phrase: string | null) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT photoUri, phrase FROM user_profile WHERE cedula = ?;`,
      [cedula],
      (_, { rows: { _array } }) => {
        if (_array.length > 0) {
          setPhotoUri(_array[0].photoUri);
          setPhrase(_array[0].phrase);
        }
      }
    );
  });
};

const updateUserProfile = (cedula: string, photoUri: string | null, phrase: string | null) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE user_profile SET photoUri = ?, phrase = ? WHERE cedula = ?;`,
      [photoUri, phrase, cedula],
      () => {
        Alert.alert('Perfil actualizado', 'Tu perfil ha cambiado :)');
      }
    );
  });
};


export default function EditProfile({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [clave, setClave] = useState('');
  const user = useUser(cedula, clave);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedCedula = await AsyncStorage.getItem('cedula');
        const storedClave = await AsyncStorage.getItem('clave');
        console.log('Stored Cedula:', storedCedula);
        console.log('Stored Clave:', storedClave);

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
    const loadCedula = async () => {
      try {
        const storedCedula = await AsyncStorage.getItem('cedula');
        if (storedCedula) {
          setCedula(storedCedula);
          fetchUserProfile(storedCedula, setPhotoUri, setPhrase);
        } else {
          console.warn('Cedula no encontrada en AsyncStorage');
        }
      } catch (error) {
        console.error('Error recuperando cedula:', error);
      }
    };

    loadCedula();
  }, []);

  const handleSave = () => {
    if (cedula) {
      updateUserProfile(cedula, photoUri, phrase);
    } else {
      Alert.alert('Error', 'Cedula no disponible.');
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Cambio de clave',
      '¿Estás seguro de que deseas cambiar tu clave?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cambiar', onPress: () => updatePassword(newPassword) },
      ]
    );
  };

  const updatePassword = async (newClave: string) => {
    await fetch(`https://adamix.net/minerd/def/cambiar_clave.php?token=${user?.token}&clave_anterior=${clave}&clave_nueva=${newClave}`);
  };
  

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FDFEFE', '#0071BD']}
        style={styles.background}
      />
      <Text style={styles.headerText}>Actualiza tu perfil</Text>

      <View style={styles.profiledata}>
        <View style={styles.profileImgContainer}>
          <Image source={{ uri: photoUri || '../../assets/profileimage.png' }} style={styles.profileImg} />
          <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.cameraButton} 
            onPress={handlePickImage}
          >
            <Image
              source={require('../../assets/camera.png')}
              style={styles.cameraImage}
            />
          </TouchableOpacity>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Frase"
          value={phrase || ''}
          onChangeText={setPhrase}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={handleSave}>
          <Text style={styles.deleteButtonText}>Guardar</Text>
        </TouchableOpacity>
        <TextInput 
          style={styles.input} 
          placeholder="Nueva clave"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.changePasswordButtonText}>Cambiar clave</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Volver atrás</Text>
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  headerText: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#FDFEFE',
    fontSize: 32,
    fontFamily: 'Alata-Regular',
    lineHeight: 44,
  },
  profiledata: {
    flex: 1,
    marginTop: 115,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    marginHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#0071BD',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImgContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImg: {
    height: 110,
    width: 110,
    borderRadius: 55,
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
  changePasswordButton: {
    marginHorizontal: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  changePasswordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
