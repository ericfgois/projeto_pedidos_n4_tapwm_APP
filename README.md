# 📱 Doceria Hub Flow — App Mobile

> Projeto N4 — Turma TAPWM | Fatec  
> Sistema de pedidos para doceria, com catálogo de produtos, observações para a cozinha e acompanhamento de pedidos em tempo real.

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Eric Gois | 📱 App Mobile (React Native / Expo) | [@ericfgois](https://github.com/ericfgois) |
| Gabriel Almeida | ⚙️ API REST (Node.js / Express) | [@GabrielXAlmeida](https://github.com/GabrielXAlmeida) |
| Marcelo Korin | 🌐 Web Admin (React / Vite) | [@MarceloKorin](https://github.com/MarceloKorin) |
| David Lima Alves | 🗄️ Banco de Dados (PostgreSQL / Supabase) | — |

---

## 🔗 Repositórios do Projeto

| Parte | Repositório |
|-------|-------------|
| 📱 Mobile (este) | [projeto_pedidos_n4_tapwm_APP](https://github.com/ericfgois/projeto_pedidos_n4_tapwm_APP) |
| ⚙️ API | [projeto_pedidos_n4_tapwm_API](https://github.com/GabrielXAlmeida/projeto_pedidos_n4_tapwm_API) |
| 🌐 Web Admin | [projeto_pedidos_n4_tapwm_WEB](https://github.com/MarceloKorin/projeto_pedidos_n4_tapwm_WEB) |

---

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/) & [Expo SDK](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) (`@react-navigation/native` e `@react-navigation/native-stack`)
- [Axios](https://axios-http.com/) (requisições HTTP com interceptor JWT e *timeout* de 60s)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (persistência local de sessão)
- [React Native Screens](https://github.com/software-mansion/react-native-screens)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)

---

## 🔐 Credenciais de Teste (Importante)

> ⚠️ **Atenção ao fazer login no app:** Os campos da tela de login vêm com um e-mail e senha antigos pré-escritos. **Apague o conteúdo dos dois campos** e preencha com as credenciais válidas abaixo (ou crie uma nova conta clicando em **"Cadastre-se"**):

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Cliente (Mobile) | `cliente3@doceria.com` | `cli123` |
| Admin (Web) | `admin@doceria.com` | `admin123` |

> **Nota sobre o servidor (Render):** A API já está hospedada online (`https://projeto-pedidos-n4-tapwm-api.onrender.com`). Como utiliza plano gratuito, caso esteja em hibernação, o primeiro login pode levar de **30 a 50 segundos** para responder.

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/client) instalado no celular Android/iOS **ou** dispositivo Android para instalar o `.apk`

---

## 🚀 Como Executar (Desenvolvimento)

### 1. Clone o repositório
```bash
git clone https://github.com/ericfgois/projeto_pedidos_n4_tapwm_APP.git
cd projeto_pedidos_n4_tapwm_APP
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a URL da API (Opcional)

O aplicativo já aponta automaticamente para a API online no Render. Caso queira apontar para outra URL, crie um arquivo `.env` na raiz do projeto (baseado no `.env.example`):
```env
EXPO_PUBLIC_API_URL=https://projeto-pedidos-n4-tapwm-api.onrender.com
```

### 4. Inicie o app
```bash
npx expo start --clear
```
*(Em redes restritas ou GitHub Codespaces, utilize `npx expo start --tunnel --clear`).*

Escaneie o QR code com o **Expo Go** no celular.

---

## 📲 Instalar o APK (Android)

Para testar diretamente no celular sem ambiente de desenvolvimento:

1. Transfira o arquivo `DoceriaHubFlow.apk` (presente no pacote de entrega) para o celular Android
2. Habilite **"Instalar apps desconhecidos"** nas configurações do Android quando solicitado
3. Abra o arquivo e conclua a instalação
4. Na tela de login, **apague os dados pré-preenchidos** e entre com `cliente3@doceria.com` / `cli123`

---

## 📋 Funcionalidades

- [x] Cadastro e login de clientes com persistência automática de sessão
- [x] Catálogo de produtos organizado por categoria, descrição e preço
- [x] Carrinho dinâmico com seletor de quantidades e cálculo automático do total
- [x] Campo de observação opcional para a cozinha ao finalizar o pedido
- [x] Histórico e acompanhamento de status dos pedidos (*pull-to-refresh* puxando a tela para baixo)
- [x] Logout

---

## 📁 Estrutura do Projeto

```
projeto_pedidos_n4_tapwm_APP/
├── src/
│   ├── api/
│   │   └── api.js              # Configuração do Axios, URL da API e interceptor JWT
│   ├── context/
│   │   └── AuthContext.js      # Gerenciamento e persistência de autenticação
│   └── screens/
│       ├── LoginScreen.js      # Tela de login
│       ├── RegisterScreen.js   # Tela de cadastro de cliente
│       ├── CatalogoScreen.js   # Cardápio, carrinho e envio de pedidos
│       └── MeusPedidosScreen.js # Histórico e status dos pedidos
├── App.js                      # Configuração de rotas (React Navigation)
├── app.json                    # Configuração do Expo
├── eas.json                    # Perfis de build (APK)
├── .env.example                # Exemplo de variável de ambiente
└── package.json
```

---

## 📄 Licença

Projeto acadêmico — Fatec · N4 · TAPWM · 2026