# 🛹 SkateSet

Guias completos de montagem e configuração de skate. Do iniciante ao profissional.

## Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend/DB:** Supabase (autenticação + banco de dados)
- **IA:** Mistral AI (assistente Charlie)
- **Deploy:** Netlify

---

## 🚀 Como fazer o deploy no Netlify

### 1. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
VITE_MISTRAL_API_KEY=sua-api-key-mistral
```

### 2. Deploy no Netlify

**Opção A - Via GitHub (recomendado):**
1. Faça push para um repositório GitHub
2. No Netlify: New site > Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Adicione as variáveis de ambiente no painel do Netlify

**Opção B - Deploy manual:**
```bash
npm install
npm run build
# Arraste a pasta `dist` para netlify.com/drop
```

---

## 🗄️ Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Copie a URL e a anon key para o `.env`
3. No Supabase Dashboard > SQL Editor, execute o SQL do arquivo `src/lib/supabase.js` (comentário no final do arquivo)

---

## 🤖 Configurar Mistral AI

1. Crie uma conta em [mistral.ai](https://mistral.ai)
2. Gere uma API key
3. Adicione ao `.env` como `VITE_MISTRAL_API_KEY`

> **Nota:** Sem a API key, o Charlie funciona em modo demonstração com respostas pré-definidas.

---

## 💰 Ativar Google AdSense

1. Crie uma conta no [Google AdSense](https://adsense.google.com)
2. No `index.html`, descomente e substitua `ca-pub-XXXXXXXXXXXXXXXX` pelo seu publisher ID
3. No componente `src/components/ui/AdBanner.jsx`, substitua o placeholder pelo código real do AdSense

---

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── ui/           # AdBanner, SearchModal
│   ├── guides/       # GuideCard
│   ├── chat/         # CharlieChat (assistente IA)
│   └── auth/         # AuthModal
├── hooks/
│   ├── useAuth.jsx   # Autenticação Supabase
│   ├── useSetups.js  # Setups salvos
│   └── useProgress.js # Progresso dos guias
├── lib/
│   ├── supabase.js   # Cliente Supabase
│   └── mistral.js    # Cliente Mistral AI
├── pages/
│   ├── HomePage.jsx
│   ├── GuidesPage.jsx
│   ├── GuideDetailPage.jsx
│   ├── ProfilePage.jsx
│   └── AuthPages.jsx
└── data/
    └── guides.js     # Conteúdo dos guias
```

---

## ➕ Adicionando novos guias

Edite `src/data/guides.js` e adicione um objeto no array `GUIDES`:

```js
{
  id: 'meu-guia',
  title: 'Título do Guia',
  slug: 'titulo-do-guia',          // URL-friendly
  level: 'beginner',               // beginner | intermediate | advanced
  style: 'street',                 // street | park | vert | cruiser | all
  readTime: '10 min',
  description: 'Descrição curta.',
  category: 'Montagem',
  steps: [
    {
      title: 'Passo 1',
      content: 'Conteúdo detalhado...',
      details: ['Detalhe 1', 'Detalhe 2'],  // opcional
    }
  ],
  recommended: {                   // opcional
    deck: { item: 'Nome', price: 'R$ xxx', note: 'Nota' },
    // ...
  }
}
```

---

## 🎨 Cores do tema

| Cor | Hex | Uso |
|-----|-----|-----|
| Verde | `#22C55E` | Cor principal, destaque |
| Verde escuro | `#16A34A` | Hover states |
| Preto | `#0A0A0A` | Background principal |
| Preto card | `#1A1A1A` | Cards e componentes |
| Branco | `#FAFAFA` | Textos principais |

---

Feito com 🛹 para a comunidade do skate.
