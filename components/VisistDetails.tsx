import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const VisitDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cayó un meteorito en la escuela</Text>
      <Text style={styles.subtitle}>Escuela Nacional Midway</Text>
      <Text style={styles.code}>Cod. 1608</Text>
      <Text style={styles.date}>12 de Agosto 2024</Text>
      <Text style={styles.description}>
        El 12 de agosto de 2024, un meteorito de 2 metros de diámetro impactó en la Escuela Nacional Midway, creando un cráter de 10 metros de ancho y 5 metros de profundidad en el patio central. La evacuación de estudiantes y personal, realizada en menos de 10 minutos, previno cualquier daño. Tras revisar todas las áreas y realizar inspecciones adicionales, se confirmó que todos están a salvo.
      </Text>
      <Text style={styles.director}>Director: Ramón Gómez Díaz</Text>
      <Text style={styles.cedula}>Cédula: 001-0246315-6</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Nota de voz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ubicación</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  code: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  director: {
    fontSize: 16,
    marginBottom: 5,
  },
  cedula: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
  });
