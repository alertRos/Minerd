import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getUser, User, deleteAllData } from '../MinerdDb';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId !== undefined) {
          const fetchedUser = await getUser(userId);
          
          console.log('Fetched user:', fetchedUser); // Verifica los datos recibidos
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    setUserId();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (!user) {
    return <Text>No se encontró el usuario.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlegroup}>
        <Text style={styles.perfilText}>Perfil</Text>
        <TouchableOpacity 
          activeOpacity={0.5} 
          style={styles.editButton} 
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Image
            source={require('../../assets/edit.png')}
            style={styles.editImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profiledata}>
        <Image 
          source={{ uri: user.foto || 'data:image/png;base64,' }} 
          style={styles.profileImg} 
        />
        <Text style={styles.profileName}>{user.nombre || 'Nombre del Usuario'}</Text>
        <Text style={styles.profileName}>{user.id || 'Nombre del Usuario'}</Text>
        <Text style={styles.profileName}>{user.apellido || 'Apellido del Usuario'}</Text>
        <Text style={styles.profileID}>{user.matricula || 'ID del Usuario'}</Text>
        <View style={styles.card}>
          <Text style={styles.TextCard}>{user.frase || 'Frase del Usuario'}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAllData()}>
          <Text style={styles.deleteButtonText}>Eliminar data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default ProfileScreen;
