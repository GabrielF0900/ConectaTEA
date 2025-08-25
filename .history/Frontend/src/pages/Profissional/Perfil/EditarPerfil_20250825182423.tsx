// PerfilEdit.tsx
import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaIdBadge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { obterPerfilProfissional, atualizarPerfilProfissional } from "../../../api/protected/axiosPerfil";
import type { Profissional } from "../../../api/protected/axiosProfissionais";

type LocalEdit = { id?: number; nome: string; cidade?: string };


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
      const locaisPayload = (perfil.locais || []).map(l => ({
        id: l.id ?? 0,
        nome: l.nome ?? "",
        cidade: l.cidade ?? ""
      }));
      const payload: Partial<Profissional> = {
        nome: perfil.nome,
        especialidade: perfil.especialidade,
        formacaoAcademica: perfil.formacaoAcademica || "",
        sobre: perfil.sobre || "",
        telefone: perfil.telefone,
        email: perfil.email,
        codigoIdentificacao: perfil.codigoIdentificacao || "",
        fotoPerfilUrl: perfil.fotoPerfilUrl,
        redes: { linkedin: perfil.redes?.linkedin || "" },
        locais: locaisPayload.length > 0 ? locaisPayload : undefined,
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
          <input
            type="text"
            name="nome"
            value={perfil.nome || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-center mb-2 font-semibold"
          />
          <input
            type="text"
            name="especialidade"
            value={perfil.especialidade || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-center mb-4"
          />
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
          <h2 className="font-bold text-lg mb-2">Local de Trabalho</h2>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" />
            <input
              type="text"
              name="localTrabalho"
              value={perfil.locais && perfil.locais.length > 0 ? perfil.locais[0].nome : ""}
              onChange={e => setPerfil({
                ...perfil,
                locais: [{
                  ...(perfil.locais?.[0] || {}),
                  nome: e.target.value
                } as LocalEdit]
              })}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
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
