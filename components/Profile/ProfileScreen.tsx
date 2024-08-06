import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../UserService';
import { getPhotos } from '../data/db';

export default function ProfileScreen({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [phrase, setPhrase] = useState<string | null>(null);
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
    if (cedula && clave) {
      console.log('Fetching user with cedula and clave:', cedula, clave);
    }
  }, [cedula, clave]);

  useEffect(() => {
    const loadPhotosAndPhrase = async () => {
      try {
        const photos = await getPhotos();
        if (photos.length > 0) {
          setPhotoUri(photos[0].photo);
          setPhrase(photos[0].phrase);
        }
      } catch (error) {
        console.error('Error cargando fotos y frases:', error);
      }
    };

    loadPhotosAndPhrase();
  }, []);

  const deleteUser = async () => {
    Alert.alert('Usuario eliminado', 'Los datos del usuario han sido eliminados.');
    navigation.navigate('Login');
  };

  const confirmDeleteUser = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar todos los datos del usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: deleteUser },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlegroup}>
        <Text style={styles.perfilText}>Perfil</Text>
      </View>
      <View style={styles.profiledata}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.profileImg} />
        ) : (
          <Image source={require('../../assets/perfildefault.png')} style={styles.profileImg} />
        )}
        <Text style={styles.profileName}>{user?.nombre || 'Nombre'}</Text>
        <Text style={styles.profileName}>{user?.apellido || 'Apellido'}</Text>
        <Text style={styles.profileID}>{cedula}</Text>
        <View style={styles.card}>
          <Text style={styles.TextCard}>{phrase || 'Frase no disponible'}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteUser}>
          <Text style={styles.deleteButtonText}>Eliminar data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  titlegroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: 'absolute',
    top: 60,
    width: '100%',
    backgroundColor: '#fff',
  },
  perfilText: {
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 33.12,
    color: '#17202A',
    fontFamily: 'Alata-Regular',
    flex: 1,
    marginLeft: 20,
    textAlign:'center'
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage: {
    width: 24,
    height: 24,
  },
  profiledata: {
    alignItems: 'center',
    marginTop: 140,
  },
  profileImg: {
    height: 110,
    width: 110,
    borderRadius: 55,
    marginBottom: 16,
  },
  profileName: {
    fontFamily: 'Alata-Regular',
    fontSize: 32,
    lineHeight: 44,
  },
  profileID: {
    fontFamily: 'Alata-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: '#ABB2B9',
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#1E1E1E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
    width: '100%',
    maxWidth: 339,
    height: 163,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
