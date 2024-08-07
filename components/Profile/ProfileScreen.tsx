import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite/legacy';
import { useUser } from '../UserService';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase('userProfile.db');

const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT NOT NULL UNIQUE,
        photoUri TEXT,
        phrase TEXT
      );`
    );
  });
};

const ensureUserProfile = (cedula: string) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR IGNORE INTO user_profile (cedula) VALUES (?);`,
      [cedula]
    );
  });
};

const fetchUserProfile = (cedula: string, setPhotoUri: React.Dispatch<React.SetStateAction<string | null>>, setPhrase: React.Dispatch<React.SetStateAction<string | null>>) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT photoUri, phrase FROM user_profile WHERE cedula = ?`,
      [cedula],
      (_, { rows: { _array } }) => {
        if (_array.length > 0) {
          setPhotoUri(_array[0].photoUri);
          setPhrase(_array[0].phrase);
        } else {
          setPhotoUri(null);
          setPhrase(null);
        }
      }
    );
  });
};

const deleteUserProfile = (cedula: string, navigation: any) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM user_profile WHERE cedula = ?;`,
      [cedula],
      () => {
        Alert.alert('Usuario eliminado', 'Los datos del usuario han sido eliminados.');
        navigation.navigate('Login');
      }
      
    );
  });
};

export default function ProfileScreen({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [phrase, setPhrase] = useState<string | null>(null);
  const user = useUser(cedula, clave);

  useFocusEffect(
    useCallback(() => {
      if (cedula) {
        fetchUserProfile(cedula, setPhotoUri, setPhrase);
      }
    }, [cedula])
  );

  useEffect(() => {
    initializeDatabase(); // Initialize the database

    const loadCredentials = async () => {
      try {
        const storedCedula = await AsyncStorage.getItem('cedula');
        const storedClave = await AsyncStorage.getItem('clave');
        console.log('Stored Cedula:', storedCedula);
        console.log('Stored Clave:', storedClave);

        if (storedCedula !== null && storedClave !== null) {
          setCedula(storedCedula);
          setClave(storedClave);
          ensureUserProfile(storedCedula); // Ensure user profile exists in the database
        } else {
          console.warn('Credenciales no encontradas en AsyncStorage');
        }
      } catch (error) {
        console.error('Error recuperando credenciales:', error);
      }
    };

    loadCredentials();
  }, []);

  const confirmDeleteUser = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar todos los datos del usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => deleteUserProfile(cedula, navigation) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlegroup}>
        <Text style={styles.perfilText}>Perfil</Text>
        <TouchableOpacity 
          activeOpacity={0.5} 
          style={styles.editButton} 
          onPress={() => navigation.navigate('EditProfile', { cedula })}
        >
          <Image
            source={require('../../assets/edit.png')}
            style={styles.editImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profiledata}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.profileImg} />
        ) : (
          <Image source={require('../../assets/perfildefault.png')} style={styles.profileImg} />
        )}
        <Text style={styles.profileName}>{user?.nombre || 'Nombre'}</Text>
        <Text style={styles.profileID}>{cedula}</Text>
        <View style={styles.card}>
          <Text style={styles.TextCard}>{phrase || 'Edita y agrega una frase'}</Text>
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
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 33.12,
    color: '#17202A',
    fontFamily: 'Alata-Regular',
    flex: 1,
    marginLeft: 20,
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
