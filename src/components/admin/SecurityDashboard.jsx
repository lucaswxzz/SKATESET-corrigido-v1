import { useState, useEffect } from 'react'
import { getSecurityEvents, cleanupExpiredData } from '../../lib/advancedSecurity'
import { Shield, AlertTriangle, Clock, RefreshCw } from 'lucide-react'

export default function SecurityDashboard() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    warnings: 0
  })

  useEffect(() => {
    loadEvents()
    const interval = setInterval(loadEvents, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [filter])

  function loadEvents() {
    const allEvents = getSecurityEvents()
    setEvents(allEvents)

    const critical = allEvents.filter(e =>
      ['SQL_INJECTION_ATTEMPT', 'XSS_ATTEMPT', 'BRUTE_FORCE_DETECTED'].includes(e.event)
    ).length

    const warnings = allEvents.filter(e =>
      ['RATE_LIMIT_EXCEEDED', 'LOGIN_FAILED'].includes(e.event)
    ).length

    setStats({
      total: allEvents.length,
      critical,
      warnings
    })
  }

  function handleCleanup() {
    cleanupExpiredData()
    loadEvents()
  }

  function getEventColor(event) {
    if (['SQL_INJECTION_ATTEMPT', 'XSS_ATTEMPT', 'BRUTE_FORCE_DETECTED'].includes(event)) {
      return 'text-red-500 bg-red-50'
    }
    if (['RATE_LIMIT_EXCEEDED', 'LOGIN_FAILED'].includes(event)) {
      return 'text-yellow-600 bg-yellow-50'
    }
    return 'text-green-600 bg-green-50'
  }

  function getEventLabel(event) {
    const labels = {
      'LOGIN_SUCCESS': 'Login bem-sucedido',
      'LOGIN_FAILED': 'Falha no login',
      'LOGOUT': 'Logout',
      'SIGNUP_SUCCESS': 'Novo cadastro',
      'SQL_INJECTION_ATTEMPT': 'Tentativa de SQL Injection',
      'XSS_ATTEMPT': 'Tentativa de XSS',
      'RATE_LIMIT_EXCEEDED': 'Rate limit atingido',
      'SESSION_CREATED': 'Sessão criada',
      'SESSION_EXPIRED': 'Sessão expirada',
      'BRUTE_FORCE_DETECTED': 'Ataque de força bruta'
    }
    return labels[event] || event
  }

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(e => {
        if (filter === 'critical') {
          return ['SQL_INJECTION_ATTEMPT', 'XSS_ATTEMPT', 'BRUTE_FORCE_DETECTED'].includes(e.event)
        }
        if (filter === 'warnings') {
          return ['RATE_LIMIT_EXCEEDED', 'LOGIN_FAILED'].includes(e.event)
        }
        return true
      }).slice(-50)

  return (
    <div className="bg-white border-2 border-brand-black p-6 shadow-[4px_4px_0px_#1A1A1A]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-brand-red" />
          <h3 className="font-display text-xl text-brand-black tracking-wider">
            SEGURANÇA
          </h3>
        </div>
        <button
          onClick={handleCleanup}
          className="p-2 text-brand-gray hover:text-brand-red transition-colors"
          title="Limpar dados expirados"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-brand-cream border border-brand-black text-center">
          <p className="font-display text-2xl text-brand-black">{stats.total}</p>
          <p className="font-mono text-[10px] text-brand-gray uppercase">Total</p>
        </div>
        <div className="p-3 bg-red-50 border border-red-200 text-center">
          <p className="font-display text-2xl text-red-600">{stats.critical}</p>
          <p className="font-mono text-[10px] text-red-500 uppercase">Críticos</p>
        </div>
        <div className="p-3 bg-yellow-50 border border-yellow-200 text-center">
          <p className="font-display text-2xl text-yellow-600">{stats.warnings}</p>
          <p className="font-mono text-[10px] text-yellow-500 uppercase">Alertas</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'critical', 'warnings'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-colors ${
              filter === f
                ? 'bg-brand-black text-white border-brand-black'
                : 'bg-white text-brand-gray border-brand-black hover:bg-brand-cream'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'critical' ? 'Críticos' : 'Alertas'}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-brand-gray font-body text-sm py-4">
            Nenhum evento registrado
          </p>
        ) : (
          filteredEvents.reverse().map((event) => (
            <div
              key={event.id}
              className={`p-2 border border-brand-black/10 text-xs ${getEventColor(event.event)}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-medium">
                  {getEventLabel(event.event)}
                </span>
                <span className="font-mono text-[10px] opacity-70">
                  {new Date(event.timestamp).toLocaleTimeString('pt-BR')}
                </span>
              </div>
              {event.email && (
                <span className="font-mono text-[10px] opacity-60">
                  {event.email}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
