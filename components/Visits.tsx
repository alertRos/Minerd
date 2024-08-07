import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useUser } from './UserService';
import VisitDetails from './VisitsDetails';
import { Icon } from 'react-native-paper';

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
  foto_evidencia: string;
  motivo: string;
};

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
          <TouchableOpacity onPress={onClose} style={{width: 200, height: 40,  marginTop: 20, borderRadius: 12, backgroundColor: '#DC3545', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Visits = () => {
  const [visitsData, setVisitsData] = useState<Visit[]>([]);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const navigation = useNavigation<VisitsScreenNavigationProp>();
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [token, setToken] = useState('');
  const user = useUser(cedula, clave);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedCedula = await AsyncStorage.getItem('cedula');
        const storedClave = await AsyncStorage.getItem('clave');
        if (storedCedula !== null && storedClave !== null) {
          setCedula(storedCedula);
          setClave(storedClave);
        } else {
          console.warn('Credenciales no encontradas en AsyncStorage');
        }
      } catch (error) {
        console.error('Error recuperando credenciales:', error);
      }
    };

    loadCredentials();
  }, []);

  useEffect(() => {
    if (user?.token) {
      setToken(user.token);
    }
  }, [user?.token]);

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching data...');
      if (token) {
        fetchVisitsData();
      }
    }, [token])
  );

  const fetchVisitsData = async () => {
    try {
      const response = await axios.get(`https://adamix.net/minerd/def/situaciones.php?token=${token}`);
      const data = response.data.datos;

      if (data && Array.isArray(data)) {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          date: item.fecha,
          title: item.motivo,
          institution: item.codigo_centro,
          code: item.cedula_director,
          type: item.motivo,
          foto_evidencia: item.photo,
          motivo: item.motivo
        }));
        setVisitsData(formattedData);
      } else {
        setVisitsData([]);
      }

    } catch (error) {
      console.error('Error:', error);
      setVisitsData([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchVisitsData();
    }, [token])
  );

  const renderItem = ({ item }: { item: Visit }) => (
    <View style={styles.visitItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.institution}>{item.institution}</Text>
      <Text style={styles.code}>Cod. {item.code}</Text>
      <View style={styles.cardGroup}>
        <Text style={styles.typeE}>{item.type}</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedVisit(item);
            setIsModalVisible(true);
          }}
          style={styles.detailsButtonContainer}
        >
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
      <Icon source={'plus'} size={32} color='#ffff'></Icon>
      </TouchableOpacity>
      <MapPopOut visible={isMapVisible} onClose={() => setIsMapVisible(false)} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <VisitDetails visit={selectedVisit} onClose={() => setIsModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  perfilText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0071BD',
  },
  editButton: {
    backgroundColor: '#0071BD',
    padding: 10,
    borderRadius: 50,
  },
  editImage: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 130
  },
  visitItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  institution: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  code: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  cardGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  typeE: {
    fontSize: 14,
    color: '#0071BD',
    fontWeight: 'bold',
  },
  detailsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0071BD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  detailsButton: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
  },
  icono: {
    width: 15,
    height: 15,
    tintColor: '#fff',
  },
  addButton: {
    backgroundColor: '#DC3545',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 36,
    color: '#fff',
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
  map: {
    width: '100%',
    height: 300,
  },
});

export default Visits;
