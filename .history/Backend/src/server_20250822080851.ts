// server.ts
import express from 'express';
import cors from 'cors';
import http from 'http'; // 🔥 Importa para criar o servidor HTTP
import { Server } from 'socket.io';
import routes from './api/routes';

const app = express();
const PORT = 3000;

// Configuração CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
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

// 🔥 Cria servidor HTTP "bruto"
const server = http.createServer(app);

// 🔥 Configuração do WebSocket
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true,
  },
});

// Lida com conexões de WebSocket
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Exemplo: mensagem de chat
  socket.on('chat message', (msg) => {
    console.log('Mensagem recebida:', msg);
    io.emit('chat message', msg); // reenvia para todos os conectados
  });

  // Quando desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

// 🔥 Sobe o servidor HTTP + WebSocket
server.listen(PORT, () => {
  console.log(`Servidor HTTP e WebSocket rodando na porta ${PORT}`);
});
