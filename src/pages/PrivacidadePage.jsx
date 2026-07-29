import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ArrowLeft, Lock, Mail } from 'lucide-react'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-black py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 font-display text-[150px] text-white leading-none select-none rotate-[-12deg]">
              PRIV
            </div>
            <div className="absolute bottom-10 right-10 font-display text-[100px] text-white leading-none select-none rotate-[8deg]">
              AC
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
              <Lock size={32} className="text-brand-red" />
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wider">
                POLÍTICA DE PRIVACIDADE
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
                  Sua privacidade é importante para nós. Esta Política de Privacidade descreve como o SkateSet
                  coleta, usa e protege suas informações pessoais ao utilizar nosso site.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">1</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    INFORMAÇÕES QUE COLETAMOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Quando você cria uma conta ou interage com o site, podemos coletar as seguintes informações:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Nome</strong> — fornecido no momento do cadastro</li>
                    <li><strong>Email</strong> — utilizado para login e comunicação</li>
                    <li><strong>Dados de navegação</strong> — páginas visitadas, tempo de permanência</li>
                  </ul>
                  <p>
                    Não coletamos informações sensíveis como dados bancários, endereço ou documentos pessoais.
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
                    COMO USAMOS SUAS INFORMAÇÕES
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Suas informações são utilizadas para:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Permitir o funcionamento da sua conta e login</li>
                    <li>Exibir comentários com seu nome</li>
                    <li>Enviar comunicações importantes sobre o site</li>
                    <li>Melhorar a experiência de navegação</li>
                    <li>Gerar estatísticas de uso (de forma anônima)</li>
                  </ul>
                  <p>
                    Não enviamos emails promocionais ou de marketing. Suas informações não serão utilizadas
                    para fins diferentes dos descritos nesta política.
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
                    COMPARTILHAMENTO DE DADOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    O SkateSet <strong>não vende, aluga ou compartilha</strong> suas informações pessoais
                    com terceiros para fins comerciais.
                  </p>
                  <p>
                    Seus dados podem ser compartilhados apenas nas seguintes situações:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Quando exigido por lei ou ordem judicial</li>
                    <li>Para proteger os direitos e a segurança do SkateSet e seus usuários</li>
                    <li>Com prestadores de serviços que auxiliam na operação do site (hospedagem, banco de dados)</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                    <span className="font-consolas text-sm text-white font-bold">4</span>
                  </div>
                  <h2 className="font-display text-2xl text-brand-black tracking-wider">
                    COOKIES
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    O SkateSet utiliza cookies para melhorar sua experiência de navegação. Cookies são
                    pequenos arquivos armazenados no seu navegador que permitem o site funcionar corretamente.
                  </p>
                  <p>
                    Utilizamos cookies para:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Manter sua sessão de login ativa</li>
                    <li> Lembrar suas preferências de navegação</li>
                    <li>Coletar estatísticas de uso (Google Analytics)</li>
                  </ul>
                  <p>
                    Você pode configurar seu navegador para recusar cookies ou ser notificado quando
                    um cookie for enviado. No entanto, algumas funcionalidades do site podem não
                    funcionar corretamente sem cookies.
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
                    SEGURANÇA DOS DADOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    O SkateSet adota medidas de segurança para proteger suas informações contra acesso
                    não autorizado, alteração, divulgação ou destruição.
                  </p>
                  <p>
                    Suas senhas são armazenadas de forma criptografada e não podem ser acessadas
                    nem por nossos administradores. Utilizamos conexão segura (HTTPS) em todo o site.
                  </p>
                  <p>
                    No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico
                    é 100% seguro. Embora nos esforcemos para proteger seus dados, não podemos garantir
                    segurança absoluta.
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
                    SEUS DIREITOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Acesso</strong> — solicitar cópia dos seus dados pessoais</li>
                    <li><strong>Correção</strong> — solicitar correção de dados incorretos</li>
                    <li><strong>Exclusão</strong> — solicitar a exclusão da sua conta e dados</li>
                    <li><strong>Portabilidade</strong> — receber seus dados em formato compatível</li>
                    <li><strong>Revogação</strong> — revogar consentimento a qualquer momento</li>
                  </ul>
                  <p>
                    Para exercer qualquer um desses direitos, entre em contato conosco pelo email
                    indicado ao final desta política.
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
                    RETENÇÃO DE DADOS
                  </h2>
                </div>
                <div className="text-brand-black-soft font-body leading-relaxed space-y-3 pl-11">
                  <p>
                    Seus dados pessoais são mantidos enquanto sua conta estiver ativa. Quando você
                    solicita a exclusão da sua conta, todos os seus dados pessoais são removidos
                    do nosso banco de dados de forma permanente.
                  </p>
                  <p>
                    Dados de navegação e estatísticas podem ser mantidos de forma anônima por tempo
                    indeterminado para fins de melhoria do site.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-12 pt-8 border-t-2 border-brand-black">
                <div className="flex items-center gap-3 mb-4">
                  <Mail size={20} className="text-brand-red" />
                  <h3 className="font-display text-xl text-brand-black tracking-wider">
                    DÚVIDAS SOBRE PRIVACIDADE?
                  </h3>
                </div>
                <p className="text-brand-black-soft font-body leading-relaxed mb-4">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos
                  seus dados, entre em contato conosco.
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
