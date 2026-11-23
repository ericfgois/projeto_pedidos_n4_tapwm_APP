import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Permite configurar via variável de ambiente (Expo SDK) ou fallback para o IPv4 local da máquina
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.69:3000';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
