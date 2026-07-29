# SkateLife Blog — Implementation Plan

> [!NOTE]
> This document may not reflect the current implementation.
> See the final report for up-to-date state:
> [Final Report](../reports/skatelife-blog.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing SkateSet React project into a SkateLife blog with 90s printed magazine aesthetic, featuring a homepage with hero, search, category filters, and a grid of 6 articles.

**Architecture:** Single-page app with React Router. Articles stored as local JS objects in `src/artigos/`. Components organized by feature: layout, home, article, shared UI. Tailwind CSS for styling with custom 90s magazine theme.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, React Router 6, Lucide React icons

---

## Global Constraints

- Language: Portuguese (pt-BR)
- Favicon: `public/nova_logo_skateset.ico` (already exists)
- Font families: Bebas Neue (headlines), DM Sans (body), JetBrains Mono (mono)
- Color palette: cream `#F5F0EB`, black `#1A1A1A`, red `#DC2626`, yellow `#FACC15`, orange `#EA580C`
- Articles stored in `src/artigos/` as JS object arrays
- No Supabase for articles (local files only)
- 6 articles displayed on homepage grid
- Categories to be defined later (use placeholder array)

---

## File Structure

```
src/
├── artigos/
│   └── index.js              # Array of article objects
├── components/
│   ├── layout/
│   │   ├── Header.jsx        # Nav bar with logo + links
│   │   └── Footer.jsx        # Footer with copyright
│   ├── home/
│   │   ├── Hero.jsx          # Featured article hero section
│   │   ├── SearchBar.jsx     # Search input
│   │   ├── CategoryFilter.jsx # Category pill buttons
│   │   └── ArticleGrid.jsx   # 3x2 grid of article cards
│   ├── article/
│   │   └── ArticlePage.jsx   # Full article view
│   └── ui/
│       └── ArticleCard.jsx   # Reusable card component
├── pages/
│   └── HomePage.jsx          # Homepage composition
├── App.jsx                   # Router setup
├── main.jsx                  # Entry point (already exists)
└── index.css                 # Global styles + magazine theme
```

---

### Task 1: Create Article Data Layer

**Covers:** Data structure for blog content

**Files:**
- Create: `src/artigos/index.js`

**Interfaces:**
- Produces: `artigos` array exported from `src/artigos/index.js`

- [ ] **Step 1: Create the artigos directory and index file**

```javascript
// src/artigos/index.js

const artigos = [
  {
    id: "manobras-basicas-skate",
    titulo: "As 5 Manobras Que Todo Skatista Precisa Saber",
    categoria: "Manobras",
    imagem: "https://images.unsplash.com/photo-1564429238961-bf8e87ac7e0e?w=800&q=80",
    excerpt: "Da ollie ao kickflip, as manobras que abrem o caminho pra qualquer skatista que tá começando.",
    data: "2026-07-20",
    autor: "SkateSet",
    conteudo: `
      <p>Se você tá começando no skate, existem algumas manobras básicas que são a porta de entrada pra tudo. Não adianta pular direto pra kickflip se a ollie ainda não tá redonda.</p>

      <h2>1. Ollie</h2>
      <p>A manobra mãe de todas. É o pulo básico onde a prancha gruda nos pés. Parece simples, mas leva semanas (ou meses) pra ficar consistente. O segredo é o timing entre o pop da cauda e o deslize do pé dianteiro.</p>

      <h2>2. Manual</h2>
      <p>Andar só nas rodas traseiras. Parece fácil, mas exige equilíbrio absurdo. É a base pra qualquer manobra de flip que envolve balance.</p>

      <h2>3. Shuvit</h2>
      <p>A prancha gira 180 graus sob seus pés sem você girar junto. É a primeira manobra onde você aprende que o skate pode se mover de forma independente do seu corpo.</p>

      <h2>4. Kickflip</h2>
      <p>O holy grail do iniciante. A ollie + o flip da prancha com o pé dianteiro. Demora, mas quando pega, é viciante.</p>

      <h2>5. Drop-in</h2>
      <p>Se você quer usar rampa, precisa saber dar drop-in. É um commit total — você joga o peso pra frente e confia. Sem middle ground.</p>
    `
  },
  {
    id: "historia-skate-brasil",
    titulo: "A Historia do Skate no Brasil: De Guarujá ao Mundo",
    categoria: "Cultura",
    imagem: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800&q=80",
    excerpt: "Como o Brasil se tornou uma potência no skate mundial e por que isso importa.",
    data: "2026-07-18",
    autor: "SkateSet",
    conteudo: `
      <p>O skate brasileiro tem uma história que mistura praia, quebrada e muita determination. Guarujá foi o epicentro nos anos 80 e 90, e dali saiu tudo.</p>

      <h2>Os Pioneiros</h2>
      <p>Skatistas como Sandro Dias, Bob Burnquist e Rodrigo MX abriram caminho quando o skate ainda era visto como rebellão no Brasil.</p>

      <h2>O Boom dos Anos 2000</h2>
      <p>Com Olimpíadas no horizonte e mais investimento, o Brasil virou referência. Hoje temos skatistas entre os melhores do mundo em todas as categorias.</p>

      <h2>O Legado</h2>
      <p>Mas o skate brasileiro vai além de competição. É cultura de rua, é identidade, é como milhares de jovens encontram seu lugar.</p>
    `
  },
  {
    id: "guia-compra-prancha",
    titulo: "Guia Completo: Como Escolher Sua Primeira Prancha",
    categoria: "Equipamento",
    imagem: "https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?w=800&q=80",
    excerpt: "Width, wheelbase, concave — o que tudo isso significa e como escolher o setup certo pra você.",
    data: "2026-07-15",
    autor: "SkateSet",
    conteudo: `
      <p>Comprar sua primeira prancha pode ser intimidador. Tem tanta opção que dá pra ficar perdido. Vou simplificar tudo pra você.</p>

      <h2>Largura (Width)</h2>
      <p>Medida em polegadas. Pra street, 7.5" a 8.0" é o padrão. Pra rampa e bowls, 8.25" pra cima. Pé grande? Vai mais largo.</p>

      <h2>Wheelbase</h2>
      <p>Distância entre os trucks. Curto = mais giratório (bom pra flip). Longo = mais estável (bom pra rampa).</p>

      <h2>Concave</h2>
      <p>O quanto a prancha curva pro lado. Muito concave = mais controle pra manobras técnicas. Menos concave = mais conforto pra cruising.</p>

      <h2>Trucks</h2>
      <p>Independent pra durabilidade, Thunder pra responsividade. O tamanho do truck tem que combinar com a largura da prancha.</p>

      <h2>Rodas</h2>
      <p>Pequenas e duras (99A-101A) = street e rampa. Maiores e macias (78A-87A) = cruising e transporte.</p>
    `
  },
  {
    id: "top-5-skatistas-2026",
    titulo: "Top 5 Skatistas Que Estao Dominando em 2026",
    categoria: "Perfis",
    imagem: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    excerpt: "Os skatistas que estão quebrando a bola nesse ano e por que você deveria estar acompanhando.",
    data: "2026-07-12",
    autor: "SkateSet",
    conteudo: `
      <p>2026 tá sendo um ano insano pro skate. Novos nomes surgindo, veterano se reinventando. Aqui vão 5 que você precisa conhecer.</p>

      <h2>1. Rayssa Leal</h2>
      <p>Não tem como ignorar. A Fraldinha continua dominando e provando que o skate brasileiro tá em outro nível.</p>

      <h2>2. Nyjah Huston</h2>
      <p>Máquina de competição. Continua sendo referência em street, mas agora com um estilo mais relaxado e criativo.</p>

      <h2>3. Yuto Horigome</h2>
      <p>Precisão cirúrgica. Seu técnica é tão limpa que parece edit de vídeo.</p>

      <h2>4. Sky Brown</h2>
      <p>Com apenas 17 anos, já é bicampeã olímpica e mostra maturidade skating muito acima da idade.</p>

      <h2>5. Pedro Barros</h2>
      <p>O rei da rampa brasileiro. Velocidade e style que poucos conseguem acompanhar.</p>
    `
  },
  {
    id: "spots-iconicos-mundo",
    titulo: "10 Spots Icoricos Que Todo Skatista Deveria Conhecer",
    categoria: "Cultura",
    imagem: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    excerpt: "De Hollywood 2 a MACBA, os locais mais sagrados do skate mundial.",
    data: "2026-07-10",
    autor: "SkateSet",
    conteudo: `
      <p>Certain places in the skate world are sacred. Here are 10 spots every skater should know about.</p>

      <h2>1. Hollywood 16 — Los Angeles</h2>
      <p>O 16 stairs mais filmado da história do skate. De Rodney Mullen a Nyjah, todo mundo passou por aqui.</p>

      <h2>2. MACBA — Barcelona</h2>
      <p>O meca do skate europeu. Barcelona em si já é um skatepark, mas o MACBA é o epicentro.</p>

      <h2>3. Love Park — Boston</h2>
      <p>Fechou e reabriu, mas continua sendo símbolo do East Coast skate.</p>

      <h2>4. EMB — San Francisco</h2>
      <p>Embarcadero. Onde o street skate moderno foi praticamente inventado.</p>

      <h2>5. Stoner Plaza — Los Angeles</h2>
      <p>Referência em LA. Lugar de encontrar skatista famoso treinando.</p>
    `
  },
  {
    id: "cuidados-com-o-corpo",
    titulo: "Saude do Skatista: Como Cuidar do Corpo Pra Skatar por Mais Tempo",
    categoria: "Manobras",
    imagem: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    excerpt: "Alongamento, fortalecimento e recuperação — o que todo skatista deveria saber sobre saúde.",
    data: "2026-07-08",
    autor: "SkateSet",
    conteudo: `
      <p>Skate é desgastante. Joelho, tornozelo, costas — tudo leva porrada. Mas com os cuidados certos, você pode skatar por décadas.</p>

      <h2>Alongamento</h2>
      <p>10 minutos antes de skatar. Foco em quadris, panturrilhas e lombar. Não pule isso — seu corpo agradece.</p>

      <h2>Fortalecimento</h2>
      <p>Exercícios de core e pernas são essenciais. Prancha, agachamento e panturrilha no degrau. Peso leve, repetição alta.</p>

      <h2>Recuperação</h2>
      <p>Dormir bem é não-negociável. Alongamento pós-skate. Se machucou, não volta antes da hora — lesão crônica acabou com carreira de muita gente boa.</p>

      <h2>Equipamento de Proteção</h2>
      <p>Capacete, joelheira, cotoveleira. Não é frescura, é inteligência. Tony Hawk usa capacete até hoje.</p>
    `
  }
];

export default artigos;
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `ls src/artigos/`
Expected: `index.js` present

- [ ] **Step 3: Commit**

```bash
git add src/artigos/index.js
git commit -m "feat: add article data layer with 6 skate articles"
```

---

### Task 2: Create App Router

**Covers:** Routing structure for homepage and article pages

**Files:**
- Create: `src/App.jsx`
- Modify: `src/main.jsx` (no changes needed, already imports App)

**Interfaces:**
- Consumes: `HomePage` from `src/pages/HomePage.jsx`
- Consumes: `ArticlePage` from `src/components/article/ArticlePage.jsx`
- Produces: Routes accessible at `/` and `/artigo/:id`

- [ ] **Step 1: Create App.jsx with React Router**

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArticlePage from './components/article/ArticlePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/artigo/:id" element={<ArticlePage />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add app router with home and article routes"
```

---

### Task 3: Create Header Component

**Covers:** Site navigation with logo and links

**Files:**
- Modify: `src/components/layout/Header.jsx` (replace existing Navbar.jsx)

**Interfaces:**
- Consumes: React Router `Link`
- Produces: `<Header />` component

- [ ] **Step 1: Create Header.jsx**

```jsx
// src/components/layout/Header.jsx
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-cream border-b-2 border-brand-black">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/nova_logo_skateset.ico"
            alt="SkateSet"
            className="w-8 h-8"
          />
          <span className="font-display text-2xl tracking-wider text-brand-black">
            SKATESET
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="font-body text-sm font-semibold uppercase tracking-wide hover:text-brand-red transition-colors"
          >
            Home
          </Link>
          <Link
            to="/"
            className="font-body text-sm font-semibold uppercase tracking-wide hover:text-brand-red transition-colors"
          >
            Artigos
          </Link>
          <Link
            to="/"
            className="font-body text-sm font-semibold uppercase tracking-wide hover:text-brand-red transition-colors"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.jsx
git commit -m "feat: add header component with retro magazine nav"
```

---

### Task 4: Create Footer Component

**Covers:** Site footer with copyright

**Files:**
- Modify: `src/components/layout/Footer.jsx` (replace existing)

**Interfaces:**
- Produces: `<Footer />` component

- [ ] **Step 1: Create Footer.jsx**

```jsx
// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white border-t-4 border-brand-red">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/nova_logo_skateset.ico"
              alt="SkateSet"
              className="w-6 h-6 brightness-0 invert"
            />
            <span className="font-display text-xl tracking-wider">
              SKATESET
            </span>
          </div>

          <p className="font-body text-sm text-brand-gray-light">
            &copy; {new Date().getFullYear()} SkateSet. Todos os direitos reservados.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="font-body text-xs uppercase tracking-wide hover:text-brand-red transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="font-body text-xs uppercase tracking-wide hover:text-brand-red transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "feat: add footer component"
```

---

### Task 5: Create ArticleCard Component

**Covers:** Reusable card for article grid display

**Files:**
- Create: `src/components/ui/ArticleCard.jsx`

**Interfaces:**
- Consumes: article object `{ id, titulo, categoria, imagem, excerpt, data }`
- Produces: `<ArticleCard article={...} />`

- [ ] **Step 1: Create ArticleCard.jsx**

```jsx
// src/components/ui/ArticleCard.jsx
import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  const { id, titulo, categoria, imagem, excerpt, data } = article

  return (
    <Link
      to={`/artigo/${id}`}
      className="group block bg-brand-white border-2 border-brand-black overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A]"
    >
      <div className="aspect-[4/3] overflow-hidden border-b-2 border-brand-black">
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block px-2 py-0.5 bg-brand-yellow text-brand-black font-body text-xs font-bold uppercase border border-brand-black">
            {categoria}
          </span>
          <span className="font-body text-xs text-brand-gray">
            {new Date(data).toLocaleDateString('pt-BR')}
          </span>
        </div>

        <h3 className="font-display text-xl leading-tight mb-2 group-hover:text-brand-red transition-colors">
          {titulo}
        </h3>

        <p className="font-body text-sm text-brand-gray leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ArticleCard.jsx
git commit -m "feat: add article card component with retro style"
```

---

### Task 6: Create SearchBar Component

**Covers:** Search input for filtering articles

**Files:**
- Create: `src/components/home/SearchBar.jsx`

**Interfaces:**
- Consumes: `onSearch` callback with search term string
- Produces: `<SearchBar onSearch={fn} />`

- [ ] **Step 1: Create SearchBar.jsx**

```jsx
// src/components/home/SearchBar.jsx
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray"
      />
      <input
        type="text"
        placeholder="Buscar artigos..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-brand-white border-2 border-brand-black font-body text-sm placeholder:text-brand-gray-light focus:outline-none focus:border-brand-red focus:shadow-[2px_2px_0px_#DC2626] transition-all"
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/SearchBar.jsx
git commit -m "feat: add search bar component"
```

---

### Task 7: Create CategoryFilter Component

**Covers:** Category pill buttons for filtering

**Files:**
- Create: `src/components/home/CategoryFilter.jsx`

**Interfaces:**
- Consumes: `categorias` array, `active` string, `onSelect` callback
- Produces: `<CategoryFilter categorias={[]} active="" onSelect={fn} />`

- [ ] **Step 1: Create CategoryFilter.jsx**

```jsx
// src/components/home/CategoryFilter.jsx
export default function CategoryFilter({ categorias, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('')}
        className={`px-3 py-1.5 font-body text-xs font-bold uppercase border-2 border-brand-black transition-all ${
          active === ''
            ? 'bg-brand-black text-brand-white'
            : 'bg-brand-white text-brand-black hover:bg-brand-yellow'
        }`}
      >
        Todos
      </button>
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 font-body text-xs font-bold uppercase border-2 border-brand-black transition-all ${
            active === cat
              ? 'bg-brand-black text-brand-white'
              : 'bg-brand-white text-brand-black hover:bg-brand-yellow'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/CategoryFilter.jsx
git commit -m "feat: add category filter component"
```

---

### Task 8: Create Hero Component

**Covers:** Featured article hero section on homepage

**Files:**
- Create: `src/components/home/Hero.jsx`

**Interfaces:**
- Consumes: article object
- Produces: `<Hero article={...} />`

- [ ] **Step 1: Create Hero.jsx**

```jsx
// src/components/home/Hero.jsx
import { Link } from 'react-router-dom'

export default function Hero({ article }) {
  if (!article) return null

  return (
    <section className="relative w-full bg-brand-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 min-h-[400px]">
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={article.imagem}
              alt={article.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="inline-block w-fit px-3 py-1 bg-brand-red text-brand-white font-body text-xs font-bold uppercase border border-brand-red mb-4">
              Destaque
            </span>

            <span className="inline-block w-fit px-2 py-0.5 bg-brand-yellow text-brand-black font-body text-xs font-bold uppercase border border-brand-black mb-4">
              {article.categoria}
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-white leading-none mb-4">
              {article.titulo}
            </h1>

            <p className="font-body text-brand-gray-light text-base md:text-lg mb-6 max-w-lg">
              {article.excerpt}
            </p>

            <Link
              to={`/artigo/${article.id}`}
              className="inline-block w-fit px-6 py-3 bg-brand-red text-brand-white font-body text-sm font-bold uppercase border-2 border-brand-white shadow-[3px_3px_0px_#FFFFFF] hover:shadow-[1px_1px_0px_#FFFFFF] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Ler Artigo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Hero.jsx
git commit -m "feat: add hero component with featured article"
```

---

### Task 9: Create ArticleGrid Component

**Covers:** 3x2 grid of article cards

**Files:**
- Create: `src/components/home/ArticleGrid.jsx`

**Interfaces:**
- Consumes: `artigos` array
- Produces: `<ArticleGrid artigos={[]} />`

- [ ] **Step 1: Create ArticleGrid.jsx**

```jsx
// src/components/home/ArticleGrid.jsx
import ArticleCard from '../ui/ArticleCard'

export default function ArticleGrid({ artigos }) {
  if (artigos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-brand-gray text-lg">
          Nenhum artigo encontrado.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artigos.map((artigo) => (
        <ArticleCard key={artigo.id} article={artigo} />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/ArticleGrid.jsx
git commit -m "feat: add article grid component"
```

---

### Task 10: Create HomePage

**Covers:** Homepage composition with hero, search, filters, and grid

**Files:**
- Create: `src/pages/HomePage.jsx`

**Interfaces:**
- Consumes: `artigos` from `src/artigos/index.js`
- Consumes: `Hero`, `SearchBar`, `CategoryFilter`, `ArticleGrid`

- [ ] **Step 1: Create HomePage.jsx**

```jsx
// src/pages/HomePage.jsx
import { useState, useMemo } from 'react'
import artigos from '../artigos'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import SearchBar from '../components/home/SearchBar'
import CategoryFilter from '../components/home/CategoryFilter'
import ArticleGrid from '../components/home/ArticleGrid'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  const categorias = useMemo(() => {
    const cats = [...new Set(artigos.map((a) => a.categoria))]
    return cats.sort()
  }, [])

  const featuredArticle = artigos[0]

  const filteredArtigos = useMemo(() => {
    return artigos.slice(1).filter((artigo) => {
      const matchesSearch =
        artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artigo.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = activeCategory
        ? artigo.categoria === activeCategory
        : true

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory])

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        <Hero article={featuredArticle} />

        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl text-brand-black">
              ULTIMAS PUBLICACOES
            </h2>
            <SearchBar onSearch={setSearchTerm} />
          </div>

          <div className="mb-8">
            <CategoryFilter
              categorias={categorias}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>

          <ArticleGrid artigos={filteredArtigos} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: add homepage with hero, search, filters, and grid"
```

---

### Task 11: Create ArticlePage

**Covers:** Full article view page

**Files:**
- Create: `src/components/article/ArticlePage.jsx`

**Interfaces:**
- Consumes: `artigos` from `src/artigos/index.js`
- Consumes: URL param `:id`
- Produces: Full article page with content

- [ ] **Step 1: Create ArticlePage.jsx**

```jsx
// src/components/article/ArticlePage.jsx
import { useParams, Link } from 'react-router-dom'
import artigos from '../../artigos'
import Header from '../layout/Header'
import Footer from '../layout/Footer'

export default function ArticlePage() {
  const { id } = useParams()
  const article = artigos.find((a) => a.id === id)

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-6xl text-brand-black mb-4">
              404
            </h1>
            <p className="font-body text-brand-gray mb-6">
              Artigo nao encontrado.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-brand-red text-brand-white font-body text-sm font-bold uppercase border-2 border-brand-black shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Voltar pra Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-block mb-6 font-body text-sm font-semibold uppercase tracking-wide text-brand-red hover:text-brand-red-dark transition-colors"
          >
            &larr; Voltar
          </Link>

          <div className="mb-6">
            <span className="inline-block px-2 py-0.5 bg-brand-yellow text-brand-black font-body text-xs font-bold uppercase border border-brand-black">
              {article.categoria}
            </span>
            <span className="ml-3 font-body text-sm text-brand-gray">
              {new Date(article.data).toLocaleDateString('pt-BR')}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-brand-black leading-tight mb-6">
            {article.titulo}
          </h1>

          <div className="w-16 h-1 bg-brand-red border border-brand-black mb-6" />

          <div className="aspect-video w-full overflow-hidden border-2 border-brand-black mb-8">
            <img
              src={article.imagem}
              alt={article.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none font-body text-brand-black-soft
              [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-brand-black [&_h2]:mt-8 [&_h2]:mb-4
              [&_p]:leading-relaxed [&_p]:mb-4
              [&_strong]:font-bold
              [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: article.conteudo }}
          />

          <div className="mt-12 pt-6 border-t-2 border-brand-black">
            <p className="font-body text-sm text-brand-gray">
              Por <strong>{article.autor}</strong>
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/article/ArticlePage.jsx
git commit -m "feat: add article page with full content view"
```

---

### Task 12: Update Global Styles for Magazine Theme

**Covers:** CSS updates for 90s print magazine aesthetic

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- N/A (styling only)

- [ ] **Step 1: Update index.css with magazine theme additions**

Add the following at the end of `src/index.css`:

```css
/* Magazine texture overlay */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Magazine-style selection */
::selection {
  background: #DC2626;
  color: #FAFAFA;
}

/* Print magazine image treatment */
img {
  image-rendering: auto;
}

/* Magazine divider */
.magazine-divider {
  width: 100%;
  height: 3px;
  background: repeating-linear-gradient(
    90deg,
    #1A1A1A 0px,
    #1A1A1A 4px,
    transparent 4px,
    transparent 8px
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add magazine texture and print-style CSS"
```

---

### Task 13: Fix index.html Favicon Reference

**Covers:** Correct favicon path to use .ico file

**Files:**
- Modify: `index.html:8-12`

**Interfaces:**
- N/A

- [ ] **Step 1: Update favicon links in index.html**

Replace lines 8-12 with:

```html
    <link rel="icon" type="image/x-icon" href="/nova_logo_skateset.ico" />
    <link rel="shortcut icon" href="/nova_logo_skateset.ico" />
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "fix: update favicon to use .ico file from public/"
```

---

### Task 14: Test Build and Run

**Covers:** Verify everything compiles and runs

**Files:**
- None (verification only)

**Interfaces:**
- N/A

- [ ] **Step 1: Install dependencies**

Run: `yarn install` (or `npm install`)
Expected: Dependencies installed successfully

- [ ] **Step 2: Run dev server**

Run: `yarn dev`
Expected: Vite dev server starts, no errors

- [ ] **Step 3: Verify pages load**

- Open `http://localhost:5173` — should see homepage with hero + grid
- Click an article — should navigate to article page
- Test search — should filter articles
- Test category filter — should filter by category
- Test back button — should return to homepage

- [ ] **Step 4: Run build**

Run: `yarn build`
Expected: Build succeeds, no errors

- [ ] **Step 5: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: resolve build issues"
```
