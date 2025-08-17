import { useState, useEffect } from 'react';
import { api } from '../../../api/httpClient';

interface Crianca {
  id: string;
  nome: string;
  idade: number;
  diagnostico?: string;
  observacoes?: string;
  responsavelId: string;
  responsavel: {
    nome: string;
    email: string;
  };
}

export default function CadastrarCriancas() {
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    idade: '',
    dataNascimento: '',
    genero: '',
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
      const response = await api.get('/private/criancas');
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
      // Usar diagnóstico customizado se "Outro" foi selecionado
      const diagnosticoFinal = formData.diagnostico === 'Outro' ? formData.diagnosticoOutro : formData.diagnostico;

      const dadosCrianca = {
        nome: formData.nomeCompleto,
        idade: parseInt(formData.idade),
        dataNascimento: formData.dataNascimento,
        genero: formData.genero,
        diagnostico: diagnosticoFinal || undefined,
        observacoes: formData.observacoes || undefined,
        responsavel: {
          nome: formData.nomeResponsavel,
          telefone: formData.telefone,
          email: formData.email,
          endereco: formData.endereco
        }
      };

      await api.post('/private/criancas', dadosCrianca);
      
      // Limpar formulário e fechar modal
      setFormData({
        nomeCompleto: '',
        idade: '',
        dataNascimento: '',
        genero: '',
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
    } catch (error: unknown) {
      console.error('Erro ao cadastrar criança:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cadastrar criança';
      alert(errorMessage);
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

      {/* Modal de Cadastro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Cadastrar Nova Criança</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Criança *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o nome da criança"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Idade *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="18"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Idade em anos"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email do Responsável *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.responsavelEmail}
                    onChange={(e) => setFormData({ ...formData, responsavelEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnóstico
                  </label>
                  <select
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value, diagnosticoOutro: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione o diagnóstico (opcional)</option>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Especifique o diagnóstico *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.diagnosticoOutro}
                      onChange={(e) => setFormData({ ...formData, diagnosticoOutro: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Digite o diagnóstico específico"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observações
                  </label>
                  <textarea
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Observações importantes sobre a criança (opcional)"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
