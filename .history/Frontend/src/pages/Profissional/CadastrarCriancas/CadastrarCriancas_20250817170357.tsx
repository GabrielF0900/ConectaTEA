import { useState, useEffect } from 'react';
import { 
  cadastrarCrianca, 
  listarCriancas,
  type CadastroCriancaFormData,
  type CriancaListagem 
} from '../../../api/protected/axiosCadastroCrianca';

export default function CadastrarCriancas() {
  const [criancas, setCriancas] = useState<CriancaListagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
    observacoes: ''
  });

  // Buscar crianças do profissional
  const fetchCriancas = async () => {
    try {
      setIsLoading(true);
      const response = await listarCriancas();
      setCriancas(response.data.criancas || []);
    } catch (error) {
      console.error('Erro ao buscar crianças:', error);
      setCriancas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCriancas();
  }, []);

  // Cadastrar nova criança
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usar a função de cadastro com tipagem correta
      await cadastrarCrianca(formData);
      
      // Limpar formulário e fechar modal
      setFormData({
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
        observacoes: ''
      });
      setShowModal(false);
      
      // Recarregar lista
      fetchCriancas();
      
      // Mostrar mensagem de sucesso
      alert('Criança cadastrada com sucesso!');
    } catch (error: unknown) {
      console.error('Erro ao cadastrar criança:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cadastrar criança';
      alert(`Erro: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Crianças</h1>
            <p className="text-gray-600 mt-2">Cadastre e gerencie as crianças sob seus cuidados</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Nova Criança
          </button>
        </div>
      </div>

      {/* Lista de Crianças */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Carregando crianças...</p>
        </div>
      ) : criancas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhuma criança cadastrada ainda.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Cadastrar primeira criança
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {criancas.map((crianca) => (
            <div key={crianca.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{crianca.nome}</h3>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {crianca.idade} anos
                </span>
              </div>
              
              {crianca.diagnostico && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Diagnóstico:</strong> {crianca.diagnostico}
                </p>
              )}
              
              <p className="text-sm text-gray-600 mb-4">
                <strong>Responsável:</strong> {crianca.responsavel.nome}
                <br />
                <span className="text-gray-500">{crianca.responsavel.email}</span>
              </p>
              
              {crianca.observacoes && (
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Observações:</strong> {crianca.observacoes}
                </p>
              )}
            </div>
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
    </div>
  );
}
