export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white border-t-4 border-brand-red">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top section - Logo */}
        <div className="flex justify-center items-baseline gap-3 mb-8">
          <h2
            className="text-5xl md:text-6xl text-brand-gray-light tracking-wider"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            SKATESET
          </h2>
          <span className="font-display text-2xl text-brand-gray-light tracking-widest">
            blog
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Links section */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          <a href="/sobre" className="font-mono text-xs tracking-widest uppercase text-brand-gray-light hover:text-brand-red transition-colors">
            Sobre
          </a>
          <a href="/termos-de-uso" className="font-mono text-xs tracking-widest uppercase text-brand-gray-light hover:text-brand-red transition-colors">
            Termos de Uso
          </a>
          <a href="/privacidade" className="font-mono text-xs tracking-widest uppercase text-brand-gray-light hover:text-brand-red transition-colors">
            Privacidade
          </a>
          <a href="/cookies" className="font-mono text-xs tracking-widest uppercase text-brand-gray-light hover:text-brand-red transition-colors">
            Uso de Cookies
          </a>
          <a href="/contato" className="font-mono text-xs tracking-widest uppercase text-brand-gray-light hover:text-brand-red transition-colors">
            Contato
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-widest uppercase text-brand-gray">
            &copy; {new Date().getFullYear()} SkateSet. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase text-brand-gray/50 mt-2">
            Feito com paixão por skate
          </p>
        </div>
      </div>
    </footer>
  )
}
