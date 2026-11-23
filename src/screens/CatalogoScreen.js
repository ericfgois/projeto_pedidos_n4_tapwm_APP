import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { api } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function CatalogoScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState({});
  const [observacao, setObservacao] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const { usuario, logout } = useContext(AuthContext);

  const carregarProdutos = async () => {
    setCarregando(true);
    try {
      const res = await api.get('/produtos');
      setProdutos(res.data);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar o cardápio.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const alterarQuantidade = (produtoId, delta) => {
    setCarrinho((prev) => {
      const atual = prev[produtoId] || 0;
      const nova = Math.max(0, atual + delta);
      const copia = { ...prev };
      if (nova === 0) {
        delete copia[produtoId];
      } else {
        copia[produtoId] = nova;
      }
      return copia;
    });
  };

  const totalItens = Object.values(carrinho).reduce((acc, q) => acc + q, 0);
  const valorTotal = produtos.reduce((acc, p) => {
    const qtd = carrinho[p.id] || 0;
    return acc + Number(p.preco || 0) * qtd;
  }, 0);

  const finalizarPedido = async () => {
    if (totalItens === 0) return;
    setEnviando(true);
    try {
      const itens = Object.entries(carrinho).map(([produto_id, quantidade]) => ({
        produto_id: Number(produto_id),
        quantidade,
      }));

      await api.post('/pedidos', { itens, observacao });

      setCarrinho({});
      setObservacao('');
      Alert.alert(
        'Pedido Enviado!',
        'Seu pedido foi recebido pela Doceria Hub Flow e já aparece no painel administrativo.',
        [
          { text: 'Ver Meus Pedidos', onPress: () => navigation.navigate('MeusPedidos') },
          { text: 'OK' },
        ]
      );
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.erro || 'Falha ao enviar pedido.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {usuario?.nome?.split(' ')[0]}</Text>
          <Text style={styles.headerTitle}>Monte seu Pedido</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.ordersBtn}
            onPress={() => navigation.navigate('MeusPedidos')}
          >
            <Text style={styles.ordersBtnText}>Meus Pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutBtnText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            totalItens > 0 ? (
              <View style={styles.obsContainer}>
                <Text style={styles.obsLabel}>Observação para a cozinha (opcional)</Text>
                <TextInput
                  style={styles.obsInput}
                  placeholder="Ex: Sem canela, enviar talheres..."
                  placeholderTextColor="#94A3B8"
                  value={observacao}
                  onChangeText={setObservacao}
                />
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const qtd = carrinho[item.id] || 0;
            return (
              <View style={[styles.card, qtd > 0 && styles.cardSelected]}>
                <View style={styles.cardInfo}>
                  <View style={styles.catBadge}>
                    <Text style={styles.catBadgeText}>{item.categoria}</Text>
                  </View>
                  <Text style={styles.prodName}>{item.nome}</Text>
                  {!!item.descricao && (
                    <Text style={styles.prodDesc} numberOfLines={2}>
                      {item.descricao}
                    </Text>
                  )}
                  <Text style={styles.prodPrice}>
                    R$ {Number(item.preco || 0).toFixed(2).replace('.', ',')}
                  </Text>
                </View>

                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={[styles.stepBtn, qtd === 0 && styles.stepBtnDisabled]}
                    onPress={() => alterarQuantidade(item.id, -1)}
                    disabled={qtd === 0}
                  >
                    <Text style={styles.stepBtnText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{qtd}</Text>

                  <TouchableOpacity
                    style={[styles.stepBtn, styles.stepBtnPlus]}
                    onPress={() => alterarQuantidade(item.id, 1)}
                  >
                    <Text style={styles.stepBtnPlusText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}

      {totalItens > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerItems}>
              {totalItens} {totalItens === 1 ? 'item selecionado' : 'itens selecionados'}
            </Text>
            <Text style={styles.footerTotal}>
              R$ {valorTotal.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={finalizarPedido}
            disabled={enviando}
          >
            <Text style={styles.checkoutBtnText}>
              {enviando ? 'Enviando...' : 'Finalizar Pedido'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  ordersBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ordersBtnText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  cardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#F8FAFF',
  },
  cardInfo: {
    flex: 1,
  },
  catBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
  },
  prodName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  prodDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  prodPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 8,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  stepBtnDisabled: {
    opacity: 0.4,
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  stepBtnPlus: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  stepBtnPlusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    minWidth: 18,
    textAlign: 'center',
  },
  obsContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  obsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  obsInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  footerItems: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  footerTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  checkoutBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 10,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
