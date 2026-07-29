export default function CategoryFilter({ categorias, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('')}
        className={`px-3 py-1.5 font-body text-xs font-bold uppercase border-2 border-brand-black transition-all ${
          active === ''
            ? 'bg-brand-black text-brand-white'
            : 'bg-brand-white text-brand-black hover:bg-brand-yellow'
        }`}
      >
        Todos
      </button>
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 font-body text-xs font-bold uppercase border-2 border-brand-black transition-all ${
            active === cat
              ? 'bg-brand-black text-brand-white'
              : 'bg-brand-white text-brand-black hover:bg-brand-yellow'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
