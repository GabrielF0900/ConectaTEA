import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  buscarCriancaPorId, 
  atualizarCrianca,
  type CriancaListagem, 
  type CadastroCriancaFormData,
  type AtualizarCriancaData 
} from '../../../api/protected/axiosCadastroCrianca';
import { useNotificacoesContext } from '../../../api/barraNotificacao';

export default function EditarCriancaCadastrada() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notificarSucesso, notificarErro } = useNotificacoesContext();
  const [crianca, setCrianca] = useState<CriancaListagem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado do formulário baseado na interface existente
  const [formData, setFormData] = useState<CadastroCriancaFormData>({
    nomeCompleto: '',
    idade: 0,
    dataNascimento: '',
    genero: 'Masculino',
    diagnostico: '',
    diagnosticoOutro: '',
    nomeResponsavel: '',
    telefone: '',
    email: '',
    endereco: '',
    parentesco: 'PAI',
    observacoes: ''
  });

  useEffect(() => {
    const fetchCrianca = async () => {
      try {
        setIsLoading(true);
        
        if (!id) {
          console.error('ID da criança não fornecido');
          return;
        }

        // Buscar criança pelo ID usando a API real
        const criancaData = await buscarCriancaPorId(parseInt(id));
        setCrianca(criancaData);
        
        // Preencher formulário com dados existentes
        setFormData({
          nomeCompleto: criancaData.nome,
          idade: criancaData.idade,
          dataNascimento: criancaData.dataNascimento,
          genero: (criancaData.genero as 'Masculino' | 'Feminino' | 'Outro' | 'Prefiro não informar') || 'Outro',
          diagnostico: criancaData.diagnostico,
          diagnosticoOutro: '',
          nomeResponsavel: criancaData.responsavel.nome,
          telefone: criancaData.responsavel.telefone || '',
          email: criancaData.responsavel.email || '',
          endereco: criancaData.responsavel.endereco || '',
          parentesco: (criancaData.parentesco as 'PAI' | 'MAE' | 'AVO' | 'AVOA' | 'TIO' | 'TIA' | 'TUTOR' | 'OUTRO') || 'OUTRO',
          observacoes: criancaData.observacoes || ''
        });
        
      } catch (error) {
        console.error('Erro ao buscar criança:', error);
        notificarErro(
          'Erro ao carregar dados',
          'Não foi possível carregar os dados da criança. Redirecionando...',
          { duration: 4000 }
        );
        navigate('/profissional/criancas');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCrianca();
    }
  }, [id, navigate, notificarErro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !crianca) {
      notificarErro(
        'Dados não encontrados',
        'Não foi possível encontrar os dados da criança para edição.',
        { duration: 4000 }
      );
      navigate('/profissional/criancas');
      return;
    }

    try {
      // Preparar dados para atualização
      const updateData: AtualizarCriancaData = {
        nome: formData.nomeCompleto,
        dataNascimento: formData.dataNascimento,
        genero: formData.genero,
        diagnostico: formData.diagnostico === 'Outro' ? formData.diagnosticoOutro : formData.diagnostico,
        observacoes: formData.observacoes,
        parentesco: formData.parentesco,
        responsavel: {
          nome: formData.nomeResponsavel,
          telefone: formData.telefone,
          email: formData.email,
          endereco: formData.endereco
        }
      };

      // Atualizar criança usando a API real
      await atualizarCrianca(parseInt(id), updateData);
      
      notificarSucesso(
        'Dados atualizados!',
        `As informações de ${formData.nomeCompleto} foram atualizadas com sucesso!`,
        { duration: 5000 }
      );
      navigate('/profissional/criancas');
    } catch (error) {
      console.error('Erro ao atualizar criança:', error);
      notificarErro(
        'Erro na atualização',
        'Não foi possível atualizar os dados da criança. Tente novamente.',
        { duration: 5000 }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando dados da criança...</p>
        </div>
      </div>
    );
  }

  if (!crianca) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Criança não encontrada</h2>
          <button
            onClick={() => navigate('/profissional/criancas')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/profissional/criancas')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Criança</h1>
            <p className="text-gray-600 mt-1">Atualize as informações da criança</p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Header do Form */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Editando: {crianca.nome}</h2>
                <p className="text-green-100">ID #{crianca.id}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Informações Básicas */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nomeCompleto}
                    onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="18"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Nascimento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dataNascimento}
                    onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gênero <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.genero}
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value as 'Masculino' | 'Feminino' | 'Outro' | 'Prefiro não informar' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Prefiro não informar">Prefiro não informar</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnóstico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Informações do Responsável */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações do Responsável</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Responsável <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nomeResponsavel}
                    onChange={(e) => setFormData({ ...formData, nomeResponsavel: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parentesco <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.parentesco}
                    onChange={(e) => setFormData({ ...formData, parentesco: e.target.value as 'PAI' | 'MAE' | 'AVO' | 'AVOA' | 'TIO' | 'TIA' | 'TUTOR' | 'OUTRO' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PAI">Pai</option>
                    <option value="MAE">Mãe</option>
                    <option value="AVO">Avô</option>
                    <option value="AVOA">Avó</option>
                    <option value="TIO">Tio</option>
                    <option value="TIA">Tia</option>
                    <option value="TUTOR">Tutor/Responsável Legal</option>
                    <option value="OUTRO">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Observações */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Observações</h3>
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
                placeholder="Informações adicionais sobre a criança..."
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/profissional/criancas')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
