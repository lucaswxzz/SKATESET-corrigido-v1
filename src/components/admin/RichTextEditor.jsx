import { useRef, useState } from 'react'
import { Bold, Italic, Heading1, Heading2, List, Image, Link, Code } from 'lucide-react'

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null)
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  function execCommand(command, value = null) {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  function handleFormat(command) {
    execCommand(command)
  }

  function handleHeading(level) {
    execCommand('formatBlock', `<h${level}>`)
  }

  function handleList() {
    execCommand('insertUnorderedList')
  }

  function handleImage() {
    if (imageUrl) {
      execCommand('insertImage', imageUrl)
      setImageUrl('')
      setShowImageInput(false)
    }
  }

  function handleLink() {
    const url = prompt('Digite a URL do link:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  function handleCode() {
    execCommand('formatBlock', '<pre>')
  }

  function handleInput() {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  return (
    <div className="border-2 border-brand-black bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b-2 border-brand-black bg-brand-cream">
        <button
          type="button"
          onClick={() => handleFormat('bold')}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Negrito"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('italic')}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Itálico"
        >
          <Italic size={16} />
        </button>

        <div className="w-px h-6 bg-brand-black/20 mx-1"></div>

        <button
          type="button"
          onClick={() => handleHeading(1)}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Título 1"
        >
          <Heading1 size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleHeading(2)}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Título 2"
        >
          <Heading2 size={16} />
        </button>

        <div className="w-px h-6 bg-brand-black/20 mx-1"></div>

        <button
          type="button"
          onClick={handleList}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Lista"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => setShowImageInput(!showImageInput)}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Inserir Imagem"
        >
          <Image size={16} />
        </button>
        <button
          type="button"
          onClick={handleLink}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Inserir Link"
        >
          <Link size={16} />
        </button>
        <button
          type="button"
          onClick={handleCode}
          className="p-2 hover:bg-brand-black hover:text-white transition-colors"
          title="Código"
        >
          <Code size={16} />
        </button>
      </div>

      {/* Image URL Input */}
      {showImageInput && (
        <div className="flex items-center gap-2 p-2 bg-brand-cream border-b-2 border-brand-black">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL da imagem..."
            className="flex-1 px-3 py-2 border-2 border-brand-black text-sm focus:outline-none focus:border-brand-red"
          />
          <button
            type="button"
            onClick={handleImage}
            className="px-4 py-2 bg-brand-red text-white text-sm font-bold hover:bg-brand-red-dark transition-colors"
          >
            Inserir
          </button>
          <button
            type="button"
            onClick={() => setShowImageInput(false)}
            className="px-4 py-2 bg-gray-200 text-brand-black text-sm font-bold hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[400px] p-4 focus:outline-none prose prose-lg max-w-none"
        style={{
          lineHeight: '1.7',
        }}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* Editor Styles */}
      <style>{`
        .prose h1 { font-family: 'Bebas Neue', Impact, sans-serif; font-size: 2.5rem; margin: 1rem 0; }
        .prose h2 { font-family: 'Bebas Neue', Impact, sans-serif; font-size: 1.75rem; margin: 1rem 0; }
        .prose p { margin: 0.75rem 0; }
        .prose ul { margin: 0.75rem 0; padding-left: 1.5rem; list-style-type: disc; }
        .prose ol { margin: 0.75rem 0; padding-left: 1.5rem; list-style-type: decimal; }
        .prose img { max-width: 100%; height: auto; margin: 1rem 0; border: 2px solid #1A1A1A; }
        .prose a { color: #DC2626; text-decoration: underline; }
        .prose a:hover { color: #B91C1C; }
        .prose pre { background: #1A1A1A; color: #FAFAFA; padding: 1rem; margin: 1rem 0; font-family: 'JetBrains Mono', monospace; overflow-x: auto; }
        .prose blockquote { border-left: 4px solid #DC2626; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6B7280; }
      `}</style>
    </div>
  )
}
