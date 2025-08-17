// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Cadastro from '../pages/Register';
import Login from '../pages/Login';
import ConectaTEALanding from '../pages/Home';
import ProfissionalDashboard from '../pages/Profissional/Dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { api } from '../api/httpClient';

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

// Componente completo de Gestão de Crianças
const GestaCriancas = () => {
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    diagnostico: '',
    observacoes: '',
    responsavelEmail: ''
  });

  // Buscar crianças
  const fetchCriancas = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/private/profissional/criancas');
      setCriancas(response.data.criancas || []);
    } catch (error) {
      console.error('Erro ao buscar crianças:', error);
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
      const dadosCrianca = {
        nome: formData.nome,
        idade: parseInt(formData.idade),
        diagnostico: formData.diagnostico || undefined,
        observacoes: formData.observacoes || undefined,
        responsavelEmail: formData.responsavelEmail
      };

      await api.post('/private/profissional/criancas', dadosCrianca);
      
      // Limpar formulário e fechar modal
      setFormData({ nome: '', idade: '', diagnostico: '', observacoes: '', responsavelEmail: '' });
      setShowModal(false);
      
      // Recarregar lista
      fetchCriancas();
    } catch (error) {
      console.error('Erro ao cadastrar criança:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cadastrar criança';
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crianças</h1>
            <p className="text-gray-600 text-sm mt-1">Gerencie as crianças cadastradas no sistema</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            + Nova Criança
          </button>
        </div>
      </div>

      {/* Barra de busca e filtros */}
      <div className="px-6 py-4 bg-white border-b">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar crianças..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filtros
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
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
          <div className="space-y-4">
            {criancas.map((crianca) => (
              <div key={crianca.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{crianca.nome}</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Ativo
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Idade:</span>
                        <span className="ml-2 font-medium">{crianca.idade} anos</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Diagnóstico:</span>
                        <span className="ml-2 font-medium">{crianca.diagnostico || 'Não informado'}</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Responsável:</span>
                        <span className="ml-2 font-medium">{crianca.responsavel?.nome || 'N/A'}</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Profissional:</span>
                        <span className="ml-2 font-medium">Dr. João Santos</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm">
                      <span className="text-gray-600">Última sessão:</span>
                      <span className="ml-2 font-medium">09/01/2024</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Ver Detalhes
                    </button>
                    <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
                  <input
                    type="text"
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TEA, TDAH, etc. (opcional)"
                  />
                </div>

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
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ConectaTEALanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Cadastro />} />
      
      {/* Rotas do Profissional - Protegidas */}
      <Route 
        path="/profissional/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <ProfissionalDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Nova rota para Cadastro de Crianças */}
      <Route 
        path="/profissional/criancas" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <GestaCriancas />
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas do Responsável - Protegidas */}
      <Route 
        path="/responsavel/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['RESPONSAVEL']}>
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold">Dashboard do Responsável</h1>
              <p className="text-gray-600 mt-2">Em desenvolvimento...</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* Compatibilidade com rota antiga */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL', 'RESPONSAVEL']}>
            <ProfissionalDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<div className="p-8 text-center text-red-500">Página não encontrada</div>} />
    </Routes>
  );
}
