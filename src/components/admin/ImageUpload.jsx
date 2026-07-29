import { useState, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage } from '../../lib/api'

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/pjpeg']
const MAX_SIZE = 5 * 1024 * 1024

export default function ImageUpload({ value, onChange }) {
  const [preview, setPreview] = useState(value || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  function validateFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) { setError('Formato não suportado.'); return false }
    if (file.size > MAX_SIZE) { setError('Máximo 5MB.'); return false }
    setError('')
    return true
  }

  function handleFile(file) {
    if (!validateFile(file)) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
      uploadToServer(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  async function uploadToServer(base64) {
    setUploading(true)
    try {
      const result = await uploadImage(base64)
      if (result.success) onChange(result.url)
      else throw new Error(result.error)
    } catch (err) {
      setError('Erro no upload.')
      onChange(base64)
    } finally { setUploading(false) }
  }

  function handleDrop(e) { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]) }
  function handleDragOver(e) { e.preventDefault(); setDragActive(true) }
  function handleDragLeave(e) { e.preventDefault(); setDragActive(false) }
  function handleClick() { fileInputRef.current?.click() }
  function handleChange(e) { if (e.target.files[0]) handleFile(e.target.files[0]) }
  function handleRemove() { setPreview(''); onChange(''); setError('') }

  return (
    <div className="space-y-3">
      <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={handleClick} className={`relative border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${dragActive ? 'border-brand-red bg-brand-red/5' : 'border-brand-black/30 hover:border-brand-red hover:bg-brand-cream'}`}>
        <input ref={fileInputRef} type="file" accept=".jpeg,.jpg,.png,.jfif" onChange={handleChange} className="hidden" />
        {uploading ? (
          <div className="flex flex-col items-center gap-2"><Loader2 size={24} className="text-brand-red animate-spin" /><p className="text-brand-gray text-sm">Enviando...</p></div>
        ) : (
          <div className="flex flex-col items-center gap-2"><Upload size={24} className="text-brand-gray" /><p className="text-brand-gray text-sm">Arraste ou clique</p><p className="text-brand-gray-light text-xs">JPEG, JPG, PNG • 5MB</p></div>
        )}
      </div>
      {preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="w-full max-h-48 object-cover border-2 border-brand-black" />
          <button onClick={handleRemove} className="absolute top-2 right-2 w-6 h-6 bg-brand-red text-white flex items-center justify-center"><X size={14} /></button>
        </div>
      )}
      {error && <p className="text-brand-red text-xs">{error}</p>}
    </div>
  )
}
