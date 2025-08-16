# 🔐 Sistema de Middlewares - ConectaTEA

Este diretório contém os middlewares de autenticação, autorização e validação para o backend da aplicação ConectaTEA.

## 📁 Estrutura dos Middlewares

```
middlewares/
├── authenticated.ts     # Verificação de token JWT
├── authorized.ts        # Controle de acesso por papel
├── validators.ts        # Validações de banco de dados
├── advanced.ts          # Middlewares compostos
└── README.md           # Esta documentação
```

## 🚀 Como Usar

### 1. **Middleware Básico - Autenticação**

```typescript
import { authenticated } from './middlewares/authenticated';

// Rota que precisa de login
router.get('/profile', authenticated, (req, res) => {
  // req.user estará disponível com os dados do usuário
  res.json({ user: req.user });
});
```

### 2. **Middleware de Autorização**

```typescript
import { authenticated } from './middlewares/authenticated';
import { profissionalOnly, responsavelOnly, anyAuthenticated } from './middlewares/authorized';

// Apenas profissionais
router.get('/admin/dashboard', authenticated, profissionalOnly, handler);

// Apenas responsáveis
router.get('/parent/child', authenticated, responsavelOnly, handler);

// Qualquer usuário autenticado
router.get('/profile', authenticated, anyAuthenticated, handler);
```

### 3. **Middlewares Compostos (Recomendado)**

```typescript
import { professionalRoute, responsibleRoute, authenticatedRoute } from './middlewares/advanced';

// Para profissionais
router.get('/professional/children', ...professionalRoute, handler);

// Para responsáveis
router.get('/parent/dashboard', ...responsibleRoute, handler);

// Para qualquer usuário
router.get('/notifications', ...authenticatedRoute, handler);
```

## 🛡️ Tipos de Proteção

### **Níveis de Segurança:**

1. **Público** - Sem middleware
2. **Autenticado** - `authenticated`
3. **Autorizado** - `authenticated + authorized`
4. **Validado** - `authenticated + authorized + validators`
5. **Completo** - `authenticated + authorized + validators + audit + rateLimit`

### **Tipos de Usuário:**
- `PROFISSIONAL` - Acesso amplo ao sistema
- `RESPONSAVEL` - Acesso limitado aos próprios dados

## 📋 Exemplos Práticos

### **1. Dashboard do Profissional**
```typescript
router.get('/profissional/dashboard', 
  authenticated,           // ✅ Precisa estar logado
  profissionalOnly,       // ✅ Apenas profissionais
  auditLog('DASHBOARD'),  // 📝 Log da ação
  (req, res) => {
    // Lógica do dashboard
  }
);
```

### **2. Dados de uma Criança**
```typescript
router.get('/criancas/:childId', 
  authenticated,                    // ✅ Precisa estar logado
  anyAuthenticated,                // ✅ Profissional OU responsável
  secureChildAccess,              // 🔍 Valida acesso à criança específica
  auditLog('VIEW_CHILD'),         // 📝 Log da ação
  rateLimit(50, 60000),          // ⏱️ Limite de requests
  (req, res) => {
    // req.params.validatedChildId disponível
  }
);
```

### **3. Criar Nova Meta (Só Profissional)**
```typescript
router.post('/criancas/:childId/metas',
  authenticated,
  profissionalOnly,               // 🚫 Responsável não pode criar metas
  secureChildAccess,              // 🔍 Verifica se profissional tem acesso à criança
  auditLog('CREATE_GOAL'),
  (req, res) => {
    // Criar meta
  }
);
```

## 🔧 Configuração

### **1. Variáveis de Ambiente**
```env
JWT_SECRET=sua-chave-secreta-super-forte
JWT_EXPIRES_IN=24h
```

### **2. Headers das Requisições**
```bash
Authorization: Bearer <seu-jwt-token>
Content-Type: application/json
```

## 📊 Códigos de Erro

### **Autenticação (401)**
- `MISSING_TOKEN` - Token não fornecido
- `INVALID_TOKEN_FORMAT` - Formato incorreto
- `TOKEN_EXPIRED` - Token expirado
- `INVALID_TOKEN` - Token inválido

### **Autorização (403)**
- `INSUFFICIENT_PERMISSIONS` - Sem permissão para a rota
- `CHILD_ACCESS_DENIED` - Sem acesso à criança
- `PROFESSIONAL_ACCESS_ONLY` - Apenas profissionais

### **Validação (400)**
- `MISSING_CHILD_ID` - ID da criança não fornecido
- `INVALID_CHILD_ID` - ID inválido
- `MISSING_REQUIRED_PARAMS` - Parâmetros obrigatórios

### **Rate Limiting (429)**
- `RATE_LIMIT_EXCEEDED` - Muitas requisições

## 🏗️ Arquitetura

```
Cliente → Autenticação → Autorização → Validação → Rota
   ↓           ↓             ↓            ↓        ↓
Request → JWT Check → Role Check → DB Check → Handler
```

## 📈 Monitoramento

Os middlewares geram logs automáticos:

```
[AUDIT] 2025-08-16T10:30:00Z - User 123 (PROFISSIONAL) - Action: VIEW_CHILD - Route: GET /criancas/456
```

## 🔄 Fluxo Completo

1. **Cliente envia request** com JWT no header
2. **authenticated** valida o token
3. **authorized** verifica se o papel tem acesso
4. **validators** checam permissões específicas no banco
5. **auditLog** registra a ação
6. **rateLimit** controla frequência
7. **Handler** executa a lógica de negócio

## 🚨 Boas Práticas

### ✅ **Faça:**
- Use middlewares compostos (`professionalRoute`, `responsibleRoute`)
- Sempre combine `authenticated` + `authorized`
- Use `secureChildAccess` para rotas de criança
- Implemente rate limiting em APIs críticas
- Monitore logs de auditoria

### ❌ **Não faça:**
- Usar apenas `authenticated` sem `authorized`
- Confiar apenas no frontend para controle de acesso
- Ignorar validações de banco de dados
- Usar a mesma chave JWT em produção e desenvolvimento

## 🔮 Futuras Melhorias

- [ ] Integração com Redis para rate limiting
- [ ] Sistema de permissões granulares
- [ ] Auditoria em banco de dados
- [ ] Middleware de cache inteligente
- [ ] Notificações de segurança

---

**Lembre-se:** Segurança é responsabilidade de todos! 🛡️
