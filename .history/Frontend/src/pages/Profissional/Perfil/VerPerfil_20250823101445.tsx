import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function PerfilProfissional() {
  const [openMenu, setOpenMenu] = useState(false);

  const irParaPerfil = () => {
    navigate("/profissional/perfil/editar");
  };

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
                <img src="https://via.placeholder.com/40" alt="avatar" className="w-9 h-9 rounded-full border" />
                <div className="text-left">
                  <div className="font-semibold">Gabriel Falcão da Cruz</div>
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
  );
}
