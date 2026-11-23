import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { api } from '../api/api';

export default function MeusPedidosScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get('/pedidos/meus')
      .then((res) => setPedidos(res.data))
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meus Pedidos</Text>
        <View style={{ width: 50 }} />
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Você ainda não realizou nenhum pedido.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.orderId}>Pedido #{item.id}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.itemsBox}>
                {item.itens.map((it, i) => (
                  <Text key={i} style={styles.itemLine}>
                    {it.quantidade}x {it.produto_nome}
                  </Text>
                ))}
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  R$ {Number(item.valor_total || 0).toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backText: { color: '#2563EB', fontWeight: '600', fontSize: 14 },
  title: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  list: { padding: 16 },
  empty: { textAlign: 'center', color: '#64748B', marginTop: 40 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: { fontWeight: '700', fontSize: 15, color: '#0F172A' },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: { color: '#2563EB', fontSize: 11, fontWeight: '700' },
  itemsBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    gap: 4,
  },
  itemLine: { fontSize: 13, color: '#334155' },
  totalLabel: { fontSize: 13, color: '#64748B' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#059669' },
});
