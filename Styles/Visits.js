import { StyleSheet } from 'react-native';

const StyleViews = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,

    
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
    
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  header: {
    fontSize: 35,
    color: '#FDFEFE',
    textAlign: 'center',
    fontWeight: 'bold',
    
  },
  dateCloseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 20,
    
  },
  date: {
    fontSize: 16,
    color: '#17202A',
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    color: '#495057',
    
  },
  locationLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#343a40',
    
  },
  locationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    
  },
  halfInput: {
    width: '48%',
    
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#343a40',
    
  },
  fileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    
  },
  fileButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#f8f9fa',
    
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    
    
  },
  Testt: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: '#fff', // Color de fondo para verificar la aplicación del estilo
    overflow: 'hidden', // Para recortar contenido
  }
});

export default StyleViews;
