import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AddVisit = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar visita</Text>
      <TextInput style={styles.input} placeholder="Título" />
      <TextInput style={styles.input} placeholder="Código de la institución" />
      <TextInput style={styles.input} placeholder="Nombre de la institución" />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Latitud" />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Longitud" />
      </View>
      <TextInput style={styles.input} placeholder="Cédula del director" />
      <TextInput style={styles.input} placeholder="Nombre del director" />
      <TextInput style={styles.input} placeholder="Comentario sobre la visita" multiline />

      {/* Agregar campos de imagen y audio */}
      <View style={styles.mediaRow}>
        <TouchableOpacity style={styles.mediaButton}>
          <FontAwesome name="camera" size={24} color="black" />
          <Text>Imagen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton}>
          <FontAwesome name="microphone" size={24} color="black" />
          <Text>Audio</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  mediaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mediaButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddVisit;
