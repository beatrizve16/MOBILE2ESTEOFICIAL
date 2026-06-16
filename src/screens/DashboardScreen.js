// src/screens/DashboardScreen.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useBooksAPI } from '../hooks/useBooksAPI';

export default function DashboardScreen({ navigation }) {
  const { books, loading } = useBooksAPI('literatura'); 

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7D8471" />
        <Text style={{ marginTop: 10 }}>Carregando livros da API...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Livros Disponíveis na API</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { book: item })}>
            <Image source={{ uri: item.coverImage || 'https://via.placeholder.com/150' }} style={styles.cover} />
            <View style={styles.info}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F7F2', padding: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F7F2' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#1A1A1A' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10, elevation: 2 },
  cover: { width: 50, height: 75, borderRadius: 5 },
  info: { marginLeft: 15, justifyContent: 'center', flex: 1 },
  bookTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  bookAuthor: { fontSize: 14, color: '#666' }
});