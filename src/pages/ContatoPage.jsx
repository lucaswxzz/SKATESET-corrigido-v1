import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ArrowLeft, Mail, MessageCircle, MapPin, Clock, Send } from 'lucide-react'

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-black py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 font-display text-[150px] text-white leading-none select-none rotate-[-12deg]">
              FALA
            </div>
            <div className="absolute bottom-10 right-10 font-display text-[100px] text-white leading-none select-none rotate-[8deg]">
              CMG
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)'
          }}></div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2 text-brand-gray-light hover:text-brand-red transition-colors mb-6 font-mono text-xs tracking-widest uppercase group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <MessageCircle size={32} className="text-brand-red" />
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider">
                CONTATO
              </h1>
            </div>
            <div className="w-24 h-1 bg-brand-red mb-4"></div>
            <p className="text-brand-gray-light font-body text-lg max-w-2xl">
              Tem uma sugestão, dúvida ou quer colaborar com o SkateSet? Manda uma mensagem!
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4 space-y-8">

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email Card */}
              <div className="bg-white border-2 border-brand-black p-6 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-red flex items-center justify-center">
                    <Mail size={18} className="text-white" />
                  </div>
                  <h3 className="font-display text-lg text-brand-black tracking-wider">
                    EMAIL
                  </h3>
                </div>
                <p className="font-body text-sm text-brand-gray mb-3">
                  Envie um email direto para nossa equipe.
                </p>
                <a
                  href="mailto:contato.skateset@gmail.com"
                  className="inline-block font-mono text-xs text-brand-red hover:text-brand-red-dark"
                >
                  contato.skateset@gmail.com
                </a>
              </div>

              {/* Response Time Card */}
              <div className="bg-white border-2 border-brand-black p-6 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-red flex items-center justify-center">
                    <Clock size={18} className="text-white" />
                  </div>
                  <h3 className="font-display text-lg text-brand-black tracking-wider">
                    RESPOSTA
                  </h3>
                </div>
                <p className="font-body text-sm text-brand-gray">
                  Respondemos em até 48 horas úteis. Pode ser que demore um pouco mais em
                  fins de semana e feriados.
                </p>
              </div>

              {/* Location Card */}
              <div className="bg-white border-2 border-brand-black p-6 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-red flex items-center justify-center">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <h3 className="font-display text-lg text-brand-black tracking-wider">
                    LOCALIZAÇÃO
                  </h3>
                </div>
                <p className="font-body text-sm text-brand-gray">
                  SkateSet é 100% digital, mas torcemos pelo skate brasileiro de todos os estados!
                </p>
              </div>
            </div>

            {/* Send Message Button */}
            <div className="bg-white border-2 border-brand-black p-8 shadow-[4px_4px_0px_#1A1A1A] text-center">
              <Send size={32} className="text-brand-red mx-auto mb-4" />
              <h2 className="font-display text-2xl text-brand-black tracking-wider mb-3">
                ENVIE UMA MENSAGEM
              </h2>
              <p className="font-body text-sm text-brand-gray mb-6 max-w-md mx-auto">
                Clique no botão abaixo para abrir seu cliente de email e nos enviar uma mensagem diretamente.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contato.skateset@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-3 px-8 hover:bg-brand-red-dark transition-colors"
              >
                <Send size={16} />
                ENVIAR EMAIL
              </a>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-brand-black p-8 shadow-[4px_4px_0px_#1A1A1A]">
              <h2 className="font-display text-2xl text-brand-black tracking-wider mb-6">
                PERGUNTAS FREQUENTES
              </h2>

              <div className="space-y-6">
                <div className="border-b border-brand-black/10 pb-4">
                  <h3 className="font-display text-lg text-brand-black tracking-wider mb-2">
                    Posso sugerir um tema para artigo?
                  </h3>
                  <p className="font-body text-sm text-brand-gray leading-relaxed">
                    Claro! Envie um email com o assunto "Sugerir Conteúdo" e nos conte
                    sobre o que você gostaria de ler. Levamos todas as sugestões em consideração.
                  </p>
                </div>

                <div className="border-b border-brand-black/10 pb-4">
                  <h3 className="font-display text-lg text-brand-black tracking-wider mb-2">
                    Como posso colaborar com o SkateSet?
                  </h3>
                  <p className="font-body text-sm text-brand-gray leading-relaxed">
                    Se você é skatista e quer escrever para o blog, entre em contato
                    com o assunto "Parceria". Estamos sempre abertos a novos colaboradores.
                  </p>
                </div>

                <div className="border-b border-brand-black/10 pb-4">
                  <h3 className="font-display text-lg text-brand-black tracking-wider mb-2">
                    Encontrei um bug no site. Como reporto?
                  </h3>
                  <p className="font-body text-sm text-brand-gray leading-relaxed">
                    Envie um email com o assunto "Reportar Bug" e descreva o problema com o máximo de
                    detalhes possível. Screenshots são muito bem-vindos!
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-brand-black tracking-wider mb-2">
                    Vocês aceitam publicidade?
                  </h3>
                  <p className="font-body text-sm text-brand-gray leading-relaxed">
                    Por enquanto, o SkateSet é um projeto independente. Mas estamos abertos
                    a parcerias que façam sentido com a cultura skate.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
