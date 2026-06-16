// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

export default function ProfileScreen() {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarEmoji}>👤</Text>
      </View>

      <Text style={styles.label}>Conta Ativa</Text>
      <Text style={styles.email}>{user?.email || "usuario@lume.com"}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardText}>✨ Obrigado por utilizar o Lume! Seus livros favoritos estão guardados de forma segura na nuvem do Firebase Firestore.</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => signOut(auth)}>
        <Text style={styles.logoutButtonText}>🚪 Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F7F2', padding: 24, alignItems: 'center', justifyContent: 'center' },
  avatarContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(125,132,113,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarEmoji: { fontSize: 40 },
  label: { fontSize: 12, color: '#9A9A8A', textTransform: 'uppercase', letterSpacing: 1, fontWeight: '600' },
  email: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginTop: 4, marginBottom: 30 },
  infoCard: { backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: 'rgba(125,132,113,0.15)', padding: 16, borderRadius: 14, marginBottom: 40, width: '100%' },
  infoCardText: { color: '#4A4A3F', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  logoutButton: { backgroundColor: '#cc4b4b', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  logoutButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});