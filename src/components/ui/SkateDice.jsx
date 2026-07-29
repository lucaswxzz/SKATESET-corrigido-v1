import { useState } from 'react'
import { Dice6, RefreshCw } from 'lucide-react'

const STANCES = ['Normal', 'Switch', 'Nollie', 'Fakie']
const TRICKS = [
  'Ollie', 'Kickflip', 'Heelflip', 'Pop Shuvit', 'Frontside 180', 'Backside 180', 
  '360 Shuvit', 'Varial Kickflip', 'Varial Heelflip', 'Tre Flip', 'Hardflip', 'Inward Heelflip'
]
const OBSTACLES = ['no Chão', 'no Manual Pad', 'na Escada', 'na Borda', 'no Corrimão']

export default function SkateDice() {
  const [result, setResult] = useState(null)
  const [rolling, setRolling] = useState(false)

  const roll = () => {
    setRolling(true)
    setResult(null)
    setTimeout(() => {
      const stance = STANCES[Math.floor(Math.random() * STANCES.length)]
      const trick = TRICKS[Math.floor(Math.random() * TRICKS.length)]
      const obstacle = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)]
      setResult({ stance, trick, obstacle })
      setRolling(false)
    }, 800)
  }

  return (
    <div className="bg-brand-black border-2 border-brand-black p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-red/10 flex items-center justify-center border-2 border-brand-red">
          <Dice6 className="text-brand-red" size={24} />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">SKATE DICE</h3>
          <p className="text-brand-gray text-xs">Gerador de Manobras Aleatórias</p>
        </div>
      </div>

      <div className="h-24 flex items-center justify-center mb-6 bg-brand-black-soft border-2 border-brand-black px-4">
        {rolling ? (
          <RefreshCw className="text-brand-red animate-spin" size={32} />
        ) : result ? (
          <div className="text-center animate-fade-in">
            <p className="text-brand-red font-mono text-xs uppercase tracking-widest mb-1">Sua manobra é:</p>
            <p className="text-white font-display text-xl md:text-2xl tracking-wider">
              {result.stance.toUpperCase()} <span className="text-brand-red">{result.trick.toUpperCase()}</span> {result.obstacle.toUpperCase()}
            </p>
          </div>
        ) : (
          <p className="text-brand-gray text-sm italic">Clique no botão para rolar os dados...</p>
        )}
      </div>

      <button
        onClick={roll}
        disabled={rolling}
        className="w-full flex items-center justify-center gap-2 py-3 uppercase tracking-widest text-xs font-bold bg-brand-red text-white border-2 border-brand-black btn-retro"
      >
        <Dice6 size={18} />
        Rolar Dados
      </button>
    </div>
  )
}
