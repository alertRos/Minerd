import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

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

const MapPopOut = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              title={"Marker Title"}
              description={"Marker Description"}
            />
          </MapView>
        </View>
      </View>
    </Modal>
  );
};

const Visits = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const navigation = useNavigation<VisitsScreenNavigationProp>();

  const renderItem = ({ item }: { item: Visit }) => (
    <View style={styles.visitItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.institution}>{item.institution}</Text>
      <Text style={styles.code}>Cod. {item.code}</Text>
      <View style={styles.cardGroup}>
        <Text style={styles.typeE}>{item.type}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('VisitDetails')} style={styles.detailsButtonContainer}>
          <Text style={styles.detailsButton}>Detalles</Text>
          <Image 
            source={require('../assets/icons/rowBlue.png')} 
            style={styles.icono}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/minerd.png')} style={styles.logo} />
      <View style={styles.titleGroup}>
        <Text style={styles.perfilText}>Listado de visitas</Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.editButton} onPress={() => setIsMapVisible(true)}>
          <Image source={require('../assets/icons/map.png')} style={styles.editImage} />
        </TouchableOpacity>
      </View>
      <TextInput 
        mode="outlined"
        placeholder="Buscar"
        right={<TextInput.Icon icon={"magnify"} color={"gray"}/>}
        style={styles.input}
      />
      <FlatList
        data={visitsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddVisit')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <MapPopOut visible={isMapVisible} onClose={() => setIsMapVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  icono: {
    width: 20,
    height: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 44,
    width: '100%',
    marginVertical: 8,
    fontFamily: 'alata-regular',
    fontSize: 24,
  },
  perfilText: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 33.12,
    color: '#17202A',
    fontFamily: 'alata-regular',
    flex: 1,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage: {
    width: 24,
    height: 24,
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
  cardGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
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
  typeE: {
    fontSize: 16,
    color: '#F4D03F',
    textAlign: 'center',
  },
  typeI: {
    fontSize: 16,
    color: '#f00',
    textAlign: 'center',
  },
  detailsButtonContainer: {
    borderColor: '#0071BD', // Borde azul
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  detailsButton: {
    fontSize: 16,
    color: '#007bff',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    backgroundColor: '#DC3545',
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 34,
    color: '#fff',
  },
  flatListContent: {
    paddingBottom: 80, // Ajusta este valor según el tamaño de tu bottom navbar
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  mapImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: 300,
  },
});

export default Visits;
