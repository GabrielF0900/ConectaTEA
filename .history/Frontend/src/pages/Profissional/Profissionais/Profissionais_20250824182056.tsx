// src/pages/Profissionais.tsx
import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Linkedin, Facebook, Instagram, Filter, Eye, MessageSquare, Check, UserPlus } from "lucide-react";
import { listarProfissionais, obterProfissionalPorUsuarioId } from "../../../api/protected/axiosProfissionais";
import type { Profissional as ApiProfissional } from "../../../api/protected/axiosProfissionais";



import { enviarSolicitacao, aceitarSolicitacao } from "../../../api/protected/axiosAmizade";
// tipo ConexaoProfissional não é necessário aqui — removido


interface Profissional extends ApiProfissional {
  status: "Online" | "Offline";
  codigo: string;
  locais: string[];
  redes: { linkedin?: string; facebook?: string; instagram?: string };
  areas: string[];
  conectado?: boolean;
  pendente?: boolean;
  avatar?: string;
}

// removed mock data; using real data from API

export default function Profissionais() {
  const [tab, setTab] = useState("todos");
  const [openMenu, setOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const searchDebounceRef = useRef<number | null>(null);

  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loggedProfissionalId, setLoggedProfissionalId] = useState<number | null>(null);

  // obter usuário logado (tenta 'user' no localStorage, fallback para token)
  function getLoggedUserId(): number | null {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const u = JSON.parse(userData);
        return u?.id ?? u?.userId ?? null;
      } catch {
        return null;
      }
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload?.id ?? payload?.userId ?? null;
      } catch {
        return null;
      }
    }
    return null;
  }

  const loggedUserId = getLoggedUserId();

  async function handleConectar(prof: Profissional) {
    if (!loggedUserId) return;
    try {
      // Preferir enviar ids de profissional quando já tivermos o id do profissional logado
      let solicitanteProfId = loggedProfissionalId;

      if (!solicitanteProfId) {
        // tentar resolver profissional do usuário logado em tempo de envio (pode não ter sido carregado ainda)
        try {
          const profLog = await obterProfissionalPorUsuarioId(loggedUserId);
          if (profLog && profLog.id) {
            solicitanteProfId = profLog.id;
            setLoggedProfissionalId(profLog.id);
          }
        } catch (e) {
          console.warn('Não foi possível resolver profissional do usuário logado antes de enviar solicitação:', e);
        }
      }

      if (solicitanteProfId) {
        // enviar solicitanteProfId e solicitadoProfId para o backend
        await enviarSolicitacao(solicitanteProfId, prof.id, { tipo: 'prof' });
      } else {
        // usuário logado não possui perfil profissional — evitar envio que causaria 404
        console.error('Você precisa ter um perfil profissional para enviar solicitações.');
        return;
      }
      }
      setProfissionais((prev) => prev.map((p) => (p.id === prof.id ? { ...p, pendente: true } : p)));
    } catch (err) {
      console.error("Erro ao enviar solicitação:", err);
    }
  }

  async function handleAceitar(prof: Profissional) {
    // precisamos enviar ids de profissional (solicitante_id, solicitado_id)
    if (!loggedProfissionalId) return;
    try {
  await aceitarSolicitacao(loggedProfissionalId, prof.id, { tipo: 'prof' });
      setProfissionais((prev) => prev.map((p) => (p.id === prof.id ? { ...p, pendente: false, conectado: true } : p)));
    } catch (err) {
      console.error("Erro ao aceitar solicitação:", err);
    }
  }

  useEffect(() => {
    async function carregar() {
  // Busca e popula a lista de profissionais (fetchProfissionais já faz o mapeamento)
  await fetchProfissionais();

  // Se temos um usuário logado, tenta resolver o profissional associado
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      let userId: number | null = null;
      if (userData) {
        try {
          const u = JSON.parse(userData);
          userId = u?.id ?? u?.userId ?? null;
        } catch (err) {
          console.warn("Erro ao parsear userData:", err);
        }
      }
      if (!userId && token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          userId = payload?.id ?? payload?.userId ?? null;
        } catch (err) {
          console.warn("Erro ao decodificar token:", err);
        }
      }

      if (userId) {
        try {
          const profLog = await obterProfissionalPorUsuarioId(userId);
          if (profLog && profLog.id) setLoggedProfissionalId(profLog.id);
        } catch (err) {
          console.warn("Erro ao obter profissional do usuário logado:", err);
        }
      }
    }

    carregar();
  }, []);

  // Busca profissionais, opcionalmente usando o parâmetro de search
  async function fetchProfissionais(search?: string) {
    try {
      setSearching(!!search);
      const dados = await listarProfissionais(search ? { search } : undefined);
      const mapeados: Profissional[] = dados.map((d) => ({
        ...d,
        status: (d as unknown as Profissional).status ?? "Offline",
        codigo: (d as unknown as Profissional).codigo ?? "",
        locais: (d as unknown as Profissional).locais ?? [],
        redes: (d as unknown as Profissional).redes ?? {},
        areas: (d as unknown as Profissional).areas ?? [],
        conectado: false,
        pendente: false,
      }));

      setProfissionais(mapeados);
    } catch (err) {
      console.error("Erro ao buscar profissionais:", err);
    } finally {
      setSearching(false);
    }
  }

  // debounce do input de busca
  useEffect(() => {
    if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current);
    // se campo vazio, busca todos
    searchDebounceRef.current = window.setTimeout(() => {
      fetchProfissionais(searchInput.trim() || undefined);
    }, 300) as unknown as number;

    return () => {
      if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current);
    };
  }, [searchInput]);

  const conexoesCount = profissionais.filter((p) => p.conectado).length;
  const displayed = tab === "todos" ? profissionais : profissionais.filter((p) => p.conectado);

  

  return (
    <div className="h-full bg-[#f8f9fb]">
      {/* Top header bar (title + actions) */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Title + subtitle in header */}
          <div>
            <h1 className="text-2xl font-bold">Rede de Profissionais</h1>
            <p className="text-sm text-gray-500 mt-1">Conecte-se e colabore com outros profissionais de saúde</p>
          </div>

          {/* Actions on the right */}
          <div className="flex items-center gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <span className="text-lg">+</span>
              Adicionar
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18H3V3h6z" />
              </svg>
            </button>
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-3 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openMenu}
              >
                <img
                  src="/conectatea.svg"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
                <div className="text-left">
                  <div className="font-semibold">{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).name || JSON.parse(localStorage.getItem('user') as string).nome : 'Perfil'}</div>
                  <div className="text-xs bg-green-100 text-green-600 rounded px-2 py-1">PROFISSIONAL</div>
                </div>
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpenMenu(false)}
                  >
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2z"/></svg>
                    Ver Perfil
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpenMenu(false)}
                  >
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                    Configurações
                  </button>
                  <div className="border-t" />
                  <button
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    onClick={() => setOpenMenu(false)}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
  <main className="max-w-7xl mx-auto px-4 p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("todos")}
            className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 ${
              tab === "todos"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border border-green-200 hover:bg-green-50"
            }`}
          >
            Todos os Profissionais
          </button>
          <button
            onClick={() => setTab("conexoes")}
            className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 ${
              tab === "conexoes"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border border-green-200 hover:bg-green-50"
            }`}
          >
            Minhas Conexões ({conexoesCount})
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 items-center mb-6 bg-white p-4 rounded-lg shadow">
      <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400 w-5 h-5" />
            </div>
            <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={searching ? "Buscando..." : "Buscar por nome ou especialidade..."}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {/* Sugestões de busca (aparecem apenas quando há texto no input) */}
            {searchInput.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-40">
                    {searching ? (
                  <div className="p-3 text-sm text-gray-600">Buscando...</div>
                ) : profissionais.length === 0 ? (
                  <div className="p-3 text-sm text-gray-600">Nenhum profissional encontrado</div>
                ) : (
                  <ul className="max-h-56 overflow-auto">
                    {profissionais.slice(0, 6).map((p) => (
                      <li key={p.id} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.avatar || "/conectatea.svg"}
                            alt={p.nome}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/conectatea.svg';
                            }}
                          />
                          <div className="text-sm">
                            <div className="font-medium">{p.nome}</div>
                            <div className="text-xs text-gray-500">{p.especialidade}</div>
                          </div>
                        </div>
                        <div>
                          <button onClick={() => handleConectar(p)} className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg">Adicionar</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Todas especialidades</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Todas cidades</option>
          </select>
          <button className="flex items-center gap-1 border rounded-lg px-3 py-2 text-sm">
            <Filter className="w-4 h-4" /> Limpar
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((prof) => (
            <article key={prof.id} className="bg-white rounded-xl shadow p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={prof.avatar || "/conectatea.svg"}
                  alt={prof.nome}
                  className="w-14 h-14 rounded-full border"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/conectatea.svg';
                  }}
                />
                <div>
                  <h2 className="font-semibold">{prof.nome}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">{prof.especialidade}</span>
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {prof.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{prof.codigo}</span>
                </div>
              </div>

              <div className="mb-3 text-sm">
                <h3 className="font-medium">Locais de atendimento</h3>
                {prof.locais.map((local, i) => (
                  <p key={i} className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" /> {local}
                  </p>
                ))}
              </div>

              <div className="mb-3 text-sm">
                <h3 className="font-medium">Redes sociais</h3>
                <div className="flex gap-3 mt-1">
                  {prof.redes.linkedin && <Linkedin className="w-5 h-5 text-blue-600 cursor-pointer" />}
                  {prof.redes.facebook && <Facebook className="w-5 h-5 text-blue-500 cursor-pointer" />}
                  {prof.redes.instagram && <Instagram className="w-5 h-5 text-pink-500 cursor-pointer" />}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {prof.areas.map((area, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded-lg text-xs">{area}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-3 border-t">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 bg-white hover:bg-gray-50">
                    <Eye className="w-4 h-4 text-gray-600" />
                    Ver Perfil
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {prof.conectado ? (
                    <div className="flex items-center gap-2 bg-green-500 text-white rounded-lg px-4 py-2">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Conectado</span>
                    </div>
                  ) : prof.pendente ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleAceitar(prof)} className="flex items-center gap-2 border border-green-200 text-green-600 rounded-lg px-4 py-2 hover:bg-green-50">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Aceitar</span>
                      </button>
                      <div className="text-xs text-orange-600 px-3">Pendente</div>
                    </div>
                  ) : (
                    <button onClick={() => handleConectar(prof)} className="flex items-center gap-2 border border-green-200 text-green-600 rounded-lg px-4 py-2 hover:bg-green-50">
                      <UserPlus className="w-4 h-4" />
                      <span className="text-sm">Conectar</span>
                    </button>
                  )}

                  <button className="w-9 h-9 rounded-full border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-50">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
