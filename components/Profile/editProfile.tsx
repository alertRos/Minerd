import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getUser, updateUser, User } from '../MinerdDb'; // Asegúrate de que updateUser esté implementado en MinerdDb
import { useNavigation, useRoute } from '@react-navigation/native';

type EditProfileRouteParams = {
  userId: number;
};

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [frase, setFrase] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  
  const { userId } = route.params as EditProfileRouteParams;

  useEffect(() => {
    if (userId === null || userId === undefined) return;

    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
          setName(fetchedUser.nombre);
          setLastName(fetchedUser.apellido);
          setMatricula(fetchedUser.matricula);
          setFrase(fetchedUser.frase);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    if (user && userId !== null) {
      try {
        await updateUser(userId, name, lastName, matricula, frase);
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        navigation.goBack(); // Regresa a la pantalla anterior
      } catch (error) {
        console.error('Error updating user data:', error);
        Alert.alert('Error', 'No se pudo actualizar el perfil');
      }
    }
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FDFEFE', '#0071BD']}
        style={styles.background}
      />
      <Text style={styles.headerText}>Actualiza tu perfil</Text>
      
      <View style={styles.profiledata}>
        <View style={styles.profileImgContainer}>
          <Image source={require('../../assets/profileimage.png')} style={styles.profileImg} />
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
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
        />
        <TextInput 
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Apellido"
        />
        <TextInput 
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Matrícula"
          keyboardType='numeric'
        />
        <View style={styles.card}>
          <TextInput 
            style={styles.TextCard}
            value={frase}
            onChangeText={setFrase}
            placeholder="Frase"
            multiline
            textAlignVertical="top"
          />
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleSave}>
          <Text style={styles.deleteButtonText}>Guardar</Text>
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
});
