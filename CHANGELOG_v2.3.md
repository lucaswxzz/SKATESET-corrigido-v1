# SkateSet 2.3 — Atualizações implementadas

## Principais mudanças nesta versão

### 1. Layout mais amplo (mais conteúdo, menos bordas vazias)
- Containers passaram de `max-w-7xl` (1280px) para `max-w-[1600px]` na home e `max-w-[1400px]` nas páginas internas.
- Textos aumentados (hero, títulos de seção, descrições).
- Imagens maiores (hero ~480px, cards de guia 224-256px de altura, galeria com grid de layout variado).

### 2. Imagens dos guias carregando (hospedadas localmente)
- Todas as imagens de capa dos guias agora estão em `/public/skate/guides/*.jpg`, baixadas do Pexels e versionadas com o projeto.
- O campo `thumbnail` foi adicionado em cada guia em `src/data/guides.js`.
- `GuideCard` agora usa `guide.thumbnail` como fonte principal.

### 3. Página "Meu Perfil" completamente redesenhada
- Hero header colorido (preto/verde) com avatar grande e botões de editar/sair.
- Barra de progresso visual (% de guias completados).
- 4 cards de estatística: Setups · Guias concluídos · Guias curtidos · Conquistas.
- 5 abas: **Visão Geral** (próximos passos + atividade recente), **Setups**, **Curtidos**, **Progresso** (lista completa) e **Conquistas** (6 achievements desbloqueáveis).

### 4. Sistema de Likes por usuário logado (tempo real via Supabase)
- Nova tabela `guide_likes` (SQL em `src/lib/supabase.js`).
- Hook `useLikes(guideId)` retorna `{ count, liked, toggle }` com **subscription realtime**.
- Hook `useTopLikedGuides(limit)` retorna os guias mais curtidos em tempo real.
- Botão de like em cada `GuideCard` (overlay sobre a imagem) e também no `GuideDetailPage` (chip grande ao lado de "Marcar como concluído").
- Visitantes sem login são redirecionados para `/login` ao tentar curtir.
- **Home → seção "Guias Populares"**: os 3 guias exibidos são agora os 3 mais curtidos (atualiza em tempo real). Fallback para os 3 primeiros enquanto não há likes suficientes.

### ⚠️ Passo obrigatório no Supabase
Antes que os likes funcionem, rode o SQL no painel do Supabase.
O SQL completo (inclusive RLS e habilitar realtime) está comentado no final de `src/lib/supabase.js`. Resumo:
```sql
create table if not exists guide_likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  guide_id text not null,
  created_at timestamp with time zone default now(),
  unique(user_id, guide_id)
);
alter publication supabase_realtime add table guide_likes;
-- + políticas RLS (ver supabase.js)
```

### 5. Bloco "SkateSet" na home com cor do rodapé + logo
- Grande bloco `bg-gray-900` (mesma cor do footer), borda verde marca, com a logo `/public/favicon.png` ao lado do nome.
- Levemente rotacionado (-1°) para dar atitude skate.

### 6. Cultura skatista: imagens maiores, 10 fotos únicas, abrir em tela cheia
- Nova seção de galeria imersiva com fundo preto (destaque).
- 10 imagens do Pexels (sem repetição) hospedadas em `/public/skate/gallery/`.
- Layout em grid com algumas imagens maiores (masonry-like).
- Ao clicar em qualquer imagem abre em tela cheia com botão X (componente `Lightbox` já existente).

### 7. Página da IA (Charlie) repaginada
- Bloco titular em destaque (igual ao brand block da home) com nome CHARLIE IA bem grande.
- Chat agora é o foco principal (largura 3/4 do grid desktop), altura 80vh.
- Header do chat com indicador "Online · IA Mistral".
- Sugestões clicáveis de perguntas prontas (aparecem no início da conversa).
- Input bigger, botão de enviar 64px.
- Sidebar direita reorganizada: card "Como posso ajudar?" (preto + verde), imagem "Style is everything" e card com contador de guias da base.

## Arquivos modificados
- `src/hooks/useLikes.js` **(novo)**
- `src/lib/supabase.js` (SQL atualizado)
- `src/components/guides/GuideCard.jsx`
- `src/data/guides.js` (campo `thumbnail` adicionado)
- `src/pages/HomePage.jsx`
- `src/pages/GuidesPage.jsx`
- `src/pages/GuideDetailPage.jsx`
- `src/pages/ProfilePage.jsx`
- `src/pages/CharliePage.jsx`
- `public/skate/guides/*.jpg` **(novas imagens)**
- `public/skate/gallery/*.jpg` **(novas imagens)**
- `public/skate/hero.jpg`, `public/skate/charlie-bg.jpg` **(novas)**

## Rodando localmente
```bash
yarn install
yarn dev
```
Build de produção: `yarn build` (testado e passando ✅).
