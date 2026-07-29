import { useState, useEffect } from 'react'
import { generateSecret, generateQRCodeURL, generateTOTP, verifyTOTP, generateBackupCodes, hashBackupCode } from '../../lib/totp'
import { db } from '../../lib/turso'
import { Shield, Check, Copy, AlertTriangle, Loader2, Eye, EyeOff } from 'lucide-react'

export default function TwoFactorSetup({ user, onSetupComplete }) {
  const [step, setStep] = useState('initial') // initial, showQR, verify, backup, complete
  const [secret, setSecret] = useState('')
  const [qrCodeURL, setQRCodeURL] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [backupCodes, setBackupCodes] = useState([])
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  useEffect(() => {
    check2FAStatus()
  }, [user])

  async function check2FAStatus() {
    try {
      const result = await db.execute({
        sql: 'SELECT two_factor_enabled FROM users WHERE id = ?',
        args: [user.id]
      })
      if (result.rows.length > 0 && result.rows[0].two_factor_enabled) {
        setTwoFactorEnabled(true)
        setStep('complete')
      }
    } catch (err) {
      console.error('Error checking 2FA status:', err)
    }
  }

  function startSetup() {
    const newSecret = generateSecret(20)
    setSecret(newSecret)
    setQRCodeURL(generateQRCodeURL(newSecret, user.email))
    setStep('showQR')
  }

  async function handleVerify() {
    if (verificationCode.length !== 6) {
      setError('Código deve ter 6 dígitos')
      return
    }

    setLoading(true)
    setError('')

    try {
      const isValid = await verifyTOTP(secret, verificationCode)

      if (!isValid) {
        setError('Código inválido. Verifique o app de autenticação.')
        setLoading(false)
        return
      }

      // Generate backup codes
      const codes = generateBackupCodes(8)
      setBackupCodes(codes)

      // Hash backup codes for storage
      const hashedCodes = await Promise.all(codes.map(code => hashBackupCode(code)))

      // Save to database
      await db.execute({
        sql: 'UPDATE users SET two_factor_secret = ?, two_factor_enabled = 1, backup_codes = ? WHERE id = ?',
        args: [secret, JSON.stringify(hashedCodes), user.id]
      })

      setStep('backup')
    } catch (err) {
      console.error('2FA setup error:', err)
      setError('Erro ao configurar 2FA. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  function finishSetup() {
    setTwoFactorEnabled(true)
    setStep('complete')
    onSetupComplete?.()
  }

  if (step === 'complete' || twoFactorEnabled) {
    return (
      <div className="bg-white border-2 border-brand-black p-4 shadow-[4px_4px_0px_#1A1A1A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 flex items-center justify-center shrink-0">
            <Check size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-display text-sm text-brand-black tracking-wider">
              2FA ATIVADO
            </h3>
            <p className="font-body text-xs text-brand-gray">
              Sua conta está protegida.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'backup') {
    return (
      <div className="bg-brand-cream border-2 border-brand-black p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={24} className="text-brand-red" />
          <h3 className="font-display text-xl text-brand-black tracking-wider">
            CÓDIGOS DE BACKUP
          </h3>
        </div>

        <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-yellow-600" />
            <p className="font-body text-sm text-yellow-800 font-medium">
              IMPORTANTE: Salve estes códigos em local seguro!
            </p>
          </div>
          <p className="font-body text-xs text-yellow-700">
            Estes códigos são para emergências. Cada código só pode ser usado uma vez.
          </p>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setShowBackupCodes(!showBackupCodes)}
            className="flex items-center gap-2 text-brand-red font-body text-sm hover:underline"
          >
            {showBackupCodes ? <EyeOff size={14} /> : <Eye size={14} />}
            {showBackupCodes ? 'Ocultar códigos' : 'Mostrar códigos'}
          </button>
        </div>

        {showBackupCodes && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {backupCodes.map((code, index) => (
              <div
                key={index}
                className="p-2 bg-white border border-brand-black font-mono text-sm text-center tracking-wider"
              >
                {code}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(backupCodes.join('\n'))
            }}
            className="flex-1 py-2 border-2 border-brand-black font-display text-xs tracking-wider hover:bg-brand-black/5 transition-colors flex items-center justify-center gap-2"
          >
            <Copy size={14} />
            COPIAR CÓDIGOS
          </button>
          <button
            onClick={finishSetup}
            className="flex-1 py-2 bg-brand-red text-white font-display text-xs tracking-wider hover:bg-brand-red-dark transition-colors"
          >
            FINALIZAR
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-brand-black p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield size={24} className="text-brand-red" />
        <h3 className="font-display text-xl text-brand-black tracking-wider">
          AUTENTICAÇÃO DE DOIS FATORES
        </h3>
      </div>

      <p className="text-brand-gray font-body text-sm mb-4">
        Adicione uma camada extra de segurança à sua conta. Você precisará de um app de autenticação como Google Authenticator ou Authy.
      </p>

      {step === 'initial' && (
        <button
          onClick={startSetup}
          className="btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-2 px-6 hover:bg-brand-red-dark transition-colors"
        >
          ATIVAR 2FA
        </button>
      )}

      {step === 'showQR' && (
        <div className="space-y-4">
          <div className="p-4 bg-brand-cream border-2 border-brand-black">
            <p className="font-body text-sm text-brand-black mb-2">
              <strong>1.</strong> Abra o app de autenticação
            </p>
            <p className="font-body text-sm text-brand-black mb-2">
              <strong>2.</strong> Escaneie o QR Code abaixo
            </p>
            <p className="font-body text-sm text-brand-black">
              <strong>3.</strong> Digite o código de 6 dígitos
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-4 bg-white border-2 border-brand-black">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeURL)}`}
                alt="QR Code para 2FA"
                className="w-48 h-48"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="hidden w-48 h-48 flex items-center justify-center bg-brand-cream">
                <p className="font-body text-xs text-brand-gray text-center px-4">
                  Não foi possível gerar o QR Code. Use o código manual abaixo.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-brand-cream border border-brand-black">
            <p className="font-mono text-xs text-brand-gray mb-1">Ou digite manualmente:</p>
            <p className="font-mono text-sm text-brand-black font-bold tracking-wider">
              {secret}
            </p>
          </div>

          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-brand-black mb-2">
              CÓDIGO DE VERIFICAÇÃO
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 bg-white border-2 border-brand-black text-brand-black font-mono text-center text-lg tracking-[0.5em] focus:outline-none focus:border-brand-red transition-colors"
              maxLength={6}
            />
          </div>

          {error && (
            <p className="text-brand-red font-body text-sm">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => { setStep('initial'); setError('') }}
              className="flex-1 py-2 border-2 border-brand-black font-display text-xs tracking-wider hover:bg-brand-black/5 transition-colors"
            >
              CANCELAR
            </button>
            <button
              onClick={handleVerify}
              disabled={loading || verificationCode.length !== 6}
              className="flex-1 py-2 bg-brand-red text-white font-display text-xs tracking-wider hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              VERIFICAR
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
