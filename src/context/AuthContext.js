import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      try {
        const savedToken = await AsyncStorage.getItem('user_token');
        const savedUser = await AsyncStorage.getItem('user_data');
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUsuario(JSON.parse(savedUser));
        }
      } finally {
        setCarregandoSessao(false);
      }
    }
    carregarSessao();
  }, []);

  const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha });
    const { token: newToken, usuario: userData } = response.data;
    await AsyncStorage.setItem('user_token', newToken);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
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
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    setToken(newToken);
    setUsuario(userData);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['user_token', 'user_data']);
    setToken(null);
    setUsuario(null);
  };

  if (carregandoSessao) return null;

  return (
    <AuthContext.Provider value={{ token, usuario, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}