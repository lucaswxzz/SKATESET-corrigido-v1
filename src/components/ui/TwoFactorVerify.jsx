import { useState } from 'react'
import { verifyTOTP, hashBackupCode } from '../../lib/totp'
import { db } from '../../lib/turso'
import { Shield, Loader2, AlertTriangle } from 'lucide-react'

export default function TwoFactorVerify({ user, onSuccess, onError }) {
  const [code, setCode] = useState('')
  const [useBackup, setUseBackup] = useState(false)
  const [backupCode, setBackupCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleVerify() {
    if (useBackup) {
      if (!backupCode.trim()) {
        setError('Digite um código de backup')
        return
      }
      await verifyBackupCode()
    } else {
      if (code.length !== 6) {
        setError('Código deve ter 6 dígitos')
        return
      }
      await verifyTOTPCode()
    }
  }

  async function verifyTOTPCode() {
    setLoading(true)
    setError('')

    try {
      const isValid = await verifyTOTP(user.two_factor_secret, code)

      if (!isValid) {
        setError('Código inválido. Tente novamente.')
        setLoading(false)
        return
      }

      onSuccess()
    } catch (err) {
      console.error('2FA verification error:', err)
      setError('Erro ao verificar código.')
      setLoading(false)
    }
  }

  async function verifyBackupCode() {
    setLoading(true)
    setError('')

    try {
      const hashedCode = await hashBackupCode(backupCode.trim())
      const storedCodes = JSON.parse(user.backup_codes || '[]')

      const codeIndex = storedCodes.indexOf(hashedCode)
      if (codeIndex === -1) {
        setError('Código de backup inválido ou já utilizado.')
        setLoading(false)
        return
      }

      // Remove used backup code
      storedCodes.splice(codeIndex, 1)
      await db.execute({
        sql: 'UPDATE users SET backup_codes = ? WHERE id = ?',
        args: [JSON.stringify(storedCodes), user.id]
      })

      onSuccess()
    } catch (err) {
      console.error('Backup code verification error:', err)
      setError('Erro ao verificar código de backup.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border-2 border-brand-black p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield size={24} className="text-brand-red" />
        <h3 className="font-display text-xl text-brand-black tracking-wider">
          VERIFICAÇÃO EM DUAS ETAPAS
        </h3>
      </div>

      <p className="text-brand-gray font-body text-sm mb-4">
        {useBackup
          ? 'Digite um dos seus códigos de backup.'
          : 'Digite o código de 6 dígitos do seu app de autenticação.'
        }
      </p>

      {useBackup ? (
        <div className="mb-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
            CÓDIGO DE BACKUP
          </label>
          <input
            type="text"
            value={backupCode}
            onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX"
            className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black font-mono text-center text-lg tracking-wider focus:outline-none focus:border-brand-red transition-colors"
          />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
            CÓDIGO DE VERIFICAÇÃO
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
            placeholder="000000"
            className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black font-mono text-center text-lg tracking-[0.5em] focus:outline-none focus:border-brand-red transition-colors"
            maxLength={6}
          />
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-center gap-2">
          <AlertTriangle size={14} className="text-red-500" />
          <p className="text-red-600 font-body text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => { setUseBackup(!useBackup); setError(''); setCode(''); setBackupCode('') }}
          className="flex-1 py-2 border-2 border-brand-black font-display text-xs tracking-wider hover:bg-brand-black/5 transition-colors"
        >
          {useBackup ? 'USAR CÓDIGO DO APP' : 'USAR CÓDIGO DE BACKUP'}
        </button>
        <button
          onClick={handleVerify}
          disabled={loading || (!useBackup && code.length !== 6) || (useBackup && !backupCode.trim())}
          className="flex-1 py-2 bg-brand-red text-white font-display text-xs tracking-wider hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          VERIFICAR
        </button>
      </div>
    </div>
  )
}
