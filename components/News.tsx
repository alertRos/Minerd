import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

interface NewsItem {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    axios.get('https://remolacha.net/wp-json/wp/v2/posts?search=minerd')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const cleanText = (text: string) => {
    return text
      .replace(/<[^>]*>?/gm, '') // Eliminar etiquetas HTML
      .replace(/&[^;]+;/g, '') // Eliminar entidades HTML
      .replace(/(?:\.\s*|^)(read more|read more\.\s*)$/i, ''); // Eliminar "read more" al final del texto
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <View style={styles.newsItem}>
      <Text style={styles.title}>{cleanText(item.title.rendered)}</Text>
      <Text style={styles.excerpt}>{cleanText(item.excerpt.rendered)}</Text>
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(item.link)}>
        <Icon name="earth" size={16} color="#1E90FF" />
        <Text style={styles.buttonText}>Ver en la web</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/minerd.png')} style={{ width: 208, height: 43, marginTop: 38 }} />
      <View style={styles.body}>
        <Text style={styles.headerText}>Noticias</Text>
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          ListFooterComponent={<View style={{ height: 200 }} />}  // Espaciador para evitar que la última noticia quede cubierta
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  body: {
    paddingTop: 50,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    paddingHorizontal: 12,
  },
  list: {
    marginTop: 20,
  },
  newsItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F7F9F9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  excerpt: {
    marginTop: 8,
    fontSize: 14,
    color: '#6e6e6e',
  },
  button: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 7,
    alignSelf: 'flex-end', // Para mover el botón a la derecha
  },
  buttonText: {
    color: '#1E90FF',
    marginLeft: 4,
  },
});

export default News;