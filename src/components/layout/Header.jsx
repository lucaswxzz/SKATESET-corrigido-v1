import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { User, LogOut, Shield, LayoutDashboard } from 'lucide-react'

export default function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-brand-cream border-b-2 border-brand-black">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/skateset_logo_horizontal.png"
            alt="SkateSet"
            className="h-20"
          />
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className="btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-2 px-4 hover:bg-brand-red-dark transition-colors"
          >
            INÍCIO
          </Link>

          {user ? (
            <div className="flex items-center gap-3 ml-3 border-l-2 border-brand-black pl-3">
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="btn-retro bg-blue-600 text-white font-display text-sm tracking-wider py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  PAINEL ADMIN
                </Link>
              )}
              <Link
                to="/perfil"
                className="btn-retro bg-white text-brand-black font-display text-sm tracking-wider py-2 px-4 hover:bg-brand-cream transition-colors flex items-center gap-2"
              >
                <User size={14} />
                MEU PERFIL
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-3 border-l-2 border-brand-black pl-3">
              <Link
                to="/login"
                className="btn-retro bg-white text-brand-black font-display text-sm tracking-wider py-2 px-4 hover:bg-brand-cream transition-colors"
              >
                ENTRAR
              </Link>
              <Link
                to="/cadastro"
                className="btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-2 px-4 hover:bg-brand-red-dark transition-colors"
              >
                CADASTRAR
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
