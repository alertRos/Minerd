import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FDFEFE', '#0071BD']}
        style={styles.background}
      />
      <Text style={styles.headerText}>Actualiza tu perfil</Text>
      
      <View style={styles.profiledata}>
        <View style={styles.profileImgContainer}>
          <Image source={require('../assets/profileimage.png')} style={styles.profileImg} />
          <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.cameraButton} 
            onPress={() => {}}
          >
            <Image
              source={require('../assets/camera.png')}
              style={styles.cameraImage}
            />
          </TouchableOpacity>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="User Name"
        />
        <TextInput 
          style={styles.input}
          placeholder="User LastName"
        />
        <TextInput 
          style={styles.input}
          placeholder="Matricula"
          keyboardType='numeric'
        />
        <View style={styles.card}>
          <Text style={styles.TextCard}>“Que Leny no toque mis diseños”</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
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
