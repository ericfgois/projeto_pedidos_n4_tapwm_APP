import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://projeto-pedidos-n4-tapwm-api.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});