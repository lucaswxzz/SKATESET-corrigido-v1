import { X } from 'lucide-react'

export default function InfoModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-fade-in border border-gray-200"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <h3 className="text-gray-900 font-display text-xl tracking-wider uppercase">{title}</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto text-gray-600 leading-relaxed space-y-4 text-sm bg-white/60">
          {children}
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-white/80 text-right">
          <button onClick={onClose} className="btn-primary py-2 px-6">Fechar</button>
        </div>
      </div>
    </div>
  )
}
