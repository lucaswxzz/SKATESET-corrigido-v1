import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ArrowRight, Target, Eye, Heart, Users, BookOpen, Zap, Shield } from 'lucide-react'

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-black py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 font-display text-[180px] text-white leading-none select-none rotate-[-12deg]">
              SK8
            </div>
            <div className="absolute bottom-10 right-10 font-display text-[120px] text-white leading-none select-none rotate-[8deg]">
              SET
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #fff 35px, #fff 36px)'
          }}></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red opacity-20"></div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <div className="inline-block mb-6">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-red border-2 border-brand-red px-3 py-1">
                SkateSet
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-wider mb-6">
              SOBRE O<br />
              <span className="text-brand-red">SKATESET</span>
            </h1>
            <div className="w-24 h-1 bg-brand-red mb-6"></div>
            <p className="text-brand-gray-light font-body text-xl max-w-2xl leading-relaxed">
              Mais que um blog. Uma comunidade de skatistas que acreditam que o skate
              é cultura, identidade e estilo de vida.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target size={24} className="text-brand-red" />
                  <span className="font-mono text-xs tracking-widest uppercase text-brand-red">Nossa Missão</span>
                </div>
                <h2 className="font-display text-4xl text-brand-black tracking-wider mb-6">
                  LEVAR O SKATE<br />PRA TODO MUNDO
                </h2>
                <div className="space-y-4 text-brand-black-soft font-body leading-relaxed">
                  <p>
                    O SkateSet nasceu da paixão genuína pelo skateboarding. Não somos apenas um portal de notícias — somos
                    um ponto de encontro para skatistas de todos os níveis, desde quem está dando os primeiros passos na
                    prancha até veteranos que já desceram milhares de rampas.
                  </p>
                  <p>
                    Nossa missão é democratizar o conhecimento sobre skate, trazendo conteúdos aprofundados sobre técnica,
                    cultura, história e equipamentos. Acreditamos que o skate vai muito além de manobras — é uma forma de
                    expressão, uma comunidade unida e um estilo de vida que transforma pessoas.
                  </p>
                  <p>
                    Cada artigo que publicamos é escrito por skatistas, para skatistas. Não importa se você tá começando
                    agora ou se já manja de tudo — aqui sempre vai ter algo novo pra aprender, uma história pra te
                    inspirar ou uma dica pra melhorar seu game.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white border-2 border-brand-black p-8 shadow-[8px_8px_0px_#DC2626]">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-brand-red mx-auto mb-3 flex items-center justify-center">
                        <BookOpen size={28} className="text-white" />
                      </div>
                      <p className="font-display text-3xl text-brand-black">50+</p>
                      <p className="font-mono text-xs text-brand-gray uppercase tracking-wider">Artigos</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-brand-red mx-auto mb-3 flex items-center justify-center">
                        <Users size={28} className="text-white" />
                      </div>
                      <p className="font-display text-3xl text-brand-black">10K+</p>
                      <p className="font-mono text-xs text-brand-gray uppercase tracking-wider">Leitores</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-brand-red mx-auto mb-3 flex items-center justify-center">
                        <Heart size={28} className="text-white" />
                      </div>
                      <p className="font-display text-3xl text-brand-black">6</p>
                      <p className="font-mono text-xs text-brand-gray uppercase tracking-wider">Categorias</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-brand-red mx-auto mb-3 flex items-center justify-center">
                        <Zap size={28} className="text-white" />
                      </div>
                      <p className="font-display text-3xl text-brand-black">24/7</p>
                      <p className="font-mono text-xs text-brand-gray uppercase tracking-wider">Atualizado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white border-y-2 border-brand-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="font-mono text-xs tracking-widest uppercase text-brand-red">Nossos Valores</span>
              <h2 className="font-display text-4xl text-brand-black tracking-wider mt-2">
                O QUE NOS GUIA
              </h2>
              <div className="editorial-divider mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-brand-cream border-2 border-brand-black p-6 hover:border-brand-red transition-colors">
                <div className="w-14 h-14 bg-brand-red mb-4 flex items-center justify-center">
                  <Eye size={28} className="text-white" />
                </div>
                <h3 className="font-display text-xl text-brand-black tracking-wider mb-3">
                  AUTENTICIDADE
                </h3>
                <p className="font-body text-sm text-brand-black-soft leading-relaxed">
                  Escrevemos com a voz da comunidade. Sem frescura, sem academicismo — conteúdo real, feito por quem
                  vive o skate no dia a dia. Cada artigo reflete a cultura street que define o skate.
                </p>
              </div>

              <div className="bg-brand-cream border-2 border-brand-black p-6 hover:border-brand-red transition-colors">
                <div className="w-14 h-14 bg-brand-red mb-4 flex items-center justify-center">
                  <BookOpen size={28} className="text-white" />
                </div>
                <h3 className="font-display text-xl text-brand-black tracking-wider mb-3">
                  CONHECIMENTO
                </h3>
                <p className="font-body text-sm text-brand-black-soft leading-relaxed">
                  Nosso conteúdo é pesquisado, testado e validado. Desde guias técnicos até histórias da cultura skate,
                  cada informação passa por um rigor editorial para garantir qualidade e precisão.
                </p>
              </div>

              <div className="bg-brand-cream border-2 border-brand-black p-6 hover:border-brand-red transition-colors">
                <div className="w-14 h-14 bg-brand-red mb-4 flex items-center justify-center">
                  <Users size={28} className="text-white" />
                </div>
                <h3 className="font-display text-xl text-brand-black tracking-wider mb-3">
                  COMUNIDADE
                </h3>
                <p className="font-body text-sm text-brand-black-soft leading-relaxed">
                  O skate é coletivo. Criamos espaços para troca de experiência, debate e conexão entre skatistas.
                  Cada comentário, cada compartilhamento fortalece nossa comunidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-mono text-xs tracking-widest uppercase text-brand-red">Nossa História</span>
                <h2 className="font-display text-4xl text-brand-black tracking-wider mt-2 mb-6">
                  DE ONDE VIEMOS
                </h2>
                <div className="space-y-4 text-brand-black-soft font-body leading-relaxed">
                  <p>
                    O SkateSet começou do nada. Literalmente do nada. Só eu, um computador velho e um sonho
                    de criar algo diferente no cenário digital do skate brasileiro. Sem equipe, sem investimento,
                    sem experiência em criar sites — só a vontade de fazer algo que fizesse sentido.
                  </p>
                  <p>
                    No começo, o SkateSet era um site básico que ensinava pessoas a montar seus primeiros setups
                    e aprender as manobras do dia a dia. Eram tutoriais simples, feitos com muito carinho mas
                    sem muito planejamento. O site cresceu, mas eu sentia que podia ser algo maior.
                  </p>
                  <p>
                    Foi aí que resolvi recomeçar tudo do zero. Apaguei o que existia, refiz a identidade visual,
                    reestruturei o conteúdo e criei o SkateSet como ele é hoje — um blog de verdade, com artigos
                    aprofundados, design que respira skate e uma proposta clara: ser a referência que eu sempre
                    quis encontrar quando comecei a patinar.
                  </p>
                  <p>
                    Cada linha de código, cada artigo, cada detalhe de design foi construído do começo. O SkateSet
                    é 100% trabalho próprio, feito por um skatista que acredita que a comunidade merece conteúdo
                    de qualidade, escrito com autenticidade e sem frescura.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-display text-lg text-white">01</span>
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-brand-black tracking-wider">O PRIMEIRO SITE</h4>
                    <p className="font-body text-sm text-brand-gray leading-relaxed">
                      Um site simples que ensinava a montar skate e aprender manobras. Feito com dedicação mas
                      sem experiência. Cresceu, mas senti que podia ser algo muito maior.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-display text-lg text-white">02</span>
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-brand-black tracking-wider">O RECOMEÇO</h4>
                    <p className="font-body text-sm text-brand-gray leading-relaxed">
                      Apaguei tudo e recomecei do zero. Nova identidade visual, novo conceito, novo blog.
                      Dessa vez com mais clareza do que eu queria construir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-display text-lg text-white">03</span>
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-brand-black tracking-wider">O SKATESET DE HOJE</h4>
                    <p className="font-body text-sm text-brand-gray leading-relaxed">
                      Um blog completo, com artigos aprofundados, design autêntico e uma comunidade
                      que vai crescendo. Ainda sou eu sozinho, mas com muito orgulho no que construí.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-brand-black text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="font-mono text-xs tracking-widest uppercase text-brand-red">Equipe</span>
              <h2 className="font-display text-4xl text-white tracking-wider mt-2">
                QUEM FAZ O SKATESET
              </h2>
              <div className="w-20 h-1 bg-brand-red mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-brand-black-soft border-2 border-white/10 p-6 hover:border-brand-red transition-colors">
                <img
                  src="/lucas-perfil.jfif"
                  alt="Lucas Teixeira"
                  className="w-20 h-20 object-cover mb-4 border-2 border-brand-red"
                />
                <h3 className="font-display text-xl text-white tracking-wider mb-1">LUCAS TEIXEIRA</h3>
                <p className="font-mono text-xs text-brand-red tracking-wider uppercase mb-3">Fundador & Editor</p>
                <p className="font-body text-sm text-brand-gray-light leading-relaxed">
                  Sempre fui apaixonado pela comunidade unida de skatistas. O skate pra mim nunca foi só esporte —
                  é estilo de vida, é cultura, é aquela sensação de liberdade quando você tá na prancha.
                  O SkateSet nasceu do desejo de criar um espaço onde essa cultura pudesse ser compartilhada
                  com mais gente, de forma autêntica e sem frescura.
                </p>
              </div>

              <div className="bg-brand-black-soft border-2 border-white/10 p-6 hover:border-brand-red transition-colors">
                <img
                  src="/baixados (3).jfif"
                  alt="Comunidade"
                  className="w-20 h-20 object-cover mb-4 border-2 border-brand-red"
                />
                <h3 className="font-display text-xl text-white tracking-wider mb-1">VOCÊ</h3>
                <p className="font-mono text-xs text-brand-red tracking-wider uppercase mb-3">Comunidade</p>
                <p className="font-body text-sm text-brand-gray-light leading-relaxed">
                  Cada leitor, comentador e compartilhador faz parte da equipe. O SkateSet é
                  construído pela comunidade, para a comunidade. Seu feedback nos melhora a cada dia.
                  Skatistas unidos sempre foram mais fortes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl md:text-5xl text-brand-black tracking-wider mb-6">
              FAÇA PARTE
            </h2>
            <div className="editorial-divider mx-auto mb-6"></div>
            <p className="text-brand-black-soft font-body text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              O SkateSet é mais que um blog — é um movimento. Junte-se a skatistas
              que já fazem parte dessa comunidade. Crie sua conta, comente, compartilhe e
              ajude a crescer essa cultura.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/cadastro"
                className="btn-retro bg-brand-red text-white font-display text-lg tracking-wider py-3 px-8 inline-flex items-center gap-2 hover:bg-brand-red-dark transition-colors"
              >
                CRIAR CONTA
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/"
                className="btn-retro bg-white text-brand-black font-display text-lg tracking-wider py-3 px-8 inline-flex items-center gap-2 hover:bg-brand-cream transition-colors"
              >
                VER ARTIGOS
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-white border-y-2 border-brand-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
              <div>
                <Shield size={24} className="text-brand-red mx-auto mb-3" />
                <h4 className="font-display text-lg text-brand-black tracking-wider mb-2">CONTATO</h4>
                <p className="font-body text-sm text-brand-gray">contato.skateset@gmail.com</p>
              </div>
              <div>
                <Heart size={24} className="text-brand-red mx-auto mb-3" />
                <h4 className="font-display text-lg text-brand-black tracking-wider mb-2">SUPORTE</h4>
                <p className="font-body text-sm text-brand-gray">Estamos aqui para ajudar</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
