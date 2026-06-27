# ⚽ Bolão Brasil x Japão 🇧🇷🇯🇵

Sistema web completo de bolão para o jogo Brasil x Japão — 29/06/2026 às 14h.

---

## 🚀 Como publicar (passo a passo)

### 1. Criar projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"** → dê um nome (ex: `bolao-brasil-japao`)
3. Desative o Google Analytics (opcional) → **Criar projeto**
4. No menu lateral, clique em **Firestore Database**
5. Clique em **Criar banco de dados** → escolha **Modo de produção** → selecione a região `us-east1` → **Ativar**

---

### 2. Registrar o app Web no Firebase

1. Na tela inicial do projeto, clique no ícone **`</>`** (Web)
2. Dê um apelido (ex: `bolao-web`) → **Registrar app**
3. Copie o objeto `firebaseConfig` exibido
4. Abra o arquivo `src/lib/firebase.js` e **substitua** os valores pelos seus:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

---

### 3. Configurar as regras do Firestore

1. No Firebase Console → **Firestore Database** → aba **Regras**
2. Apague o conteúdo atual e cole o conteúdo do arquivo `firestore.rules`
3. Clique em **Publicar**

---

### 4. Alterar a senha de administrador (importante!)

Abra `src/components/AdminPanel.jsx` e troque:

```js
const ADMIN_PASSWORD = 'bolao2026'; // ← coloque sua senha aqui
```

---

### 5. Subir para o GitHub

```bash
# Na pasta do projeto:
git init
git add .
git commit -m "Bolão Brasil x Japão"

# Crie um repositório no github.com e conecte:
git remote add origin https://github.com/SEU_USUARIO/bolao-brasil-japao.git
git branch -M main
git push -u origin main
```

---

### 6. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Importe o repositório `bolao-brasil-japao`
4. Configurações:
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (raiz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy** ✅

Pronto! A Vercel fornecerá um link público para compartilhar com seus amigos.

---

## 📁 Estrutura do Projeto

```
bolao-brasil-japao/
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Cabeçalho + contador regressivo
│   │   ├── FormPalpite.jsx   # Formulário de cadastro de palpite
│   │   ├── ModalPagamento.jsx # Modal com instrução de PIX
│   │   ├── Dashboard.jsx     # Lista pública + total arrecadado
│   │   ├── AdminPanel.jsx    # Painel admin (confirmar pagamentos)
│   │   └── Footer.jsx        # Footer fixo
│   ├── hooks/
│   │   └── useCountdown.js   # Contador regressivo
│   ├── lib/
│   │   ├── firebase.js       # Configuração Firebase ⚠️ editar aqui
│   │   └── firestore.js      # Operações com banco (transações atômicas)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── firestore.rules            # Regras de segurança do Firestore
├── firestore.indexes.json     # Índices do Firestore
├── vercel.json                # Config de roteamento SPA
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| ⏱️ Contador regressivo | Exibe tempo restante até 29/06/2026 14h |
| 🔒 Limite de 2 palpites iguais | Transação atômica no Firestore |
| 💰 Modal de pagamento PIX | Exibido após cadastro válido |
| 📋 Dashboard público | Lista todos os palpites em tempo real |
| 🟡🟢 Status de pagamento | Visível para todos |
| 🛠️ Painel Admin | Confirma pagamentos com senha |
| 📱 Mobile-first | Responsivo e otimizado para celular |

---

## 🛠️ Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

---

## 📞 Dados de Pagamento

- **Chave PIX:** 71 992790879  
- **Destinatária:** Elaine Cerqueira  
- **Valor:** R$ 10,00

---

*Desenvolvido por Zuvinha ⚽*
