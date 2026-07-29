import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, Home, Search } from 'lucide-react'

export default function Navbar({ onSearchOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Início', icon: Home },
    { to: '/guias', label: 'Guias', icon: BookOpen },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 border-b border-brand-black-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl text-brand-red tracking-widest">SKATE</span>
            <span className="font-display text-2xl text-brand-white tracking-widest">SET</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <a
                key={to}
                href={to}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'text-brand-red bg-brand-red/10'
                    : 'text-brand-gray-light hover:text-brand-white hover:bg-brand-black-card'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onSearchOpen}
              className="p-2 text-brand-gray hover:text-brand-white transition-colors"
              aria-label="Pesquisar"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-brand-gray hover:text-brand-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-black-soft border-t border-brand-black-border animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <a
                key={to}
                href={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(to)
                    ? 'text-brand-red bg-brand-red/10'
                    : 'text-brand-gray-light hover:text-brand-white'
                }`}
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onSearchOpen?.() }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-brand-gray-light hover:text-brand-white w-full"
            >
              <Search size={18} />
              Pesquisar
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
