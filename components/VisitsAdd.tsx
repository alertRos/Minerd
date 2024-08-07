import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import StyleViews from '../assets/Visits';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserService';
import { useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const VisitsCB = () => {
  const [isReady, setIsReady] = useState(false);
  const [title, setTitle] = useState('');
  const [motivoCode, setMotivoCode] = useState('');
  const [institutionCode, setInstitutionCode] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [directorId, setDirectorId] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [audioUri, setAudioUri] = useState('');
  const [fontsLoaded] = useFonts({
    Alata_400Regular,
  });
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const navigation = useNavigation();
  const user = useUser(cedula, clave);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

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

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos insuficientes', 'Necesitamos acceso a tu galería para seleccionar una imagen.');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAudioUri(result.assets[0].uri);
    }
  };

  const registerVisit = async () => {
    const url = `https://adamix.net/minerd/minerd/registrar_visita.php?cedula_director=${directorId}&codigo_centro=${institutionCode}&motivo=${motivoCode}&foto_evidencia=${encodeURIComponent(imageUri)}&comentario=${encodeURIComponent(comment)}&nota_voz=${encodeURIComponent(audioUri)}&latitud=${latitude}&longitud=${longitude}&fecha=2024-08-14&hora=15:42&token=${user?.token}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Visita registrada exitosamente');
      } else {
        Alert.alert('Error', result.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al registrar la visita');
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <ScrollView style={{backgroundColor: '#0071BD'}}>
      <LinearGradient 
        colors={['#FDFEFE', '#0071BD']}
        style={StyleViews.headerContainer}
      >
        <Image source={require('../assets/icons/minerd.png')} style={StyleViews.logo} />
        <Text style={[StyleViews.header, { fontFamily: 'Alata_400Regular' }]}>Registrar visita</Text>
      </LinearGradient>
      <View style={StyleViews.Testt}>
        <View style={StyleViews.dateCloseRow}>
          <Text style={[StyleViews.date, { fontFamily: 'Alata_400Regular' }]}>14 de Agosto 2024 03:42 PM</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={35} color="#17202A" />
          </TouchableOpacity>
        </View>
        <View style={StyleViews.Inputs}>
          <TextInput 
            style={[StyleViews.input, { fontFamily: 'Alata_400Regular' }]} 
            placeholder="Título" 
            value={title} 
            onChangeText={setTitle} 
          />
          <TextInput 
            style={[StyleViews.input, { fontFamily: 'Alata_400Regular' }]} 
            placeholder="Motivo de la visita" 
            value={motivoCode} 
            onChangeText={setMotivoCode} 
          />
          <TextInput 
            style={[StyleViews.input, { fontFamily: 'Alata_400Regular' }]} 
            placeholder="Código de la institución" 
            value={institutionCode} 
            onChangeText={setInstitutionCode} 
          />
          <TextInput 
            style={[StyleViews.input, { fontFamily: 'Alata_400Regular' }]} 
            placeholder="Nombre de la institución" 
            value={institutionName} 
            onChangeText={setInstitutionName} 
          />
          <Text style={[StyleViews.locationLabel, { fontFamily: 'Alata_400Regular' }]}>
            Ubicación de la institución
          </Text>
          <View style={StyleViews.locationSection}>
            <TextInput 
              style={[StyleViews.input, StyleViews.halfInput, { fontFamily: 'Alata_400Regular' }]} 
              placeholder="Latitud" 
              value={latitude} 
              onChangeText={setLatitude} 
            />
            <TextInput 
              style={[StyleViews.input, StyleViews.halfInput, { fontFamily: 'Alata_400Regular' }]} 
              placeholder="Longitud" 
              value={longitude} 
              onChangeText={setLongitude} 
            />
          </View>
          <Text style={[StyleViews.subHeader, { fontFamily: 'Alata_400Regular' }]}>Datos del director</Text>
          <TextInput 
            style={[StyleViews.input, { fontFamily: 'Alata_400Regular' }]} 
            placeholder="Cédula" 
            value={directorId} 
            onChangeText={setDirectorId} 
          />
          <TextInput 
            style={[StyleViews.input, { fontFamily: 'Alata_400Regular' }]} 
            placeholder="Nombre" 
            value={directorName} 
            onChangeText={setDirectorName} 
          />
          <Text style={[StyleViews.subHeader, { fontFamily: 'Alata_400Regular' }]}>Detalles</Text>
          <TextInput 
            style={[StyleViews.input, { fontFamily: 'Alata_400Regular', height: 109, textAlign: "center" }]}  
            placeholder="Comentario sobre la visita..." 
            value={comment} 
            onChangeText={setComment} 
            multiline 
          />
          <View style={StyleViews.fileSection}>
            <TouchableOpacity style={StyleViews.fileButton} onPress={pickImage}>
                <Image source={require('../assets/icons/image.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={StyleViews.fileButton} onPress={pickAudio}>
              <Image source={require('../assets/icons/headphones.png')} />
            </TouchableOpacity>

          </View>
          <View style={StyleViews.imageSection}>
          {imageUri ? (
                <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
              ) : (
                <Image source={require('../assets/icons/image.png')} style={{width:450,height:350}}/>
              )}
          </View>
          <TouchableOpacity style={StyleViews.saveButton} onPress={registerVisit}>
            <Text style={StyleViews.saveButtonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VisitsCB;
