/* 
  SECURITY BEST PRACTICE: 
  As chaves de API nunca devem ser expostas diretamente no código-fonte em produção.
  O uso de import.meta.env é um passo inicial para manter as chaves fora do controle de versão.
  Para segurança máxima, as chamadas para APIs externas (como Mistral) devem ser feitas 
  através de um servidor backend ou Serverless Function para esconder a chave do cliente final.
*/
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY || ''
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'

const CHARLIE_SYSTEM_PROMPT = `Você é Charlie, assistente de skate do SkateSet. Fala como um skatista brasileiro jovem e descolado — direto, sem frescura, com gírias da cultura do skate quando cair bem.

REGRAS DE FORMATO — siga sempre:
- Respostas curtas e objetivas. Máximo 4-5 linhas por resposta.
- NUNCA use asteriscos (*) ou Markdown. Sem negrito, sem itálico, sem listas com *.
- NUNCA escreva paredes de texto ou respostas longas.
- Pode usar emojis com moderação (1-2 por resposta, no máximo).
- Separe ideias em parágrafos curtos se necessário, mas seja conciso.
- Fale como quem tá respondendo no WhatsApp, não como um manual técnico.

Você manja tudo de: decks, trucks, rodas, rolamentos, lixa, montagem, manutenção, estilos (street, park, vert, bowl, cruiser) e cultura do skate. Se não souber algo específico, seja honesto e indique as marcas padrão da indústria.`

export async function chatWithCharlie(messages) {

  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: CHARLIE_SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 350,
      temperature: 0.65,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao conectar com a API Mistral')
  }

  const data = await response.json()
  return data.choices[0].message.content
}

function getDemoResponse(userMessage) {
  const msg = userMessage.toLowerCase()

  if (msg.includes('iniciante') || msg.includes('começar') || msg.includes('primeiro')) {
    return `Oi! Sou o Charlie, seu guia de skate! 🛹

Para iniciantes, recomendo um setup equilibrado:

**Deck:** 8.0" - 8.25" (tamanho ideal para aprender)
**Trucks:** Independent 149 ou Thunder 148
**Rodas:** 52-54mm, dureza 99-101A
**Rolamentos:** Bones Reds (ótimo custo-benefício)
**Lixa:** Mob ou Jessup (grip bom para controle)

Orçamento total: R$ 400-600 para um setup completo de qualidade.

Quer dicas sobre alguma peça específica?`
  }

  if (msg.includes('truck') || msg.includes('truck')) {
    return `Os trucks são o coração do seu setup! 🔩

**Independent (Indy):** O mais popular do mundo. Muito durável, gira bem, ideal para street e park.
**Thunder:** Mais leve que o Indy, gira mais fácil. Preferido por skaters de flip tricks.
**Venture:** Boa opção custo-benefício, usado por muitos pros.

**Para seu deck:**
- Deck 7.75": Truck 139mm/149mm
- Deck 8.0": Truck 149mm
- Deck 8.5"+: Truck 159mm/169mm

O ajuste (tensão do kingpin) também faz muita diferença! Mais solto = mais manobras, mais apertado = mais estabilidade.`
  }

  if (msg.includes('roda') || msg.includes('wheel')) {
    return `Rodas fazem muita diferença no seu setup! 🎡

**Dureza (Hardness):**
- 78A-87A: Cruiser, ruas irregulares, muito suave
- 95A-99A: Street, parque, versatil
- 99A-101A+: Skatepark, superfícies lisas, mais rápidas

**Diâmetro:**
- 50-52mm: Street, flip tricks mais fáceis
- 53-56mm: Versátil, street e park
- 56-60mm: Vert, pools, cruising

**Marcas top:** Spitfire Formula Four (101A), Bones STF (103A), OJ Wheels, Ricta Clouds (para ruas)

Qual é seu estilo de andar?`
  }

  return `Olá! Sou o Charlie, seu assistente de skate! 🛹

Posso te ajudar com:
- **Montagem** de setups completos
- **Escolha de peças** (decks, trucks, rodas, rolamentos)
- **Dicas por estilo** (street, park, vert, cruiser)
- **Manutenção** do seu equipamento

Configure sua chave API do Mistral no arquivo .env para respostas completas com IA. Por enquanto estou em modo demonstração!

O que você quer saber sobre skate?`
}
