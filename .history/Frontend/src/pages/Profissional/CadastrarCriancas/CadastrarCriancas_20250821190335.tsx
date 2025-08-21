import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  cadastrarCrianca, 
  listarCriancas,
  excluirCrianca,
  type CadastroCriancaFormData,
  type CriancaListagem 
} from '../../../api/protected/axiosCadastroCrianca';
import { useNotificacoesContext } from '../../../api/barraNotificacao';
import { useConfirmacao } from '../../../hooks/useConfirmacao';
import BarraConfirmacao from '../../../components/ModalConfirmacao';
import LayoutCriancaCadastrada from './LayoutCriancaCadastrada';

// Tipo para dados do profissional (pode ser expandido conforme necessário)
interface ProfissionalInfo {
  nome: string;
  email: string;
}

export default function CadastrarCriancas() {
  const navigate = useNavigate();
  const { notificarSucesso, notificarErro } = useNotificacoesContext();
  const { confirmacao, mostrarConfirmacao } = useConfirmacao();
  const [criancas, setCriancas] = useState<CriancaListagem[]>([]);
  const [criancasFiltradas, setCriancasFiltradas] = useState<CriancaListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Obter dados do profissional logado do localStorage
  const getProfissionalInfo = (): ProfissionalInfo => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return {
          nome: user.name || 'Profissional',
          email: user.email || ''
        };
      } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error);
      }
    }
    return {
      nome: 'Dr. Maria Silva', // Fallback
      email: 'maria@conectatea.com'
    };
  };

  const [profissional] = useState<ProfissionalInfo>(getProfissionalInfo());
  
  // Função para criar um estado inicial limpo do formulário
  const getInitialFormData = (): CadastroCriancaFormData => ({
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

  const [formData, setFormData] = useState<CadastroCriancaFormData>(getInitialFormData());

  // Função para abrir o modal e garantir formulário limpo
  const abrirModalCadastro = () => {
    setFormData(getInitialFormData());
    setShowModal(true);
  };

  // Função para fechar o modal e limpar formulário
  const fecharModal = () => {
    setFormData(getInitialFormData());
    setShowModal(false);
  };

  // Buscar crianças do profissional
  const fetchCriancas = async () => {
    try {
      setIsLoading(true);
      const response = await listarCriancas();
      
      console.log('Resposta da API:', response); // Debug
      
      // A API retorna: { message, criancas: [...], total }
      // A função listarCriancas já retorna response.data, então acessamos diretamente
      const criancasData = response.criancas || [];
      
      console.log('Crianças carregadas:', criancasData); // Debug
      setCriancas(criancasData);
      setCriancasFiltradas(criancasData);
    } catch (error) {
      console.error('Erro ao buscar crianças:', error);
      setCriancas([]);
      setCriancasFiltradas([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar crianças baseado no termo de busca
  useEffect(() => {
    if (!searchTerm.trim()) {
      setCriancasFiltradas(criancas);
      return;
    }

    const filtered = criancas.filter(crianca => 
      crianca.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crianca.diagnostico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crianca.responsavel.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCriancasFiltradas(filtered);
  }, [searchTerm, criancas]);

  useEffect(() => {
    fetchCriancas();
  }, []);

  // Adicionar listener para recarregar quando voltar para a página
  useEffect(() => {
    const handleFocus = () => {
      fetchCriancas();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Excluir criança
  const handleExcluirCrianca = async (criancaId: number) => {
    const crianca = criancas.find(c => c.id === criancaId);
    if (!crianca) return;

    mostrarConfirmacao(
      {
        titulo: 'Confirmar Exclusão',
        mensagem: `Tem certeza que deseja excluir a criança "${crianca.nome}"?\n\nEsta ação não poderá ser desfeita.`,
        textoBotaoConfirmar: 'Excluir',
        textoBotaoCancelar: 'Cancelar',
        tipoConfirmacao: 'danger'
      },
      async () => {
        try {
          await excluirCrianca(criancaId);
          
          // Atualizar lista local removendo a criança excluída
          const novasCriancas = criancas.filter(c => c.id !== criancaId);
          setCriancas(novasCriancas);
          setCriancasFiltradas(novasCriancas);
          
          notificarSucesso(
            'Sucesso!', 
            'Criança excluída com sucesso!',
            { duration: 4000 }
          );
        } catch (error) {
          console.error('Erro ao excluir criança:', error);
          notificarErro(
            'Erro ao excluir',
            'Não foi possível excluir a criança. Tente novamente.',
            { duration: 5000 }
          );
        }
      }
    );
  };

  // Cadastrar nova criança
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usar a função de cadastro com tipagem correta
      await cadastrarCrianca(formData);
      
      // Limpar formulário e fechar modal
      setFormData(getInitialFormData());
      fecharModal();
      
      // Recarregar lista
      fetchCriancas();
      
      // Mostrar mensagem de sucesso
      notificarSucesso(
        'Cadastro realizado!',
        `Criança ${formData.nomeCompleto} foi cadastrada com sucesso!`,
        { duration: 5000 }
      );
    } catch (error: unknown) {
      console.error('Erro ao cadastrar criança:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cadastrar criança';
      notificarErro(
        'Erro no cadastro',
        errorMessage,
        { duration: 6000 }
      );
    }
  };

  return (
    <div className="h-full">
      {/* Header com barra de pesquisa */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Crianças</h1>
            <p className="text-gray-500">Gerencie as crianças cadastradas no sistema</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Barra de pesquisa */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Buscar crianças..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Botão Nova Criança */}
            <button
              onClick={abrirModalCadastro}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Nova Criança
            </button>
            {/* Notificações */}
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18H3V3h6z" />
              </svg>
            </button>
            {/* Usuário */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">{getProfissionalInfo().nome}</span>
              <span className="text-xs bg-green-100 text-green-600 rounded px-2 py-1">
                Profissional
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        {/* Filtros adicionais */}
        <div className="mb-6 flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            Filtros
          </button>
        </div>

        {/* Lista de Crianças */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Carregando crianças...</p>
          </div>
        ) : criancasFiltradas.length === 0 ? (
          <div className="text-center py-8">
          {searchTerm ? (
            <p className="text-gray-500">Nenhuma criança encontrada para "{searchTerm}".</p>
          ) : (
            <>
              <p className="text-gray-500">Nenhuma criança cadastrada ainda.</p>
              <button
                onClick={abrirModalCadastro}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Cadastrar primeira criança
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {criancasFiltradas.map((crianca) => (
            <LayoutCriancaCadastrada
              key={crianca.id}
              crianca={crianca}
              profissional={profissional}
              onVerDetalhes={(criancaId) => {
                navigate(`/profissional/criancas/detalhes/${criancaId}`);
              }}
              onEditar={(criancaId) => {
                navigate(`/profissional/criancas/editar/${criancaId}`);
              }}
              onExcluir={handleExcluirCrianca}
            />
          ))}
        </div>
      )}

      {/* Modal de Cadastro - NOVO LAYOUT BASEADO NAS IMAGENS */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="flex items-center p-6 border-b bg-white">
              <button
                onClick={() => setShowModal(false)}
                className="mr-4 text-gray-500 hover:text-gray-700 text-xl"
              >
                ←
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Nova Criança</h2>
                <p className="text-gray-600 text-sm mt-1">Cadastre uma nova criança no sistema</p>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite o nome completo da criança"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Idade em anos"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Selecione o gênero</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                      <option value="Prefiro não informar">Prefiro não informar</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnóstico <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value, diagnosticoOutro: '' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Selecione o diagnóstico</option>
                    <option value="TEA - Transtorno do Espectro Autista">TEA - Transtorno do Espectro Autista</option>
                    <option value="TDAH - Transtorno do Déficit de Atenção com Hiperatividade">TDAH - Transtorno do Déficit de Atenção com Hiperatividade</option>
                    <option value="Síndrome de Down">Síndrome de Down</option>
                    <option value="Deficiência Intelectual">Deficiência Intelectual</option>
                    <option value="Paralisia Cerebral">Paralisia Cerebral</option>
                    <option value="Síndrome de Asperger">Síndrome de Asperger</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                {/* Campo condicional para diagnóstico customizado */}
                {formData.diagnostico === 'Outro' && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especifique o diagnóstico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.diagnosticoOutro}
                      onChange={(e) => setFormData({ ...formData, diagnosticoOutro: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite o diagnóstico específico"
                    />
                  </div>
                )}
              </div>

              {/* Informações do Responsável */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações do Responsável</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Responsável <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nomeResponsavel}
                      onChange={(e) => setFormData({ ...formData, nomeResponsavel: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome completo do responsável"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@exemplo.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Endereço completo"
                    />
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Adicionais</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Informações adicionais sobre a criança, necessidades especiais, medicamentos, etc."
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Cadastrar Criança
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        {/* Barra de Confirmação */}
        <BarraConfirmacao
          isOpen={confirmacao.isOpen}
          titulo={confirmacao.titulo}
          mensagem={confirmacao.mensagem}
          textoBotaoConfirmar={confirmacao.textoBotaoConfirmar}
          textoBotaoCancelar={confirmacao.textoBotaoCancelar}
          tipoConfirmacao={confirmacao.tipoConfirmacao}
          onConfirmar={confirmacao.onConfirmar}
          onCancelar={confirmacao.onCancelar}
          position="top-center"
        />
      </div>
    </div>
  );
}
