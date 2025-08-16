// server.ts
import express from 'express';
import cors from 'cors';
import routes from './api/routes'; // Importa automaticamente todas as rotas

const app = express();
const PORT = 3000;

// Configuração CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend
  credentials: true
}));

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Usando o sistema de rotas automático com prefixo /api
app.use('/api', routes);

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
