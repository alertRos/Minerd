import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Visits: undefined;
  AddVisit: undefined;
  VisitDetails: undefined;
};

type VisitsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Visits'>;

type Visit = {
  id: string;
  date: string;
  title: string;
  institution: string;
  code: string;
  type: string;
};

const visitsData: Visit[] = [
  {
    id: '1',
    date: '12 de Agosto 2024',
    title: 'Cayó un meteorito en la escuela',
    institution: 'Escuela Nacional Midway',
    code: '1608',
    type: 'Inspección',
  },
  {
    id: '2',
    date: '03 de Julio 2024',
    title: 'Los maestros reprobaron la...',
    institution: 'Escuela Nacional Midway',
    code: '1608',
    type: 'Evaluación',
  },
  {
    id: '3',
    date: '26 de Junio 2024',
    title: 'Se encontró oro en el patio',
    institution: 'Escuela Infantil Bellota',
    code: '002',
    type: 'Inspección',
  },
];

const Visits = () => {
  const navigation = useNavigation<VisitsScreenNavigationProp>();

  const renderItem = ({ item }: { item: Visit }) => (
    <View style={styles.visitItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.institution}>{item.institution}</Text>
      <Text style={styles.code}>Cod. {item.code}</Text>
      <Text style={styles.type}>{item.type}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('VisitDetails')}>
        <Text style={styles.detailsButton}>Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={visitsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddVisit')}
      >
        <Text style={styles.addButtonText}>+</Text>
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
  visitItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  institution: {
    fontSize: 16,
    marginBottom: 5,
  },
  code: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    color: '#f00',
    marginBottom: 10,
  },
  detailsButton: {
    fontSize: 16,
    color: '#007bff',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 36,
    color: '#fff',
    lineHeight: 36,
  },
});

export default Visits;
