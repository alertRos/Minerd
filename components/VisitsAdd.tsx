import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons para el ícono de cerrar
import StyleViews from '../Styles/Visits';

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

  const [fontsLoaded] = useFonts({
    Alata_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

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
    <TouchableOpacity>
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
        <TouchableOpacity style={StyleViews.fileButton}>
        <Image source={require('../assets/icons/image.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={StyleViews.fileButton}>
        <Image source={require('../assets/icons/headphones.png')} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={StyleViews.saveButton}>
        <Text style={StyleViews.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
}

export default VisitsCB;

