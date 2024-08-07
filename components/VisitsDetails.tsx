import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

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
};

const VisitDetails = ({ visit, onClose }: VisitDetailsProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  if (!visit) return null; // or a loading spinner

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
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Detalles de la Visita</Text>
        <Text style={styles.subHeaderText}>
          Toda la información relacionada a la visita realizada
        </Text>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Ionicons name="calendar-outline" size={24} color="#0071BD" />
            <Text style={styles.cardText}>{visit.date}</Text>
          </View>
          <View style={styles.cardRow}>
            <Ionicons name="information-circle-outline" size={24} color="#0071BD" />
            <Text style={styles.cardText}>{visit.title}</Text>
          </View>
          <View style={styles.cardRow}>
            <Ionicons name="business-outline" size={24} color="#0071BD" />
            <Text style={styles.cardText}>{visit.institution}</Text>
          </View>
          <View style={styles.cardRow}>
            <Ionicons name="barcode-outline" size={24} color="#0071BD" />
            <Text style={styles.cardText}>{visit.code}</Text>
          </View>
          <View style={styles.cardRow}>
            <Ionicons name="document-text-outline" size={24} color="#0071BD" />
            <Text style={styles.cardText}>{visit.type}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.mapContainer}
        >
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
              title={visit.title}
              description={visit.institution}
            />
          </MapView>
          <Text style={styles.mapText}>Ver mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <MapView
              style={styles.fullScreenMap}
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
                title={visit.title}
                description={visit.institution}
              />
            </MapView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  LogoM: {
    height: 60,
    width: 200,
    resizeMode: "contain",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  mapContainer: {
    backgroundColor: "#0071BD",
    borderRadius: 10,
    overflow: "hidden",
    height: 200,
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapText: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "#0071BD",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: "#007bff",
  },
  fullScreenMap: {
    width: "100%",
    height: 300,
  },
});

export default VisitDetails;
