// server.ts
import express from 'express';
import cors from 'cors';
import router from './api/routes/routesPublic/routes'; // Importando as rotas públicas

const app = express();
const PORT = 3000;

// Configuração CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend
  credentials: true
}));

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Usando o router com prefixo /api
app.use('/api', router);

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
