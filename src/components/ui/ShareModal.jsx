import { useState, useEffect } from 'react'
import { X, Copy, Check, MessageCircle, Share2 } from 'lucide-react'

export default function ShareModal({ isOpen, onClose, title, url }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const shareUrl = url || window.location.href
  const shareTitle = encodeURIComponent(title || 'SkateSet')
  const shareUrlEncoded = encodeURIComponent(shareUrl)

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${shareTitle}%20${shareUrlEncoded}`
    },
    {
      name: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`
    },
    {
      name: 'Twitter',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'bg-black hover:bg-gray-800',
      url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrlEncoded}`
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrlEncoded}&title=${shareTitle}`
    },
    {
      name: 'Telegram',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://t.me/share/url?url=${shareUrlEncoded}&text=${shareTitle}`
    }
  ]

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-[200] bg-brand-black/90 flex items-center justify-center px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-brand-cream border-2 border-brand-black shadow-[8px_8px_0px_#DC2626]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-brand-black">
          <div className="flex items-center gap-3">
            <Share2 size={20} className="text-brand-red" />
            <h3 className="font-display text-xl text-brand-black tracking-wider">
              COMPARTILHAR
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brand-gray hover:text-brand-red transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="p-4 border-b-2 border-brand-black/10">
          <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
            LINK DO ARTIGO
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-3 bg-white border-2 border-brand-black text-brand-black font-body text-sm focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-3 border-2 border-brand-black font-display text-sm tracking-wider flex items-center gap-2 transition-colors ${
                copied
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-brand-red text-white hover:bg-brand-red-dark'
              }`}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  COPIADO!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  COPIAR
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-3">
            ENVIAR POR
          </label>
          <div className="grid grid-cols-5 gap-3">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 hover:bg-white transition-colors group"
              >
                <div className={`w-12 h-12 ${link.color} text-white flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {link.icon}
                </div>
                <span className="font-mono text-[10px] text-brand-gray group-hover:text-brand-black">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-brand-black/10">
          <p className="text-center font-mono text-[10px] text-brand-gray tracking-widest">
            SKATESET // COMPARTILHE COM A COMUNIDADE
          </p>
        </div>
      </div>
    </div>
  )
}
