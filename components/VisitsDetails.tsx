import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const VisitDetails = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/minerd.png')} style={{ width: 208, height: 43, marginTop: 38 }} />
      <Text style={styles.date}>12 de Agosto 2024 11:00 AM</Text>
      <Image source={require('../assets/meteorito.png')} style={styles.image} />
      <Text style={styles.title}>Cayó un meteorito en la escuela</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Escuela Nacional Midway</Text>
        <Text style={styles.inspection}>● Inspección</Text>
      </View>
      <Text style={styles.code}>Cod. 1608</Text>
      <Text style={styles.sectionTitle}>Acerca de la visita</Text>
      <Text style={styles.description}>
        El 12 de agosto de 2024, un meteorito de 2 metros de diámetro impactó en la Escuela Nacional Midway, creando un cráter de 10 metros de ancho y 5 metros de profundidad en el patio central. El estruendo inicial provocó pánico y una rápida evacuación de estudiantes y personal, resultando en varias lesiones leves, pero todos están bien.
      </Text>
      <Text style={styles.sectionTitle}>Datos del director</Text>
      <View style={styles.directorContainer}>
        <View style={styles.directorInfo}>
          <Text style={styles.directorTitle}>Cédula</Text>
          <Text style={styles.directorInfoText}>001-0246315-0</Text>
        </View>
        <View style={styles.directorInfo}>
          <Text style={styles.directorTitle}>Nombre</Text>
          <Text style={styles.directorInfoText}>Ramón Gómez Díaz</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.voiceButton}>
          <Icon name="play" size={16} color="#1E90FF" />
          <Text style={styles.voiceButtonText}>Nota de voz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationButton}>
          <Icon name="location" size={16} color="#fff" />
          <Text style={styles.locationButtonText}>Ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F7F9F9',
  },
  date: {
    fontSize: 16,
    color: '#17202A',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  inspection: {
    fontSize: 14,
    color: 'orange',
    marginLeft: 10,
  },
  code: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#6e6e6e',
    marginBottom: 10,
  },
  directorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  directorInfo: {
    flex: 1,
    marginRight: 10,
  },
  directorTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#17202A',
  },
  directorInfoText: {
    fontSize: 14,
    color: '#6e6e6e',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  voiceButtonText: {
    color: '#1E90FF',
    marginLeft: 4,
    fontSize: 16,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 7,
    backgroundColor: '#1E90FF',
  },
  locationButtonText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 16,
  },
});

export default VisitDetails;
