import React from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../Dashboard/Sidebar";

export default function PerfilProfissional() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1">
        {/* Header com título */}
        <div className="bg-white border-b px-6 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold">Ver Perfil</h1>
          </div>
        </div>

        <div className="p-6 flex justify-center">
          {/* Card */}
          <div className="bg-white shadow-md rounded-2xl max-w-3xl w-full p-6 sm:p-10">
            {/* Foto + Nome */}
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/120"
                alt="Foto de Perfil"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
              />
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">Gabriel Falcão da Cruz</h2>
              <p className="text-green-600 text-lg font-medium">Psicólogo Clínico</p>
              <span className="mt-1 text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700"># PROF-001</span>
            </div>

            {/* Conteúdo */}
            <div className="mt-8 space-y-6">
              {/* Formação */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Formação Acadêmica</h2>
                <div className="flex items-center mt-2 text-gray-700">
                  <FaUniversity className="text-green-600 mr-2" />
                  <span>Psicologia - Universidade de São Paulo (USP)</span>
                </div>
              </div>

              {/* Sobre */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Sobre</h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Especialista em terapia cognitivo-comportamental com mais de 8 anos de experiência no atendimento de crianças e adolescentes com TEA. Formação em ABA e desenvolvimento de habilidades sociais.
                </p>
              </div>

              {/* Contato */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Informações de Contato</h2>
                <div className="mt-2 space-y-2 text-gray-700">
                  <div className="flex items-center">
                    <FaPhoneAlt className="text-green-600 mr-2" />
                    <span>(11) 99999-9999</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-green-600 mr-2" />
                    <span>gabriel.falcao@conectatea.com.br</span>
                  </div>
                  <div className="flex items-center">
                    <FaLinkedin className="text-green-600 mr-2" />
                    <a href="https://linkedin.com/in/gabriel-falcao-cruz" target="_blank" rel="noreferrer" className="hover:underline">
                      linkedin.com/in/gabriel-falcao-cruz
                    </a>
                  </div>
                </div>
              </div>

              {/* Local de Trabalho */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Local de Trabalho</h2>
                <div className="flex items-center mt-2 text-gray-700">
                  <FaMapMarkerAlt className="text-green-600 mr-2" />
                  <span>Clínica ConectaTEA - São Paulo - SP</span>
                </div>
              </div>
            </div>

            {/* Botão Editar */}
            <div className="mt-8 flex justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">Editar Perfil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
