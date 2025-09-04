# ConectaTEA 🧩

Plataforma para acompanhamento de crianças com TEA, conectando responsáveis e profissionais especializados.

## 🏗️ Arquitetura

### Diagrama da Arquitetura
```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    ORM     ┌─────────────────┐
│                 │ ──────────────► │                 │ ─────────► │                 │
│  Frontend       │                 │  Backend        │            │  PostgreSQL     │
│  React + Vite   │ ◄────────────── │  NestJS         │ ◄───────── │  Database       │
│  TypeScript     │     JSON        │  TypeScript     │   Prisma   │                 │
└─────────────────┘                 └─────────────────┘            └─────────────────┘
```

### Stack Tecnológico
- **Frontend**: React + TypeScript + Vite + Axios
- **Backend**: NestJS + TypeScript + Prisma ORM 
- **Database**: PostgreSQL
- **Autenticação**: JWT + Guards
- **Validação**: DTOs + Class-validator

## ⚡ Funcionalidades Principais

### 🔐 Sistema de Autenticação
- Login/registro seguro com JWT
- Guards de autenticação em rotas protegidas
- Middleware de validação de tokens

### 👥 Gestão de Profissionais 
- Cadastro completo de perfil profissional
- Especialidades, locais de atendimento, redes sociais
- Sistema de conexões entre profissionais
- Envio, aceite, recusa e remoção de solicitações

### 👶 Gestão de Crianças
- CRUD completo para crianças cadastradas
- Vinculação com responsáveis
- Acompanhamento de desenvolvimento

### 🔗 Sistema de Conexões
- Solicitações de amizade entre profissionais
- Status: PENDENTE, ACEITO, RECUSADO
- Listagem de conexões por profissional
- Remoção de conexões existentes

## 🚀 Como Executar

### Backend (NestJS)
```bash
cd Backend
npm install
npm run start:dev
# Servidor rodando em http://localhost:3000
```

### Frontend (React)
```bash
cd Frontend
npm install  
npm run dev
# Aplicação rodando em http://localhost:5173
```

### Banco de Dados
```bash
cd Backend
npx prisma migrate dev
npx prisma studio  # Interface visual do banco
```

## 📂 Estrutura Modular

```
Backend/src/
├── auth/           # Autenticação JWT
├── users/          # Usuários do sistema  
├── profissionais/  # Perfis profissionais
├── criancas/       # Gestão de crianças
├── conexoes/       # Sistema de conexões
└── lib/            # Configurações (Prisma)

Frontend/src/
├── api/            # Cliente HTTP + endpoints
├── pages/          # Componentes de página
├── components/     # Componentes reutilizáveis
└── hooks/          # Hooks customizados
```

---

**ConectaTEA** - Conectando cuidado especializado para crianças com TEA 💙
