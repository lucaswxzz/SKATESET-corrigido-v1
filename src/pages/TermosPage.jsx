import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ArrowLeft, FileText, Shield, AlertTriangle, Users, Copyright, Mail } from 'lucide-react'

export default function TermosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-black py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 font-display text-[150px] text-white leading-none select-none rotate-[-12deg]">
              TERM
            </div>
            <div className="absolute bottom-10 right-10 font-display text-[100px] text-white leading-none select-none rotate-[8deg]">
              OS
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
              <FileText size={32} className="text-brand-red" />
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider">
                TERMOS DE USO
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
                  Bem-vindo ao SkateSet. Ao acessar e utilizar nosso site, você concorda com estes Termos de Uso.
                  Por favor, leia atentamente antes de continuar. Se não concordar com algum dos termos,
                  não utilize o site.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">1</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    ACEITAÇÃO DOS TERMOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Ao acessar o SkateSet (www.skateset.com.br), você aceita e concorda em ficar vinculado
                    a estes Termos de Uso. Estes termos podem ser atualizados a qualquer momento sem aviso prévio.
                    O uso continuado do site após as alterações constitui aceitação das mudanças.
                  </p>
                  <p>
                    Se você for menor de idade, precisa ter o consentimento de um responsável legal para
                    utilizar o site e criar uma conta. O SkateSet não se responsabiliza pelo uso indevido
                    por parte de menores de idade sem supervisão.
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
                    USO DO SITE
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    O SkateSet é um blog de conteúdo sobre skate, cultura e história. O conteúdo disponibilizado
                    é de caráter informativo e educacional. Você pode:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Ler e compartilhar os artigos do site</li>
                    <li>Criar uma conta para comentar e interagir</li>
                    <li>Utilizar o conteúdo para uso pessoal e não comercial</li>
                    <li>Citar trechos dos artigos com devida atribuição</li>
                  </ul>
                  <p>
                    É proibido utilizar o site para fins ilegais, reproduzir conteúdo sem autorização,
                    ou qualquer atividade que possa danificar o site ou seus usuários. Também é vedado
                    o uso de robots, scrapers ou qualquer ferramenta automatizada para coletar conteúdo
                    do site sem autorização expressa.
                  </p>
                  <p>
                    O SkateSet reserva-se o direito de bloquear o acesso de usuários que realizarem
                    atividades abusivas ou que violem os presentes termos.
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
                    PROPRIEDADE INTELECTUAL
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Todo o conteúdo do SkateSet — textos, imagens, logotipos, design e código — é protegido
                    por direitos autorais. O conteúdo é de propriedade do SkateSet ou de seus parceiros
                    de conteúdo, e não pode ser reproduzido, distribuído ou modificado sem autorização prévia.
                  </p>
                  <p>
                    Você pode compartilhar nossos artigos nas redes sociais, desde que mantenha os créditos
                    e o link para o artigo original. Para usos comerciais ou reprodução em outros veículos,
                    entre em contato para solicitar autorização.
                  </p>
                  <p>
                    As marcas registradas, logotipos e elementos visuais do SkateSet são de propriedade
                    exclusiva e não podem ser utilizados sem autorização, mesmo em referência ao site.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">4</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    CONTA DE USUÁRIO
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Para acessar certas funcionalidades, como comentários, você pode precisar criar uma conta.
                    Ao criar uma conta, você concorda em:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Fornecer informações verdadeiras e precisas</li>
                    <li>Manter a segurança da sua senha</li>
                    <li>Notificar-nos sobre qualquer uso não autorizado da sua conta</li>
                    <li>Não compartilhar sua conta com terceiros</li>
                    <li>Não utilizar nome de usuário ofensivo ou que infrinja direitos de terceiros</li>
                  </ul>
                  <p>
                    O SkateSet reserva-se o direito de suspender ou excluir contas que violem estes termos,
                    que apresentem comportamento tóxico nos comentários, ou que sejam utilizadas de forma
                    inadequada. Você pode solicitar a exclusão da sua conta a qualquer momento através do
                    nosso canal de contato.
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
                    ISENÇÃO DE RESPONSABILIDADE
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    O conteúdo do SkateSet é fornecido "como está", sem garantias de qualquer tipo.
                    Embora nos esforcemos para manter o conteúdo atualizado e preciso, não garantimos
                    que todas as informações estejam sempre corretas ou completas.
                  </p>
                  <p>
                    O SkateSet não se responsabiliza por:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Danos decorrentes do uso do conteúdo do site</li>
                    <li>Erros ou omissões no conteúdo</li>
                    <li>Links para sites de terceiros</li>
                    <li>Interrupções ou indisponibilidade do site</li>
                    <li>Resultados obtidos a partir do uso das informações publicadas</li>
                  </ul>
                  <p>
                    <strong>Importante:</strong> Praticar skate envolve riscos. As informações e dicas
                    publicadas no SkateSet são baseadas em experiência pessoal e não substituem aulas
                    com profissionais. Recomendamos sempre o uso de equipamentos de proteção e a
                    prática em locais apropriados e seguros.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">6</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    PRIVACIDADE
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    A coleta e uso de dados pessoais são regidos pela nossa Política de Privacidade.
                    Ao utilizar o site, você consente com a coleta de dados conforme descrito nessa política.
                  </p>
                  <p>
                    Utilizamos cookies para melhorar sua experiência de navegação, manter sua sessão
                    de login e analisar o tráfego do site. Você pode configurar seu navegador para
                    recusar cookies, mas isso pode afetar o funcionamento de algumas funcionalidades.
                  </p>
                  <p>
                    Dados coletados como nome e email são utilizados apenas para o funcionamento
                    do site (criação de conta e comentários) e não são compartilhados com terceiros
                    para fins comerciais.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">7</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    ALTERAÇÕES NOS TERMOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    O SkateSet reserva-se o direito de modificar estes Termos de Uso a qualquer momento.
                    As alterações entram em vigor imediatamente após a publicação no site.
                    Recomendamos que os usuários revisem periodicamente esta página.
                  </p>
                  <p>
                    Quando houver alterações significativas, faremos um aviso em destaque na página
                    inicial do site. O uso continuado após as alterações constitui aceitação dos
                    novos termos.
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
                  Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco.
                  Responderemos o mais breve possível.
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
