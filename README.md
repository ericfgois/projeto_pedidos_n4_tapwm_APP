# Doceria Hub Flow — App Mobile (React Native + Expo)

> Repositório oficial do Aplicativo Mobile para a entrega final da disciplina N4 / TAPWM.
> **Nome do repositório:** `projeto_pedidos_n4_tapwm_APP`

---

## 👥 Integrantes do Grupo e Divisão de Responsabilidades

| Integrante | Repositório GitHub / Serviço | Escopo Técnico |
| :--- | :--- | :--- |
| **Eric Fracassi de Gois** | `projeto_pedidos_n4_tapwm_APP` | Aplicativo Mobile em React Native + Expo com cadastro, login, catálogo, carrinho e compilação APK. |
| **Gabriel Xavier de Almeida** | `repo-api-doceria` | API Node.js + Express, autenticação JWT, controle de perfis (admin/cliente) e pedidos. |
| **Marcelo Enrique Korin** | `repo-web-admin` | Painel Web Administrativo em React + Vite para gestão de pedidos e catálogo. |
| **David Lima Alves** | `database/` no Supabase | Modelagem relacional, scripts DDL/DML (schema e seed) e conexão PostgreSQL. |

---

## 📱 Sobre o Aplicativo Mobile

O aplicativo mobile permite aos clientes da doceria:
1. **Cadastro e Autenticação:** Criação de nova conta de cliente e login com token JWT persistido localmente via `AsyncStorage`.
2. **Catálogo Interativo:** Visualização de todos os produtos cadastrados com filtragem por categoria, fotos, descrições e valores unitários formatados em moeda (R$).
3. **Carrinho de Compras:** Adição e remoção de itens dinamicamente, cálculo automático do subtotal e campo para inclusão de observações personalizadas para a cozinha.
4. **Meus Pedidos:** Histórico completo de pedidos realizados com acompanhamento de status em tempo real (`Pendente`, `Em Preparo`, `Concluído`).

---

## 🔑 Credenciais de Teste

Após rodar o script `02_seed.sql` no banco de dados Supabase:

- **Perfil Cliente (App Mobile):**
  - **E-mail:** `cliente@doceria.com`
  - **Senha:** `cliente123`

---

## ⚙️ Instalação e Execução Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18, 20 ou superior)
- Celular físico com o app **Expo Go** (Android/iOS) ou Emulador Android Studio

### Passo a passo
1. Clone este repositório:
   ```bash
   git clone https://github.com/ericfgois/projeto_pedidos_n4_tapwm_APP.git
   cd projeto_pedidos_n4_tapwm_APP
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o endereço da API:
   - Abra o arquivo `src/api/api.js` e verifique a variável `baseURL`.
   - Por padrão, está configurada para aceitar a variável de ambiente `EXPO_PUBLIC_API_URL` ou fallback para o IP local da sua máquina na rede local (ex: `http://192.168.0.69:3000`).
   - Se for testar no celular físico via Expo Go, certifique-se de que celular e computador estejam na mesma rede Wi-Fi e que o IP configurado seja o IPv4 da sua máquina.

4. Inicie o servidor Metro / Expo:
   ```bash
   npm start
   # ou
   npx expo start
   ```

5. Leia o QR Code no terminal através do aplicativo Expo Go no seu smartphone ou pressione `a` para rodar no emulador Android.

---

## 📦 Como Gerar o Arquivo APK (Build Android)

O projeto já contém o arquivo `eas.json` devidamente configurado com o perfil `preview` para gerar instaladores `.apk` diretamente pelo EAS (Expo Application Services):

```bash
# 1. Instalar o EAS CLI globalmente
npm install -g eas-cli

# 2. Fazer login na conta Expo
eas login

# 3. Configurar o build
eas build:configure

# 4. Iniciar a compilação do APK na nuvem
eas build --platform android --profile preview
```

Ao término, o Expo fornecerá um link direto para download do `.apk` pronto para instalação em qualquer aparelho Android.
