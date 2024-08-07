import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserService';
import * as DocumentPicker from 'expo-document-picker'
import MapView, { Marker } from 'react-native-maps';
import {Audio} from 'expo-av'

type VisitDetailsProps = {
  visit: Visit | null;
  onClose: () => void;
};

type Visit = {
  id: string;
  date: string;
  title: string;
  institution: string;
  code: string;
  type: string;
  motivo: string;
  foto_evidencia: string;
};

type Visita = {
  id: string;
  date: string;
  title: string;
  institution: string;
  code: string;
  type: string;
  motivo: string;
  foto_evidencia: string;
  cedula_director: string;
  comentario: string;
  latitud: string;
  longitud: string;
  fecha: string;
  hora: string;
  usuario_id: string;
  nota_voz: string;
};


const fetchVisitData = async (token: string, situacion_id: string): Promise<Visita | null> => {
  try {
    const response = await fetch(`https://adamix.net/minerd/def/situacion.php?token=${token}&situacion_id=${situacion_id}`);
    const result = await response.json();
    if (response.ok && result.datos) {
      return {
        id: result.datos.id,
        date: result.datos.fecha,
        title: result.datos.motivo,
        institution: result.datos.comentario,
        code: result.datos.codigo_centro,
        type: result.datos.motivo,
        motivo: result.datos.motivo,
        foto_evidencia: result.datos.foto_evidencia,
        cedula_director: result.datos.cedula_director,
        comentario: result.datos.comentario,
        latitud: result.datos.latitud,
        longitud: result.datos.longitud,
        fecha: result.datos.fecha,
        hora: result.datos.hora,
        usuario_id: result.datos.usuario_id,
        nota_voz: result.datos.nota_voz,
      };
    } else {
      console.error("Error fetching visit data:", result.mensaje);
      return null;
    }
  } catch (error) {
    console.error("Error fetching visit data:", error);
    return null;
  }
};

const MapPopOut = ({ visible, onClose, latitude, longitude }: { visible: boolean, onClose: () => void, latitude: number, longitude: number }) => {
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
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
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


const VisitDetails = ({ visit, onClose }: VisitDetailsProps) => {
  const [visita, setVisita] = useState<Visita | null>(null);
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const user = useUser(cedula, clave);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUri, setAudioUri] = useState('');
  const [sound, setSound] = useState(new Audio.Sound());

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
    if (user?.token && visit?.id) {
      const loadVisitData = async () => {
        const data = await fetchVisitData(user.token, visit.id);
        setVisita(data);
      };

      loadVisitData();
    }
  }, [user?.token, visit?.id]);

  if (!visit || !visita) return null;

  const uploadAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: ['audio/*'] });
    if (!result.canceled) {
      setAudioUri(result.assets[0].uri);
    }
  }

  const playAudio = async () => {
    if(!isPlaying){
      await sound.loadAsync({
          uri: visita.nota_voz
      })
      await sound.playAsync()
    }else{
      await sound.unloadAsync();
      await sound.stopAsync();
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "#0071BD" }}>
      <LinearGradient
        colors={["#FDFEFE", "#0071BD"]}
        style={styles.headerContainer}
      >
        <Image
          source={require("../assets/icons/minerd.png")}
          style={styles.LogoM}
        />
      </LinearGradient>
      <View style={styles.container}>
          <View style={styles.topRow}>
            <Text style={styles.date}>{visita?.fecha}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={32} color='#ABB2B9' />
            </TouchableOpacity>
          </View>
          <View style={styles.imageSection}>
            <Image source={{ uri: visita.foto_evidencia }} style={styles.visitPhoto} />
          </View>
          <Text style={styles.headerText}>{visita.title}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View>
          <Text style={styles.subHeaderText}>{visita?.institution}</Text>
          <Text style={styles.subHeaderText}>{visita?.code}</Text>
          </View>
          <Text style={styles.subHeaderTextType}>{visita?.type}</Text>
          </View>
          <View style={{marginTop:30}}>
          <Text style={styles.subHeaderTextTitles}>Acerca de la visita</Text>
          <Text style={styles.motivo}>{visita?.motivo}</Text>
          </View>
          <View style={{marginTop:30}}>
          <Text style={styles.subHeaderTextTitles}>Datos del director</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
          <View>
          <Text style={styles.subHeaderSubText}>Cedula</Text>
          <Text style={styles.directorData}>{visita?.cedula_director}</Text>
          </View>
          <View>
          <Text style={styles.subHeaderSubText}>Nombre</Text>
          <Text style={styles.directorData}>Nombre</Text>
          </View>
          </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
        {isPlaying == false ? (
          <TouchableOpacity style={styles.Notasdevoz} onPress={() => {playAudio(), setIsPlaying(true)}}>
            <Icon source={"play-outline"} size={28} color='#0071BD'></Icon>
            <Text style={styles.NotasdevozText}>Nota de voz</Text>
          </TouchableOpacity>          
          ):(
            <TouchableOpacity style={styles.Notasdevoz} onPress={() => {playAudio(), setIsPlaying(false)}}>
            <Icon source={"stop"} size={28} color='#0071BD'></Icon>
          <Text style={styles.NotasdevozText}>Nota de voz</Text>
          </TouchableOpacity>
          )}
        <TouchableOpacity style={styles.ubicacion} onPress={()=>setIsMapVisible(true)}>
            <Icon source={"map-marker-outline"} size={24} color='#ffff'></Icon>
          <Text style={styles.ubicacionText}>Ubicacion</Text>
        </TouchableOpacity>
        <MapPopOut visible={isMapVisible} onClose={() => setIsMapVisible(false)}
          latitude={parseFloat(visita.latitud)}
          longitude={parseFloat(visita.longitud)}/>
          </View>

        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F7F9F9",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 20,
    paddingBottom:40
  },
  headerText: {
    fontSize: 20,
    lineHeight:27,
    fontWeight: "400",
    color: "#17202A",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#ABB2B9",
  },
  subHeaderSubText: {
    fontSize: 14,
    color: "#17202A",
  },
  subHeaderTextTitles: {
    fontSize: 16,
    color: "#17202A",
  },
  motivo: {
    marginTop:10,
    fontSize: 14,
    color: "#ABB2B9",
  },
  directorData: {
    fontSize: 14,
    color: "#ABB2B9",
  },
  subHeaderTextType: {
    fontSize: 16,
    color: "#DC3545",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#17202A",
    marginLeft: 10,
  },
  date: {
    fontSize: 14,
    color: "#17202A",
    marginLeft: 10,
    lineHeight: 19.32
  },
  imageSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  visitPhoto: {
    width: 326,
    height: 182,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  noPhotoText: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
  },
  mapContainer: {
    marginTop: 20,
    backgroundColor: "#0071BD",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  mapText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#0071BD",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffff",
    fontSize: 16,
  },
  Notasdevoz:{
flexDirection:'row',
    marginTop: 20,
borderColor:'#0071BD',
borderWidth:1,
backgroundColor:'#fff',
width:155,
height:36,
borderRadius:5,
justifyContent:'center',
alignItems:'center'
  },
  NotasdevozText:{
    color: "#0071BD",
    fontSize: 16,
    textAlign:'center',
    fontWeight:'400'
  },
  ubicacion:{
    flexDirection:'row',
        marginTop: 20,
    borderColor:'#0071BD',
    borderWidth:1,
    backgroundColor:'#0071BD',
    width:155,
    height:36,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
      },
      ubicacionText:{
        color: "#ffff",
        fontSize: 16,
        textAlign:'center',
        fontWeight:'400'
      },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalCloseButton: {
    backgroundColor: "#0071BD",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  fullScreenMap: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  LogoM: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "stretch",
  },
});

export default VisitDetails;
