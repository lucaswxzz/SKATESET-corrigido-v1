import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray"
      />
      <input
        type="text"
        placeholder="Buscar artigos..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-brand-white border-2 border-brand-black font-body text-sm placeholder:text-brand-gray-light focus:outline-none focus:border-brand-red focus:shadow-[2px_2px_0px_#DC2626] transition-all"
      />
    </div>
  )
}
