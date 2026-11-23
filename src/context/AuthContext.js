import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha });
    const { token: newToken, usuario: userData } = response.data;
    await AsyncStorage.setItem('user_token', newToken);
    setToken(newToken);
    setUsuario(userData);
  };

  const registrar = async (nome, email, senha) => {
    const response = await api.post('/auth/register', {
      nome,
      email,
      senha,
      perfil: 'cliente',
    });
    const { token: newToken, usuario: userData } = response.data;
    await AsyncStorage.setItem('user_token', newToken);
    setToken(newToken);
    setUsuario(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user_token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
