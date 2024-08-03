import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const News = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/minerd.png')} style={{width:208, height: 43, marginTop: 38}}/>
      <View style={styles.body}>
        <Text style={{color: 'red', fontWeight: 'bold',fontSize: 25, textAlign: 'center'}}>Pon aquí lo que te toca chica superpoderosa 👁️🫦👁️💅</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  body:{
    paddingTop: 40
  }
});

export default News