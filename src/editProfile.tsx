import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.titlegroup}>
        <Text style={styles.perfil}>Perfil</Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.editButton}>
          <Image
            source={require('../assets/edit.png')}
            style={styles.editImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text>Contenido del perfil</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titlegroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 8,
    position: 'absolute',
    top: 60,
    width: '100%',
    justifyContent: 'space-between',
  },
  perfil: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 33.12,
    color: 'red',
    fontFamily: 'Alata-Regular',
    flex: 1,
    
  },
  editButton: {
    alignSelf: 'flex-end',
  },
  editImage: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});
