// PerfilEdit.tsx
import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaIdBadge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { obterPerfilProfissional, atualizarPerfilProfissional } from "../../../api/protected/axiosPerfil";
import type { Profissional } from "../../../api/protected/axiosProfissionais";


export default function PerfilEdit() {
  const [perfil, setPerfil] = useState<Partial<Profissional>>({});
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setErro("Usuário não autenticado");
      setLoading(false);
      return;
    }
    const user = JSON.parse(userStr);
    obterPerfilProfissional(user.id)
      .then((data) => {
        setPerfil(data || {});
        setLoading(false);
      })
      .catch((e) => {
        setErro(e.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setErro("Usuário não autenticado");
      return;
    }
    const user = JSON.parse(userStr);
    try {
      setLoading(true);
      // Montar payload para o backend
      const payload: Record<string, unknown> = {
        nome: perfil.nome,
        email: perfil.email,
        telefone: perfil.telefone,
        especialidade: perfil.especialidade,
        registroProfissional: perfil.registro_profissional,
        titulo: perfil.titulo,
        formacaoAcademica: perfil.formacaoAcademica || "",
        sobre: perfil.sobre || "",
        codigoIdentificacao: perfil.codigoIdentificacao || "",
        fotoPerfilUrl: perfil.fotoPerfilUrl,
        // Incluir redes sociais
        redesSociais: perfil.redes?.linkedin 
          ? [{ tipo: "LINKEDIN", url: perfil.redes.linkedin }]
          : [],
        // Incluir locais de atendimento
        locaisAtendimento: (perfil.locais || [])
          .filter(local => local.nome && local.nome.trim() !== "")
          .map(local => ({
            nome: local.nome,
            cidade: local.cidade || ""
          })),
      };
      await atualizarPerfilProfissional(user.id, payload);
      setLoading(false);
      navigate("/profissional/perfil");
    } catch (e) {
      if (e instanceof Error) setErro(e.message);
      else setErro("Erro desconhecido");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/profissional/perfil");
  };

  if (loading) return <div className="p-8 text-center">Carregando perfil...</div>;
  if (erro) return <div className="p-8 text-center text-red-500">{erro}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <img
            src="/profile-pic.png"
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="w-full mb-2">
            <h2 className="font-bold text-lg mb-1 text-black text-left">Nome</h2>
            <input
              type="text"
              name="nome"
              value={perfil.nome || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full text-center font-semibold"
            />
          </div>
          <div className="w-full mb-4">
            <h2 className="font-bold text-lg mb-1 text-black text-left">Especialidade</h2>
            <input
              type="text"
              name="especialidade"
              value={perfil.especialidade || ""}
              onChange={handleChange}
              placeholder="Especialidade Exemplo: Terapia Ocupacional"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full text-center"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Formação Acadêmica</h2>
          <input
            type="text"
            name="formacaoAcademica"
            value={perfil.formacaoAcademica || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Sobre</h2>
          <textarea
            name="sobre"
            value={perfil.sobre || ""}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Informações de Contato</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaPhone className="text-green-500" />
              <input
                type="text"
                name="telefone"
                value={perfil.telefone || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-green-500" />
              <input
                type="email"
                name="email"
                value={perfil.email || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-green-500" />
              <input
                type="text"
                name="linkedin"
                value={perfil.redes?.linkedin || ""}
                onChange={e => setPerfil({ ...perfil, redes: { ...perfil.redes, linkedin: e.target.value } })}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">Locais de Atendimento</h2>
            {Array.isArray(perfil.locais) && perfil.locais.length > 0 ? (
              perfil.locais.map((local, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-green-500" />
                  <input
                    type="text"
                    placeholder="Nome do local"
                    value={local.nome || ""}
                    onChange={e => {
                      const novosLocais = [...(perfil.locais || [])];
                      novosLocais[idx] = { ...novosLocais[idx], nome: e.target.value };
                      setPerfil({ ...perfil, locais: novosLocais });
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Cidade"
                    value={local.cidade || ""}
                    onChange={e => {
                      const novosLocais = [...(perfil.locais || [])];
                      novosLocais[idx] = { ...novosLocais[idx], cidade: e.target.value };
                      setPerfil({ ...perfil, locais: novosLocais });
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-40"
                  />
                  <button
                    type="button"
                    className="text-red-500 font-bold px-2"
                    title="Remover local"
                    onClick={() => {
                      const novosLocais = (perfil.locais || []).filter((_, i) => i !== idx);
                      setPerfil({ ...perfil, locais: novosLocais });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : null}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
              onClick={() => setPerfil({
                ...perfil,
                locais: [...(perfil.locais || []), { id: 0, nome: "", cidade: "" }]
              })}
            >
              Adicionar local de atendimento
            </button>
          </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Código de Identificação</h2>
          <div className="flex items-center gap-2">
            <FaIdBadge className="text-green-500" />
            <input
              type="text"
              name="codigoIdentificacao"
              value={perfil.codigoIdentificacao || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
