// PerfilEdit.tsx
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaIdBadge } from "react-icons/fa";
import {useNavigate} from "react-router-dom";


export default function PerfilEdit() {
  const [perfil, setPerfil] = useState({
    nome: "Gabriel Falcão da Cruz",
    especialidade: "Psicólogo Clínico",
    formacao: "Psicologia - Universidade de São Paulo (USP)",
    descricao:
      "Especialista em terapia cognitivo-comportamental com mais de 8 anos de experiência no atendimento de crianças e adolescentes com TEA. Formação em ABA e desenvolvimento de habilidades sociais.",
    telefone: "(11) 99999-9999",
    email: "gabriel.falcao@conectatea.com.br",
    linkedin: "linkedin.com/in/gabriel-falcao-cruz",
    localTrabalho: "Clínica ConectaTEA - São Paulo - SP",
    codigo: "PROF-001",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Salvando perfil...", perfil);
    navigate("/profissional/perfil");
    // Aqui você chamaria sua API para salvar os dados
  };

  const handleCancel = () => {
    console.log("Cancelando edição");
    navigate("/profissional/perfil");
    // Resetar ou navegar para outra tela
  };

    const navigate = useNavigate();

  
  //Função para voltar para perfil
  
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
            value={perfil.nome}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-center mb-2 font-semibold"
          />
          <input
            type="text"
            name="especialidade"
            value={perfil.especialidade}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-center mb-4"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Formação Acadêmica</h2>
          <input
            type="text"
            name="formacao"
            value={perfil.formacao}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Sobre</h2>
          <textarea
            name="descricao"
            value={perfil.descricao}
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
                value={perfil.telefone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-green-500" />
              <input
                type="email"
                name="email"
                value={perfil.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-green-500" />
              <input
                type="text"
                name="linkedin"
                value={perfil.linkedin}
                onChange={handleChange}
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
              value={perfil.localTrabalho}
              onChange={handleChange}
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
              name="codigo"
              value={perfil.codigo}
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
