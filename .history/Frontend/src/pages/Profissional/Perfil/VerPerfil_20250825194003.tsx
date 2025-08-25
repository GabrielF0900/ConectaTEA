import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obterPerfilProfissional } from "../../../api/protected/axiosPerfil";
import type { Profissional } from "../../../api/protected/axiosProfissionais";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PerfilProfissional() {
  const [openMenu, setOpenMenu] = useState(false);
  const [perfil, setPerfil] = useState<Profissional | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  // Novo: pegar nome do usuário logado
  let nomeUsuarioLogado = "";
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      nomeUsuarioLogado = user.name || user.nome || "Perfil";
    }
  } catch (e) {
    // Se der erro, mantém nomeUsuarioLogado como string vazia
  }

  useEffect(() => {
    let profId: number | null = null;
    if (id) {
      profId = Number(id);
    } else {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setErro("Usuário não autenticado");
        setLoading(false);
        return;
      }
      const user = JSON.parse(userStr);
      profId = user.id;
    }
    if (!profId || isNaN(profId)) {
      setErro("ID de profissional inválido");
      setLoading(false);
      return;
    }
    obterPerfilProfissional(profId)
      .then((data) => {
        setPerfil(data);
        setLoading(false);
        // eslint-disable-next-line no-console
        console.log("perfil.locais:", data?.locais);
      })
      .catch((e) => {
        setErro(e.message);
        setLoading(false);
      });
  }, [id]);

  const irParaPerfil = () => {
    navigate("/profissional/perfil/editar");
  };

  if (loading) return <div className="p-8 text-center">Carregando perfil...</div>;
  if (erro) return <div className="p-8 text-center text-red-500">{erro}</div>;
  if (!perfil) return <div className="p-8 text-center text-gray-500">Perfil não encontrado.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header alinhado com outros layouts */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Ver Perfil</h1>
            <p className="text-sm text-gray-500 mt-1">Visualize os dados do profissional</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-3 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openMenu}
              >
                <img src={perfil?.fotoPerfilUrl || "https://via.placeholder.com/40"} alt="avatar" className="w-9 h-9 rounded-full border" />
                <div className="text-left">
                  <div className="font-semibold">{nomeUsuarioLogado}</div>
                  <div className="text-xs bg-green-100 text-green-600 rounded px-2 py-1">PROFISSIONAL</div>
                </div>
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setOpenMenu(false)}>Ver Perfil</button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setOpenMenu(false)}>Configurações</button>
                  <div className="border-t" />
                  <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50" onClick={() => setOpenMenu(false)}>Sair</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex justify-center">
          {/* Card */}
          <div className="bg-white shadow-md rounded-2xl max-w-3xl w-full p-6 sm:p-10">
            {/* Foto + Nome */}
            <div className="flex flex-col items-center">
              <img
                src={perfil.fotoPerfilUrl || "https://via.placeholder.com/120"}
                alt="Foto de Perfil"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
              />
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">{perfil.nome || perfil.usuario?.nome || "Sem nome"}</h2>
              <p className="text-green-600 text-lg font-medium">
                {perfil.especialidade && perfil.especialidade.trim() !== ""
                  ? (<>{perfil.especialidade}</>)
                  : (
                    <span title="Informe sua especialidade profissional, ex: Psicólogo Clínico, Terapeuta Ocupacional, Fonoaudiólogo...">
                      Especialidade <span className="text-gray-400 text-sm">(ex: Psicólogo Clínico)</span>
                    </span>
                  )}
              </p>
              <span className="mt-1 text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700"># {perfil.codigoIdentificacao || ""}</span>
            </div>

            {/* Conteúdo */}
            <div className="mt-8 space-y-6">
              {/* Formação */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Formação Acadêmica</h2>
                <div className="flex items-center mt-2 text-gray-700">
                  <FaUniversity className="text-green-600 mr-2" />
                  <span>{perfil.formacaoAcademica || ""}</span>
                </div>
              </div>

              {/* Sobre */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Sobre</h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {perfil.sobre || ""}
                </p>
              </div>

              {/* Contato */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Informações de Contato</h2>
                <div className="mt-2 space-y-2 text-gray-700">
                  <div className="flex items-center">
                    <FaPhoneAlt className="text-green-600 mr-2" />
                    <span>{perfil.telefone || perfil.usuario?.telefone || ""}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-green-600 mr-2" />
                    <span>{perfil.email || perfil.usuario?.email || ""}</span>
                  </div>
                  <div className="flex items-center">
                    <FaLinkedin className="text-green-600 mr-2" />
                    {perfil.redes?.linkedin ? (
                      <a href={perfil.redes.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                        {perfil.redes.linkedin}
                      </a>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Locais de Atendimento */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Locais de Atendimento</h2>
                {perfil.locais && perfil.locais.length > 0 ? (
                  <ul className="mt-2 space-y-1">
                    {perfil.locais.map((local, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="text-green-600 mr-2" />
                        <span className="font-medium">{local.nome || "-"}</span>
                        {local.cidade && (
                          <span className="ml-2 text-gray-400">{local.cidade}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center mt-2 text-gray-700">
                    <FaMapMarkerAlt className="text-green-600 mr-2" />
                    <span>-</span>
                  </div>
                )}
              </div>
            </div>

            {/* Botão Editar */}
            <div className="mt-8 flex justify-center">
              <button onClick={irParaPerfil} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">Editar Perfil</button>
            </div>
          </div>
        </div>
    </div>
  );
}
