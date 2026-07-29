import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Email ou senha incorretos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 font-display text-[200px] text-white leading-none select-none rotate-[-12deg]">
          SK8
        </div>
        <div className="absolute bottom-10 right-10 font-display text-[150px] text-white leading-none select-none rotate-[8deg]">
          SET
        </div>
        <div className="absolute top-1/2 left-1/4 font-display text-[100px] text-brand-red leading-none select-none rotate-[-5deg]">
          ★
        </div>
      </div>

      {/* Diagonal stripes */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)'
      }}></div>

      {/* Red corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-red opacity-10"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Left side - Editorial content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block mb-6">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-red border-2 border-brand-red px-3 py-1">
                SkateSet
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider mb-4 leading-none">
              ENTRAR
            </h1>

            <div className="w-20 h-1 bg-brand-red mb-6 mx-auto lg:mx-0"></div>

            <p className="text-brand-gray-light font-body text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Bem-vindo de volta, skater. A pista tá esperando.
            </p>

            {/* Skate culture quotes */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                <div className="border-l-4 border-brand-red pl-4">
                  <p className="text-white/60 font-mono text-xs tracking-wider uppercase">
                    "Skate ou morra"
                  </p>
                  <p className="text-white/30 font-mono text-[10px] mt-1">— Cultura Street, 1994</p>
                </div>
                <div className="border-l-4 border-brand-red pl-4">
                  <p className="text-white/60 font-mono text-xs tracking-wider uppercase">
                    "A rua é a minha pista"
                  </p>
                  <p className="text-white/30 font-mono text-[10px] mt-1">— underground forever</p>
                </div>
              </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full max-w-md">
            <div className="bg-brand-cream border-2 border-white/20 shadow-[8px_8px_0px_#DC2626] p-8">
              {error && (
                <div className="mb-6 px-4 py-3 bg-brand-red/20 border-2 border-brand-red text-brand-red text-sm font-body">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                        autocomplete="username"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                        Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPass ? 'text' : 'password'}
                          value={form.password}
                          onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 pr-12 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                          autocomplete="current-password"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-red transition-colors"
                        >
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-retro bg-brand-red text-white font-display text-xl tracking-wider py-3 px-6 flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-colors"
                    >
                      {loading ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <>
                          ENTRAR
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
              </form>

              <div className="magazine-divider my-6"></div>

              <p className="text-center text-brand-gray text-sm font-body">
                Não tem conta?{' '}
                <Link
                  to="/cadastro"
                  className="text-brand-red hover:text-brand-red-dark font-semibold transition-colors inline-flex items-center gap-1"
                >
                  Cadastre-se
                  <ArrowRight size={14} />
                </Link>
              </p>
            </div>

            {/* Issue number style */}
            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                Issue #001
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                SkateSet © 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
