import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Lightbox({ isOpen, onClose, imageUrl, altText }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95  animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 z-[210]"
      >
        <X size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center" onClick={onClose}>
        <img 
          src={imageUrl} 
          alt={altText} 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-up"
          referrerpolicy="no-referrer"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}
