import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ArrowLeft, Cookie, Settings, BarChart, Megaphone, Shield, Mail } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-black py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 font-display text-[150px] text-white leading-none select-none rotate-[-12deg]">
              COOK
            </div>
            <div className="absolute bottom-10 right-10 font-display text-[100px] text-white leading-none select-none rotate-[8deg]">
              IES
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
              <Cookie size={32} className="text-brand-red" />
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider">
                USO DE COOKIES
              </h1>
            </div>
            <div className="w-24 h-1 bg-brand-red mb-4"></div>
            <p className="text-brand-gray-light font-body text-lg">
              Última atualização: Julho 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white border-2 border-brand-black p-8 md:p-12 shadow-[4px_4px_0px_#1A1A1A]">

              {/* Intro */}
              <div className="mb-8 pb-6 border-b-2 border-brand-black/10">
                <p className="text-brand-black-soft font-body leading-relaxed">
                  Esta página descreve como o SkateSet utiliza cookies e tecnologias similares
                  para melhorar sua experiência de navegação.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">1</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    O QUE SÃO COOKIES?
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Cookies são pequenos arquivos de texto que são armazenados no seu computador
                    ou dispositivo móvel quando você visita um site. Eles são amplamente utilizados
                    para fazer os sites funcionarem de forma mais eficiente e fornecer informações
                    aos proprietários do site.
                  </p>
                  <p>
                    Os cookies permitem que o site lembre suas ações e preferências (como login,
                    idioma, tamanho da fonte e outras preferências de exibição) durante um período
                    de tempo, para que você não precise configurá-las novamente toda vez que visitar
                    o site ou navegar entre páginas.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">2</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    COMO UTILIZAMOS COOKIES
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Utilizamos cookies por diversas razões, descritas abaixo. Infelizmente, na maioria
                    dos casos, não existem opções padrão da indústria para desativar cookies sem
                    desativar completamente a funcionalidade e os recursos que eles adicionam ao site.
                  </p>
                  <p>
                    Você pode impedir a configuração de cookies, ajustando as configurações do seu
                    navegador (veja a seção "Como controlar cookies" abaixo). No entanto, isso
                    pode afetar a funcionalidade do site.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">3</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    TIPOS DE COOKIES QUE UTILIZAMOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-4 pl-11">

                  {/* Necessary Cookies */}
                  <div className="p-4 bg-brand-cream border-2 border-brand-black">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield size={18} className="text-brand-red" />
                      <h3 className="font-display text-lg text-brand-black tracking-wider">
                        COOKIES NECESSÁRIOS
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                      Essenciais para o funcionamento do site. Permitem o login, segurança básica
                      e navegação entre páginas. Sem esses cookies, o site não funciona corretamente.
                    </p>
                    <p className="text-xs text-brand-gray mt-2 font-mono">
                      Exemplos: sessão de login, preferências de cookies, segurança
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 bg-brand-cream border-2 border-brand-black">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart size={18} className="text-brand-red" />
                      <h3 className="font-display text-lg text-brand-black tracking-wider">
                        COOKIES DE ANALYTICS
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                      Nos ajudam a entender como os visitantes interagem com o site, coletando
                      informações de forma anônima. Isso nos permite melhorar a experiência
                      de navegação e o conteúdo do site.
                    </p>
                    <p className="text-xs text-brand-gray mt-2 font-mono">
                      Exemplos: páginas mais visitadas, tempo de permanência, origem do tráfego
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-4 bg-brand-cream border-2 border-brand-black">
                    <div className="flex items-center gap-3 mb-2">
                      <Megaphone size={18} className="text-brand-red" />
                      <h3 className="font-display text-lg text-brand-black tracking-wider">
                        COOKIES DE MARKETING
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                      Utilizados para rastrear visitantes entre sites e exibir anúncios relevantes.
                      No momento, o SkateSet não utiliza cookies de marketing.
                    </p>
                    <p className="text-xs text-brand-gray mt-2 font-mono">
                      Status: Não utilizados atualmente
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">4</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    COOKIES DE TERCEIROS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Em alguns casos especiais, utilizamos cookies fornecidos por terceiros
                    confiáveis. A seção abaixo detalha quais cookies de terceiros podem
                    surgir ao utilizar este site:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <strong>Google Analytics</strong> — Um dos serviços de análise mais
                      populares e confiáveis da web, que nos ajuda a entender como você
                      usa o site e como podemos melhorar sua experiência.
                    </li>
                  </ul>
                  <p>
                    Esses serviços de terceiros são regidos pelas respectivas políticas de
                    privacidade e não temos controle sobre os cookies que eles utilizam.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">5</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    COMO CONTROLAR COOKIES
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Você pode controlar e/ou desativar cookies através das configurações do seu
                    navegador. Lembre-se de que se você desativar cookies, algumas funcionalidades
                    deste site podem não funcionar corretamente.
                  </p>
                  <p>
                    Links para as configurações de cookies dos navegadores mais populares:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Chrome:</strong> Configurações → Privacidade → Cookies</li>
                    <li><strong>Firefox:</strong> Opções → Privacidade → Cookies</li>
                    <li><strong>Safari:</strong> Preferências → Privacidade</li>
                    <li><strong>Edge:</strong> Configurações → Privacidade → Cookies</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">6</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    SUAS PREFERÊNCIAS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Quando você visita o site pela primeira vez, exibimos um banner de consentimento
                    de cookies que permite aceitar todos os cookies, rejeitar todos ou configurar
                    suas preferências individualmente.
                  </p>
                  <p>
                    Suas preferências de cookies são salvas no seu navegador e podem ser alteradas
                    a qualquer momento clicando no ícone de cookies no rodapé do site ou visitando
                    esta página.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-12 pt-8 border-t-2 border-brand-black">
                <div className="flex items-center gap-3 mb-4">
                  <Mail size={20} className="text-brand-red" />
                  <h3 className="font-display text-xl text-brand-black tracking-wider">
                    DÚVIDAS?
                  </h3>
                </div>
                <p className="text-brand-black-soft font-body leading-relaxed mb-4">
                  Se você tiver dúvidas sobre nosso uso de cookies, entre em contato conosco.
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contato.skateset@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-retro bg-brand-red text-white font-display text-sm tracking-wider py-2 px-6 hover:bg-brand-red-dark transition-colors"
                >
                  ENVIAR EMAIL
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
