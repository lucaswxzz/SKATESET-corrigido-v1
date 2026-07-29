import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X, Settings, Check } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'skateset_cookie_consent'

export function getCookieConsent() {
  if (typeof window === 'undefined') return null
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  return consent ? JSON.parse(consent) : null
}

export function setCookieConsent(consent) {
  if (typeof window === 'undefined') return
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
    ...consent,
    timestamp: new Date().toISOString()
  }))
}

export function hasConsent() {
  return getCookieConsent() !== null
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    const consent = getCookieConsent()
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  function handleAcceptAll() {
    setCookieConsent({
      necessary: true,
      analytics: true,
      marketing: true
    })
    setShowBanner(false)
    setShowSettings(false)
  }

  function handleRejectAll() {
    setCookieConsent({
      necessary: true,
      analytics: false,
      marketing: false
    })
    setShowBanner(false)
    setShowSettings(false)
  }

  function handleSavePreferences() {
    setCookieConsent(preferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  function handleTogglePref(key) {
    if (key === 'necessary') return // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[150] bg-brand-black border-t-4 border-brand-red p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Cookie size={24} className="text-brand-red shrink-0" />
              <div>
                <p className="text-white font-body text-sm leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência. Ao continuar navegando,
                  você concorda com nosso uso de cookies.
                </p>
                <Link
                  to="/cookies"
                  className="text-brand-red font-mono text-xs hover:underline"
                >
                  Saiba mais
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 md:flex-none px-4 py-2 border-2 border-white/20 text-white font-display text-xs tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Settings size={14} />
                CONFIGURAR
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 md:flex-none px-4 py-2 border-2 border-white/20 text-white font-display text-xs tracking-wider hover:bg-white/10 transition-colors"
              >
                REJEITAR
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none px-4 py-2 bg-brand-red text-white font-display text-xs tracking-wider hover:bg-brand-red-dark transition-colors"
              >
                ACEITAR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] bg-brand-black/90 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-brand-cream border-2 border-brand-black shadow-[8px_8px_0px_#DC2626]">
            <div className="flex items-center justify-between p-4 border-b-2 border-brand-black">
              <div className="flex items-center gap-3">
                <Cookie size={20} className="text-brand-red" />
                <h3 className="font-display text-xl text-brand-black tracking-wider">
                  CONFIGURAR COOKIES
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-brand-gray hover:text-brand-red transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Necessary */}
              <div className="flex items-center justify-between p-4 bg-white border-2 border-brand-black">
                <div className="flex-1">
                  <h4 className="font-display text-sm text-brand-black tracking-wider">
                    NECESSÁRIOS
                  </h4>
                  <p className="font-body text-xs text-brand-gray mt-1">
                    Essenciais para o funcionamento do site. Não podem ser desativados.
                  </p>
                </div>
                <div className="w-10 h-6 bg-brand-red rounded flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              </div>

              {/* Analytics */}
              <div
                onClick={() => handleTogglePref('analytics')}
                className="flex items-center justify-between p-4 bg-white border-2 border-brand-black cursor-pointer hover:border-brand-red transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-display text-sm text-brand-black tracking-wider">
                    ANALYTICS
                  </h4>
                  <p className="font-body text-xs text-brand-gray mt-1">
                    Nos ajudam a entender como o site é utilizado para melhorar a experiência.
                  </p>
                </div>
                <div className={`w-10 h-6 rounded flex items-center justify-center transition-colors ${
                  preferences.analytics ? 'bg-brand-red' : 'bg-brand-gray-light'
                }`}>
                  {preferences.analytics && <Check size={14} className="text-white" />}
                </div>
              </div>

              {/* Marketing */}
              <div
                onClick={() => handleTogglePref('marketing')}
                className="flex items-center justify-between p-4 bg-white border-2 border-brand-black cursor-pointer hover:border-brand-red transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-display text-sm text-brand-black tracking-wider">
                    MARKETING
                  </h4>
                  <p className="font-body text-xs text-brand-gray mt-1">
                    Utilizados para exibir anúncios relevantes. No momento, não utilizamos.
                  </p>
                </div>
                <div className={`w-10 h-6 rounded flex items-center justify-center transition-colors ${
                  preferences.marketing ? 'bg-brand-red' : 'bg-brand-gray-light'
                }`}>
                  {preferences.marketing && <Check size={14} className="text-white" />}
                </div>
              </div>
            </div>

            <div className="p-4 border-t-2 border-brand-black flex items-center gap-3">
              <button
                onClick={handleRejectAll}
                className="flex-1 py-3 border-2 border-brand-black font-display text-xs tracking-wider hover:bg-brand-black/5 transition-colors"
              >
                REJEITAR TODOS
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 py-3 bg-brand-red text-white font-display text-xs tracking-wider hover:bg-brand-red-dark transition-colors"
              >
                SALVAR PREFERÊNCIAS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
