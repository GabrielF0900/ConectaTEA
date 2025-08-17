import React from 'react';
import { CriancaListagem } from '../../../api/protected/axiosCadastroCrianca';

// Props do componente
interface LayoutCriancaCadastradaProps {
  crianca: CriancaListagem;
  profissional: ProfissionalInfo;
  onVerDetalhes?: (criancaId: number) => void;
  onEditar?: (criancaId: number) => void;
}

const LayoutCriancaCadastrada: React.FC<LayoutCriancaCadastradaProps> = ({
  crianca,
  profissional,
  onVerDetalhes,
  onEditar
}) => {
  // Função para obter a última sessão (mock - pode ser substituída por dados reais)
  const getUltimaSessao = () => {
    return "09/01/2024"; // Mock - substituir por dados reais da API
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Nome da criança */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{crianca.nome}</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Ativo
              </span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Idade:</span> {crianca.idade} anos
            </p>
          </div>

          {/* Diagnóstico */}
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Diagnóstico:</span> {crianca.diagnostico}
            </p>
          </div>

          {/* Responsável */}
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Responsável:</span> {crianca.responsavel.nome}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Profissional:</span> {profissional.nome}
            </p>
          </div>

          {/* Última sessão */}
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Última sessão:</span> {getUltimaSessao()}
            </p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2 ml-4">
          <button 
            onClick={() => onVerDetalhes?.(crianca.id)}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            Ver Detalhes
          </button>
          <button 
            onClick={() => onEditar?.(crianca.id)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutCriancaCadastrada;
