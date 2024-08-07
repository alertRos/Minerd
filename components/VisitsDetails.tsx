import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-paper';

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
  motivo:string;
  foto_evidencia: string;
};

const VisitDetails = ({ visit, onClose }: VisitDetailsProps) => {
  if (!visit) return null;

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
            <Text style={styles.date}>{visit.date}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={32} color='#ABB2B9' />
            </TouchableOpacity>
          </View>
          <View style={styles.imageSection}>
              <Image source={require('../assets/icons/fotodetalles.png')} style={styles.visitPhoto} />

          </View>
          <Text style={styles.headerText}>{visit.title}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View>
          <Text style={styles.subHeaderText}>{visit.institution}</Text>
          <Text style={styles.subHeaderText}>{visit.code}</Text>
          </View>
          <Text style={styles.subHeaderTextType}>{visit.type}</Text>
          </View>
          <View style={{marginTop:30}}>
          <Text style={styles.subHeaderTextTitles}>Acerca de la visita</Text>
          <Text style={styles.motivo}>El 12 de agosto de 2024, un meteorito de 2 metros de diámetro impactó en la Escuela Nacional Midway, creando un cráter de 10 metros de ancho y 5 metros de profundidad en el patio central. El estruendo inicial provocó pánico y una rápida evacuación de estudiantes y personal, resultando en varias lesiones leves, pero todos están bien.</Text>
          </View>
          <View style={{marginTop:30}}>
          <Text style={styles.subHeaderTextTitles}>Datos del director</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
          <View>
          <Text style={styles.subHeaderSubText}>Cedula</Text>
          <Text style={styles.directorData}>001-06452012-9</Text>
          </View>
          <View>
          <Text style={styles.subHeaderSubText}>Nombre</Text>
          <Text style={styles.directorData}>Yami Yami</Text>
          </View>
          </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
          <TouchableOpacity style={styles.Notasdevoz} onPress={onClose}>
            <Icon source={"play-outline"} size={28} color='#0071BD'></Icon>
          <Text style={styles.NotasdevozText}>Nota de voz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ubicacion} onPress={onClose}>
            <Icon source={"map-marker-outline"} size={24} color='#ffff'></Icon>
          <Text style={styles.ubicacionText}>Ubicacion</Text>
        </TouchableOpacity>
          </View>

        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#F7F9F9",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 20,
    paddingBottom:20
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
