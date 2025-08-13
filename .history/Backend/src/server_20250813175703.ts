// server.ts
import express from 'express';
import router from './routes';

const app = express();
const PORT = 3000;

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
