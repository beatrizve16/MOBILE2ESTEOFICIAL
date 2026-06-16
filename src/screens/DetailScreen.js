// src/screens/DetailsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';

export default function DetailsScreen({ route }) {
  const { book } = route.params;
  const [saving, setSaving] = useState(false);

  const handleFavorite = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    setSaving(true);
    try {
      await setDoc(doc(db, "users", userId, "favorites", book.id), {
        title: book.title,
        author: book.author,
        coverImage: book.coverImage,
        savedAt: new Date().toISOString()
      });
      Alert.alert("Favoritado!", `"${book.title}" foi salvo nos seus favoritos do Firebase.`);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível sincronizar com o Firestore.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        {book.coverImage ? (
          <Image source={{ uri: book.coverImage }} style={styles.cover} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}><Text style={styles.placeholderText}>📗</Text></View>
        )}
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>📖 Median: {book.totalPages} pág.</Text>
        </View>
      </View>

      <Text style={styles.descriptionTitle}>Sinopse / Introdução</Text>
      <Text style={styles.description}>{book.description}</Text>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.favoriteButtonText}>⭐ Salvar no Firestore</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F7F2' },
  content: { padding: 24, alignItems: 'center' },
  imageContainer: { width: 140, height: 210, borderRadius: 14, overflow: 'hidden', backgroundColor: 'rgba(125,132,113,0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4, marginBottom: 24 },
  cover: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', textAlign: 'center', marginBottom: 6 },
  author: { fontSize: 16, color: '#7D8471', fontWeight: '500', marginBottom: 16 },
  badgeRow: { flexDirection: 'row', marginBottom: 24 },
  badge: { backgroundColor: 'rgba(125,132,113,0.12)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#5C6355', fontSize: 12, fontWeight: '600' },
  descriptionTitle: { alignSelf: 'flex-start', fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 8 },
  description: { fontSize: 15, color: '#4A4A3F', lineHeight: 22, textAlign: 'justify', marginBottom: 30 },
  favoriteButton: { backgroundColor: '#C9A96E', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#C9A96E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 },
  favoriteButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});