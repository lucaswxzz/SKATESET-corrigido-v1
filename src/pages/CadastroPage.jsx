import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function CadastroPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPass: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const passwordMatch = form.password === form.confirmPass
  const passwordValid = form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password) &&
    /[0-9]/.test(form.password)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!passwordMatch) {
      setError('As senhas não coincidem.')
      return
    }
    if (!passwordValid) {
      setError('A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula e número.')
      return
    }

    setLoading(true)
    try {
      await signUp(form.email, form.password, form.name)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Erro ao criar conta. Verifique seus dados.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-brand-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 font-display text-[200px] text-white leading-none select-none rotate-[-12deg]">
            NEW
          </div>
          <div className="absolute bottom-10 right-10 font-display text-[150px] text-white leading-none select-none rotate-[8deg]">
            SK8
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)'
        }}></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red opacity-20"></div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <div className="bg-brand-cream border-2 border-white/20 shadow-[8px_8px_0px_#DC2626] p-8">
              <div className="w-16 h-16 bg-brand-red mx-auto mb-4 flex items-center justify-center border-2 border-white/20">
                <Check size={32} className="text-white" />
              </div>
              <h2 className="font-display text-5xl text-brand-black tracking-wider mb-2">
                CONTA CRIADA!
              </h2>
              <div className="editorial-divider mx-auto mb-4"></div>
              <p className="text-brand-gray font-body text-sm mb-6">
                Bem-vindo à crew, skater!
              </p>
              <Link
                to="/login"
                className="btn-retro bg-brand-red text-white font-display text-lg tracking-wider py-3 px-6 inline-flex items-center gap-2 hover:bg-brand-red-dark transition-colors"
              >
                IR PARA LOGIN
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 font-display text-[200px] text-white leading-none select-none rotate-[-12deg]">
          JOIN
        </div>
        <div className="absolute bottom-10 right-10 font-display text-[150px] text-white leading-none select-none rotate-[8deg]">
          CREW
        </div>
        <div className="absolute top-1/3 right-1/4 font-display text-[120px] text-brand-red leading-none select-none rotate-[15deg]">
          ★
        </div>
      </div>

      {/* Diagonal stripes */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 35px, #fff 35px, #fff 36px)'
      }}></div>

      {/* Red corner accent */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-red opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-red opacity-10"></div>

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
              CADASTRAR
            </h1>

            <div className="w-20 h-1 bg-brand-red mb-6 mx-auto lg:mx-0"></div>

            <p className="text-brand-gray-light font-body text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Junte-se à crew. Crie sua conta e entre para a tribo.
            </p>

            {/* Benefits list */}
            <div className="space-y-3 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <span className="text-brand-red font-display text-lg">01</span>
                <span className="text-white/70 font-mono text-xs tracking-wider uppercase">Acesse artigos exclusivos</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand-red font-display text-lg">02</span>
                <span className="text-white/70 font-mono text-xs tracking-wider uppercase">Comente nos posts</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand-red font-display text-lg">03</span>
                <span className="text-white/70 font-mono text-xs tracking-wider uppercase">Faça parte da comunidade</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="hidden lg:flex items-center gap-2 mt-12">
              <span className="text-brand-red font-display text-2xl">+</span>
              <span className="text-brand-red font-display text-2xl">+</span>
              <span className="text-brand-red font-display text-2xl">+</span>
              <span className="text-white/20 font-mono text-[10px] ml-2 tracking-widest">JOIN THE CREW</span>
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                    autocomplete="name"
                    required
                  />
                </div>

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
                    autocomplete="email"
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
                      autocomplete="new-password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-red transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {form.password && (
                    <p className={`mt-1 text-xs font-mono ${passwordValid ? 'text-green-600' : 'text-brand-red'}`}>
                      {passwordValid ? '✓ Senha válida' : '✗ Mín. 8 caracteres, maiúscula, minúscula e número'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.confirmPass}
                    onChange={(e) => setForm(p => ({ ...p, confirmPass: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black placeholder-brand-gray-light font-body text-sm focus:outline-none focus:border-brand-red transition-colors"
                    autocomplete="new-password"
                    required
                    minLength={6}
                  />
                  {form.confirmPass && (
                    <p className={`mt-1 text-xs font-mono ${passwordMatch ? 'text-green-600' : 'text-brand-red'}`}>
                      {passwordMatch ? '✓ Senhas coincidem' : '✗ Senhas não coincidem'}
                    </p>
                  )}
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
                      CRIAR CONTA
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="magazine-divider my-6"></div>

              <p className="text-center text-brand-gray text-sm font-body">
                Já tem conta?{' '}
                <Link
                  to="/login"
                  className="text-brand-red hover:text-brand-red-dark font-semibold transition-colors inline-flex items-center gap-1"
                >
                  Entrar
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
