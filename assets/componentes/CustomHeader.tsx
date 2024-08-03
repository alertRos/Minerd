import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../minerds.png')}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    position:'absolute',
    top:30,
  },
  image: {
    width: 44,
    height: 35,
    marginRight: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 46,
    color: '#DC3545',
    fontFamily: 'Alata-Regular',
  },
});

export default CustomHeader;
