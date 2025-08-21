import React, { useState } from 'react';
import type { CriancaListagem } from '../../../api/protected/axiosCadastroCrianca';
import { useConfirmacao } from '../../../hooks/useConfirmacao';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import ModalVerDetalhesCriancaCadastrada from './ModalVerDetalhesCriancaCadastrada';

// Interface para o profissional
interface ProfissionalInfo {
  nome: string;
  email: string;
}

// Props do componente
interface LayoutCriancaCadastradaProps {
  crianca: CriancaListagem;
  profissional: ProfissionalInfo;
  onVerDetalhes?: (criancaId: number) => void;
  onEditar?: (criancaId: number) => void;
  onExcluir?: (criancaId: number) => void;
}

const LayoutCriancaCadastrada: React.FC<LayoutCriancaCadastradaProps> = ({
  crianca,
  profissional,
  onVerDetalhes,
  onEditar,
  onExcluir
}) => {
  const [showModal, setShowModal] = useState(false);
  const { confirmacao, mostrarConfirmacao } = useConfirmacao();

  // Função para obter a última sessão (mock - pode ser substituída por dados reais)
  const getUltimaSessao = () => {
    return "09/01/2024"; // Mock - substituir por dados reais da API
  };

  const handleVerDetalhes = () => {
    if (onVerDetalhes) {
      onVerDetalhes(crianca.id);
    } else {
      setShowModal(true);
    }
  };

  const handleExcluir = () => {
    mostrarConfirmacao(
      {
        titulo: 'Confirmar Exclusão',
        mensagem: `Tem certeza que deseja excluir o cadastro de "${crianca.nome}"?\n\nEsta ação não pode ser desfeita.`,
        textoBotaoConfirmar: 'Excluir',
        textoBotaoCancelar: 'Cancelar',
        tipoConfirmacao: 'danger'
      },
      () => {
        onExcluir?.(crianca.id);
      }
    );
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
            onClick={handleVerDetalhes}
            className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm"
          >
            Ver Detalhes
          </button>
          <button 
            onClick={() => onEditar?.(crianca.id)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Editar
          </button>
          <button 
            onClick={handleExcluir}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
          >
            Excluir
          </button>
        </div>
      </div>

      {/* Modal de Detalhes */}
      <ModalVerDetalhesCriancaCadastrada
        crianca={crianca}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onEdit={(id) => {
          setShowModal(false);
          onEditar?.(id);
        }}
      />

      {/* Modal de Confirmação */}
      <ModalConfirmacao
        isOpen={confirmacao.isOpen}
        titulo={confirmacao.titulo}
        mensagem={confirmacao.mensagem}
        textoBotaoConfirmar={confirmacao.textoBotaoConfirmar}
        textoBotaoCancelar={confirmacao.textoBotaoCancelar}
        tipoConfirmacao={confirmacao.tipoConfirmacao}
        onConfirmar={confirmacao.onConfirmar}
        onCancelar={confirmacao.onCancelar}
      />
    </div>
  );
};

export default LayoutCriancaCadastrada;
