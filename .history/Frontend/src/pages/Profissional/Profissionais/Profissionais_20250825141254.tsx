// src/pages/Profissionais.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, MapPin, Linkedin, Facebook, Instagram, Filter, Eye, MessageSquare, Check, UserPlus } from "lucide-react";
import { listarProfissionais, obterProfissionalPorUsuarioId } from "../../../api/protected/axiosProfissionais";
import { enviarSolicitacao, aceitarSolicitacao, listarSolicitacoesRecebidas, listarSolicitacoesEnviadas, listarConexoesPorProfissional, removerSolicitacao } from "../../../api/protected/axiosAmizade";
import type { Profissional as ApiProfissional } from "../../../api/protected/axiosProfissionais";

type StatusProfissional = "Online" | "Offline";
type RequestStatus = "received" | "sent" | "connected";

interface Profissional extends ApiProfissional {
  status: StatusProfissional;
  codigo?: string;
  conectado?: boolean;
  requestStatus?: RequestStatus;
  avatar?: string;
}

export default function Profissionais() {
  const [tab, setTab] = useState("todos");
  const [openMenu, setOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const searchDebounceRef = useRef<number | null>(null);

  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loggedProfissionalId, setLoggedProfissionalId] = useState<number | null>(null);

  const getLoggedUserId = (): number | null => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try { return JSON.parse(userData)?.id ?? JSON.parse(userData)?.userId ?? null; } 
      catch { return null; }
    }
    const token = localStorage.getItem("token");
    if (token) {
      try { return JSON.parse(atob(token.split(".")[1]))?.id ?? JSON.parse(atob(token.split(".")[1]))?.userId ?? null; }
      catch { return null; }
    }
    return null;
  };

  const loggedUserId = getLoggedUserId();

  // Helpers internos
  const getRedeUrl = (prof: Profissional, tipo: string) =>
    prof.redes?.[tipo.toLowerCase()]
    ?? prof.redesArray?.find(r => r.tipo?.toLowerCase() === tipo.toLowerCase())?.url
    ?? prof.redesSociais?.find(r => r.tipo?.toLowerCase() === tipo.toLowerCase())?.url
    ?? null;

  const atualizarProfissionalLocal = (id: number, dados: Partial<Profissional>) => {
    setProfissionais(prev => prev.map(p => p.id === id ? { ...p, ...dados } : p));
  };

  const fetchProfissionais = useCallback(async (search?: string) => {
    try {
      setSearching(!!search);
      const dados = await listarProfissionais(search ? { search } : undefined);
      const mapeados: Profissional[] = dados.map(d => ({
        ...d,
        status: (d as any).status ?? "Offline",
        codigo: d.codigoIdentificacao ?? "",
        avatar: d.fotoPerfilUrl ?? undefined,
        conectado: false,
        requestStatus: undefined
      }));

      const filtrados = mapeados.filter(p => !(loggedUserId && p.usuario_id === loggedUserId) && !(loggedProfissionalId && p.id === loggedProfissionalId));
      setProfissionais(filtrados);

      if (loggedUserId) {
        const [recebidas, enviadas] = await Promise.all([
          listarSolicitacoesRecebidas(loggedUserId),
          listarSolicitacoesEnviadas(loggedUserId)
        ]);

        const recebidasIds = new Set(recebidas.map(r => r.solicitante_id));
        const enviadasIds = new Set(enviadas.map(r => r.solicitado_id));

        setProfissionais(prev => prev.map(p => ({
          ...p,
          requestStatus: recebidasIds.has(p.id) ? "received" : enviadasIds.has(p.id) ? "sent" : undefined
        })));

        if (loggedProfissionalId) {
          try {
            const conex = await listarConexoesPorProfissional(loggedProfissionalId);
            const connectedIds = new Set<number>();
            conex.forEach(c => { connectedIds.add(c.solicitante_id); connectedIds.add(c.solicitado_id); });
            setProfissionais(prev => prev.map(p => ({ ...p, conectado: connectedIds.has(p.id) })));
          } catch {}
        }
      }
    } catch (err) {
      console.error("Erro ao buscar profissionais:", err);
    } finally { setSearching(false); }
  }, [loggedUserId, loggedProfissionalId]);

  const handleConectar = async (prof: Profissional) => {
    if (!loggedUserId) return;
    let solicitanteProfId = loggedProfissionalId;

    if (!solicitanteProfId) {
      try {
        const profLog = await obterProfissionalPorUsuarioId(loggedUserId);
        if (profLog?.id) { solicitanteProfId = profLog.id; setLoggedProfissionalId(profLog.id); }
      } catch {}
    }

    try {
      if (solicitanteProfId) await enviarSolicitacao(solicitanteProfId, prof.id, { tipo: 'prof' });
      else await enviarSolicitacao(loggedUserId, prof.usuario_id ?? prof.id);

      atualizarProfissionalLocal(prof.id, { requestStatus: "sent" });
    } catch (err) { console.error("Erro ao enviar solicitação:", err); }
  };

  const handleAceitar = async (prof: Profissional) => {
    if (!loggedProfissionalId) return;
    try {
      await aceitarSolicitacao(prof.id, loggedProfissionalId, { tipo: 'prof' });
      atualizarProfissionalLocal(prof.id, { requestStatus: undefined, conectado: true });
      // recarregar conexões
      const conex = await listarConexoesPorProfissional(loggedProfissionalId);
      const connectedIds = new Set<number>();
      conex.forEach(c => { connectedIds.add(c.solicitante_id); connectedIds.add(c.solicitado_id); });
      setProfissionais(prev => prev.map(p => ({ ...p, conectado: connectedIds.has(p.id) })));
    } catch (err) { console.error(err); }
  };

  const handleRecusar = async (prof: Profissional) => {
    if (!loggedProfissionalId) return;
    try {
      await removerSolicitacao(prof.id, loggedProfissionalId, { tipo: 'prof' });
      atualizarProfissionalLocal(prof.id, { requestStatus: undefined, conectado: false });
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    async function carregar() {
      await fetchProfissionais();
      const userId = getLoggedUserId();
      if (userId) {
        try {
          const profLog = await obterProfissionalPorUsuarioId(userId);
          if (profLog?.id) setLoggedProfissionalId(profLog.id);
        } catch {}
      }
    }
    carregar();
  }, [fetchProfissionais]);

  useEffect(() => {
    if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = window.setTimeout(() => {
      fetchProfissionais(searchInput.trim() || undefined);
    }, 300) as unknown as number;

    return () => { if (searchDebounceRef.current) window.clearTimeout(searchDebounceRef.current); };
  }, [searchInput, fetchProfissionais]);

  const conexoesCount = profissionais.filter(p => p.conectado).length;
  const displayed = tab === "todos" ? profissionais : profissionais.filter(p => p.conectado);

  const renderBotao = (prof: Profissional) => {
    if (prof.conectado) return <div className="flex items-center gap-2 bg-green-500 text-white rounded-lg px-4 py-2"><Check className="w-4 h-4" /> Conectado</div>;
    if (prof.requestStatus === "received") return (
      <div className="flex gap-2">
        <button onClick={() => handleAceitar(prof)} className="flex items-center gap-2 border border-green-200 text-green-600 rounded-lg px-4 py-2"><Check className="w-4 h-4" /> Aceitar</button>
        <button onClick={() => handleRecusar(prof)} className="flex items-center gap-2 border border-red-200 text-red-600 rounded-lg px-3 py-2">Recusar</button>
      </div>
    );
    if (prof.requestStatus === "sent") return <div className="text-xs text-orange-600 px-3">Pendente</div>;
    return <button onClick={() => handleConectar(prof)} className="flex items-center gap-2 border border-green-200 text-green-600 rounded-lg px-4 py-2"><UserPlus className="w-4 h-4" /> Conectar</button>;
  };

  return (
    <div className="h-full bg-[#f8f9fb]">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Rede de Profissionais</h1>
            <p className="text-sm text-gray-500 mt-1">Conecte-se e colabore com outros profissionais de saúde</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("todos")} className={`px-4 py-2 rounded-lg border transition-colors ${tab==="todos" ? "bg-green-600 text-white border-green-600":"bg-white text-green-600 border border-green-200 hover:bg-green-50"}`}>Todos os Profissionais</button>
          <button onClick={() => setTab("conexoes")} className={`px-4 py-2 rounded-lg border transition-colors ${tab==="conexoes" ? "bg-green-600 text-white border-green-600":"bg-white text-green-600 border border-green-200 hover:bg-green-50"}`}>Minhas Conexões ({conexoesCount})</button>
        </div>

        {/* Search */}
        <div className="flex flex-wrap gap-3 items-center mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="text-gray-400 w-5 h-5"/></div>
            <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder={searching ? "Buscando..." : "Buscar por nome ou especialidade..."} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map(prof => (
            <article key={prof.id} className="bg-white rounded-xl shadow p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <img src={prof.avatar ?? "/conectatea.svg"} alt={prof.nome ?? ''} className="w-14 h-14 rounded-full border" />
                <div>
                  <h2 className="font-semibold">{`${prof.titulo ? prof.titulo+' ' : ''}${prof.nome ?? ''}`}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">{prof.especialidade ?? ''}</span>
                    <span className="flex items-center gap-1 text-green-600 text-sm"><span className="w-2 h-2 bg-green-500 rounded-full"></span>{prof.status}</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto">{renderBotao(prof)}</div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
