# 📗 Lume App

Aplicativo mobile de biblioteca pessoal desenvolvido com **React Native + Expo**, integrando a API pública do Open Library e o Firebase para autenticação e persistência de dados.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Configuração do Firebase](#configuração-do-firebase)
- [Como Executar](#como-executar)
- [Telas e Navegação](#telas-e-navegação)
- [Requisitos Técnicos Atendidos](#requisitos-técnicos-atendidos)
- [Decisões de Projeto](#decisões-de-projeto)

---

## Sobre o Projeto

O **Lume** é um aplicativo de catalogação de livros que permite ao usuário explorar obras literárias buscadas em tempo real na API pública do [Open Library](https://openlibrary.org/), visualizar detalhes de cada livro e salvá-los como favoritos no Firebase Firestore, vinculados à sua conta pessoal.

---

## Funcionalidades

- Login e cadastro de conta com email e senha via Firebase Authentication
- Listagem de livros buscados na API do Open Library
- Visualização dos detalhes de cada livro (título, autor, capa, sinopse, número de páginas)
- Salvamento de livros favoritos no Firebase Firestore por usuário
- Menu lateral (Drawer) com navegação entre Início e Perfil
- Tela de perfil exibindo o email da conta ativa e opção de logout
- Indicador de carregamento durante requisições à API

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React Native | 0.85+ | Framework principal |
| Expo | 56+ | Ambiente de desenvolvimento |
| React Navigation | 7+ | Navegação entre telas |
| Firebase Authentication | 12+ | Login e cadastro de usuários |
| Firebase Firestore | 12+ | Armazenamento de favoritos |
| AsyncStorage | 3+ | Persistência local da sessão |
| Open Library API | — | Fonte pública de dados de livros |

---

## Estrutura de Pastas

```
lume-app/
├── App.js
├── firebaseConfig.js         # ← copie para src/services/
├── package.json
└── src/
    ├── components/
    │   └── BookCard.js       # Componente reutilizável de card de livro
    ├── hooks/
    │   └── useBooksAPI.js    # Custom hook para consumo da Open Library API
    ├── navigation/
    │   └── AppNavigator.js   # Stack + Drawer Navigation
    ├── screens/
    │   ├── LoginScreen.js    # Tela de login e cadastro
    │   ├── DashboardScreen.js# Tela principal com lista de livros
    │   ├── DetailsScreen.js  # Tela de detalhes do livro
    │   └── ProfileScreen.js  # Tela de perfil e logout
    └── services/
        └── firebaseConfig.js # Inicialização do Firebase
```

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Aplicativo **Expo Go** no celular (Android ou iOS) — ou um emulador configurado
- Uma conta no [Firebase](https://console.firebase.google.com/)

---

## Instalação e Configuração

**1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/lume-app.git
cd lume-app
```

**2. Instale as dependências**

```bash
npm install
```

---

## Configuração do Firebase

Este passo é obrigatório para que o login e o salvamento de favoritos funcionem.

**1.** Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.

**2.** No menu lateral, clique em **Authentication → Primeiros passos** e ative o provedor **Email/senha**.

**3.** No menu lateral, clique em **Firestore Database → Criar banco de dados**. Escolha o modo de teste para desenvolvimento.

**4.** No menu lateral, clique em **Configurações do projeto (⚙️) → Seus apps → Web** e registre um novo app. Copie o objeto `firebaseConfig` gerado.

**5.** Abra o arquivo `src/services/firebaseConfig.js` e substitua os valores de exemplo pelas suas credenciais reais:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SUA_APP_ID"
};
```

---

## Como Executar

```bash
npx expo start
```

Após o comando, um QR Code será exibido no terminal. Escaneie-o com o aplicativo **Expo Go** no celular para abrir o app. Para rodar em emulador, pressione `a` (Android) ou `i` (iOS) no terminal.

---

## Telas e Navegação

```
LoginScreen
    └── (autenticado via Firebase Auth)
        └── DrawerNavigator
                ├── DashboardScreen   ← Início (lista de livros da API)
                │       └── DetailsScreen  ← Detalhes do livro + salvar favorito
                └── ProfileScreen     ← Perfil, email e logout
```

| Tela | Descrição |
|---|---|
| **Login** | Formulário de email e senha para entrar ou criar conta |
| **Dashboard** | Lista de livros buscados na Open Library com loading indicator |
| **Details** | Capa, título, autor, sinopse e botão para salvar no Firestore |
| **Profile** | Exibe email do usuário logado e botão de logout |

---

## Requisitos Técnicos Atendidos

### 1. React Hooks
- `useState` — controle de estado de loading, formulários e salvamento
- `useEffect` — disparo da requisição à API ao montar o componente
- `useBooksAPI` — hook customizado que encapsula toda a lógica de busca na Open Library

### 2. Navegação
- **Stack Navigator** — controla o fluxo de autenticação e a tela de detalhes
- **Drawer Navigator** — menu lateral com Dashboard e Perfil
- Total de telas: 4 (Login, Dashboard, Details, Profile)

### 3. Loading
- `ActivityIndicator` exibido enquanto a API retorna os livros
- Estado controlado por `useState` dentro do hook `useBooksAPI`
- Indicador de carregamento também na tela de detalhes durante o salvamento no Firestore

### 4. Integração com API
- API pública: [Open Library Search API](https://openlibrary.org/dev/docs/api)
- Endpoint: `https://openlibrary.org/search.json?q={termo}&limit=12`
- Dados exibidos: título, autor, capa, número de páginas e sinopse
- Interação: toque no card navega para a tela de detalhes

### 5. Firebase
- **Authentication**: login e cadastro com email/senha; persistência de sessão via AsyncStorage
- **Firestore**: favoritos salvos na coleção `users/{uid}/favorites/{bookId}`
- **Logout**: disponível na tela de perfil via `signOut(auth)`

### 6. Drawer Navigation
- Menu lateral com as seções **Início** e **Perfil / Configurações**
- Cores e estilos personalizados alinhados ao tema do app

---

## Decisões de Projeto

**Por que Open Library?** É uma API pública, sem necessidade de chave de autenticação, com boa cobertura de títulos em português e dados ricos (capas, autores, número de páginas).

**Por que Drawer + Stack?** O Drawer organiza as seções principais do app (Dashboard e Perfil), enquanto o Stack gerencia o fluxo de autenticação e a navegação profunda até a tela de detalhes — ambos exigidos pelo enunciado.

**Por que AsyncStorage na configuração do Auth?** O Firebase Auth por padrão não persiste sessão em React Native sem essa configuração. Com `getReactNativePersistence(AsyncStorage)`, o usuário permanece logado mesmo ao fechar e reabrir o app.
