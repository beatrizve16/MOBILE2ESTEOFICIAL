// src/navigation/AppNavigator.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DetailsScreen from './../screens/DetailsScreen'; 
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      screenOptions={{ 
        headerStyle: { 
          backgroundColor: '#7D8471', 
          elevation: 0,
          shadowOpacity: 0,
        }, 
        headerTintColor: '#fff',
        drawerActiveTintColor: '#7D8471',
        drawerInactiveTintColor: '#4A4A3F',
        drawerStyle: {
          backgroundColor: '#F9F7F2',
        }
      }}
    >
      <Drawer.Screen 
        name="Início" 
        component={DashboardScreen} 
        options={{ title: 'Lume App 📗' }}
      />
      <Drawer.Screen 
        name="Perfil / Configurações" 
        component={ProfileScreen} 
        options={{ title: 'Meu Perfil' }}
      />
    </Drawer.Navigator>
  );
}


export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    
    return unsubscribe;
  }, [initializing]);

  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{ 
              headerShown: true, 
              title: 'Detalhes do Livro',
              headerStyle: { backgroundColor: '#F9F7F2', elevation: 0, shadowOpacity: 0 },
              headerTintColor: '#1A1A1A'
            }} 
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}