# 📱 Doceria Hub Flow — App Mobile

> Projeto N4 — Turma TAPWM | Fatec  
> Sistema de pedidos para doceria, com catálogo de produtos e acompanhamento de pedidos em tempo real.

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Eric Gois | 📱 App Mobile (React Native / Expo) | [@ericfgois](https://github.com/ericfgois) |
| Gabriel Almeida | ⚙️ API REST (Node.js / Express) | [@GabrielXAlmeida](https://github.com/GabrielXAlmeida) |
| Marcelo Korin | 🌐 Web Admin (React / Vite) | [@MarceloKorin](https://github.com/MarceloKorin) |
| David | 🗄️ Banco de Dados (MySQL) | — |

---

## 🔗 Repositórios do Projeto

| Parte | Repositório |
|-------|-------------|
| 📱 Mobile (este) | [projeto_pedidos_n4_tapwm_APP](https://github.com/ericfgois/projeto_pedidos_n4_tapwm_APP) |
| ⚙️ API | [projeto_pedidos_n4_tapwm_API](https://github.com/GabrielXAlmeida/projeto_pedidos_n4_tapwm_API) |
| 🌐 Web Admin | [projeto_pedidos_n4_tapwm_WEB](https://github.com/MarceloKorin/projeto_pedidos_n4_tapwm_WEB) |

---

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/) 0.76
- [Expo](https://expo.dev/) ~52
- [Expo Router](https://expo.github.io/router/) (navegação)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (persistência local)
- [React Native Screens](https://github.com/software-mansion/react-native-screens)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/client) (app no celular) **ou** emulador Android/iOS
- API rodando localmente (veja o repo da API)

---

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/ericfgois/projeto_pedidos_n4_tapwm_APP.git
cd projeto_pedidos_n4_tapwm_APP
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a URL da API

Crie um arquivo `.env` na raiz do projeto:
```env
EXPO_PUBLIC_API_URL=http://<IP_DA_MAQUINA_COM_API>:3000
```
> **Dica:** Se estiver rodando no emulador Android, use `http://10.0.2.2:3000`. No dispositivo físico, use o IP local da máquina (ex: `192.168.0.10:3000`).

### 4. Inicie o app
```bash
npx expo start
```

Escaneie o QR code com o **Expo Go** ou pressione `a` para abrir no emulador Android.

---

## 📲 Instalar o APK (Android)

Baixe e instale o APK compilado diretamente no dispositivo Android:

1. Transfira o arquivo `DoceriaHubFlow.apk` para o celular
2. Habilite **"Fontes desconhecidas"** nas configurações do Android
3. Abra o arquivo e instale

---

## 🔐 Credenciais de Teste

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Cliente (Mobile) | `cliente@doceria.com` | `cliente123` |
| Admin (Web) | `admin@doceria.com` | `admin123` |

---

## 📋 Funcionalidades

- [x] Cadastro e login de clientes
- [x] Catálogo de produtos com preço e imagem
- [x] Realizar pedidos
- [x] Acompanhar status dos pedidos em tempo real
- [x] Histórico de pedidos do usuário
- [x] Logout

---

## 📁 Estrutura do Projeto

```
projeto_pedidos_n4_tapwm_APP/
├── src/
│   ├── api/          # Configuração da API (axios)
│   ├── context/      # Contextos React (Auth)
│   └── screens/      # Telas do app
│       ├── LoginScreen.js
│       ├── RegisterScreen.js
│       ├── CatalogoScreen.js
│       ├── MeusPedidosScreen.js
│       └── ...
├── assets/           # Imagens e ícones
├── app.json          # Configuração do Expo
├── eas.json          # Configuração de build
└── package.json
```

---

## 📄 Licença

Projeto acadêmico — Fatec · N4 · TAPWM · 2026
