import { useNavigate } from "react-router-dom";

// OBS: Este componente presume que Tailwind CSS já está configurado no projeto.
// Basta importar e usar <ConectaTEALanding /> em sua rota principal.

export default function ConectaTEALanding() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="size-8 sm:size-9 grid place-items-center rounded-full bg-green-500 text-white font-bold">C</div>
            <span className="font-semibold text-sm sm:text-base">ConectaTEA</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              className="px-3 sm:px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              onClick={() => navigate("/login")}
            >
              Entrar
            </button>
            <button 
              className="px-3 sm:px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition inline-flex items-center gap-2"
              onClick={() => navigate("/register")}
            >
              <span>Começar Agora</span>
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-green-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="mx-auto mb-6 size-16 sm:size-20 grid place-items-center rounded-full bg-green-500 text-white text-2xl sm:text-3xl font-bold">C</div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">ConectaTEA</h1>
          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-gray-600">
            Crie sua conta para começar a transformar a vida das crianças
            autistas com amor e cuidado.
          </p>
          <div className="mt-8">
            <button 
              className="px-5 sm:px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition inline-flex items-center gap-2"
              onClick={() => navigate("/register")}
            >
              <span>Criar Conta</span>
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Title */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Recursos que Fazem a Diferença</h2>
            <p className="mt-3 max-w-3xl mx-auto text-gray-600 text-base sm:text-lg">
              Uma plataforma completa para acompanhar o desenvolvimento e
              conectar famílias e profissionais
            </p>
          </div>

          {/* Feature Grid - row 1 */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>}
              iconBg="bg-green-100 text-green-600"
              title="Gestão de Crianças"
              desc="Cadastre e acompanhe informações detalhadas sobre cada criança, incluindo diagnósticos e histórico."
            />
            <FeatureCard
              icon={<svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              iconBg="bg-indigo-100 text-indigo-600"
              title="Metas Personalizadas"
              desc="Defina objetivos específicos e acompanhe o progresso de cada criança de forma individualizada."
            />
            <FeatureCard
              icon={<svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>}
              iconBg="bg-pink-100 text-pink-600"
              title="Acompanhamento de Progresso"
              desc="Visualize o desenvolvimento através de gráficos e relatórios detalhados e intuitivos."
            />
          </div>

          {/* Feature Grid - row 2 */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>}
              iconBg="bg-amber-100 text-amber-600"
              title="Comunicação Integrada"
              desc="Chat direto entre responsáveis e profissionais para troca de informações e atualizações."
            />
            <FeatureCard
              icon={<svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
              iconBg="bg-violet-100 text-violet-600"
              title="Assistente IA"
              desc="Inteligência artificial para sugestões personalizadas e análise de progresso automatizada."
            />
            <FeatureCard
              icon={<svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>}
              iconBg="bg-rose-100 text-rose-600"
              title="Cuidado Personalizado"
              desc="Abordagem individualizada respeitando as necessidades únicas de cada criança autista."
            />
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-green-500 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold">Pronto para Transformar Vidas?</h3>
          <p className="mt-3 max-w-3xl mx-auto text-white/90">
            Junte-se à comunidade ConectaTEA e comece a fazer a diferença hoje mesmo.
          </p>
          <div className="mt-6">
            <button 
              className="px-5 sm:px-6 py-3 rounded-lg bg-white text-green-700 font-semibold hover:bg-white/90 transition inline-flex items-center gap-2"
              onClick={() => navigate("/register")}
            >
              <span>Criar Conta Gratuita</span>
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 grid place-items-center rounded-full bg-green-500 text-white font-bold">C</div>
            <span className="font-semibold">ConectaTEA</span>
            <p className="text-sm text-gray-400 text-center max-w-xl">
              Transformando a vida das crianças autistas com amor e cuidado.
            </p>
            <p className="text-xs text-gray-500">© 2024 ConectaTEA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  desc,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="p-6">
        <div className={`mb-4 size-10 grid place-items-center rounded-full ${iconBg}`}>{icon}</div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="mt-2 text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}