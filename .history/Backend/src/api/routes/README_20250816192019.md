# 🚀 Sistema Automático de Rotas - ConectaTEA

Este sistema importa automaticamente todas as rotas das pastas `routesPublic` e `routesPrivate`, eliminando a necessidade de importar manualmente cada nova rota no servidor.

## 📁 Estrutura do Sistema

```
src/api/routes/
├── index.ts              # Router principal que combina tudo
├── routesPublic/
│   ├── index.ts          # Auto-importa rotas públicas
│   ├── routes.ts         # Login, register, etc.
│   └── [novaRota].ts     # Qualquer nova rota pública
└── routesPrivate/
    ├── index.ts          # Auto-importa rotas privadas
    ├── cadastrarCrianca.ts
    └── [novaRota].ts     # Qualquer nova rota privada
```

## 🔧 Como Funciona

### **1. Rotas Públicas** (sem autenticação)
- Pasta: `routesPublic/`
- URL Base: `/api/`
- Exemplos: 
  - `/api/login`
  - `/api/register`

### **2. Rotas Privadas** (com autenticação)
- Pasta: `routesPrivate/`
- URL Base: `/api/private/`
- Exemplos:
  - `/api/private/cadastrar-crianca`
  - `/api/private/listar-criancas`

## ✅ Como Adicionar Novas Rotas

### **Para Rotas Públicas:**
1. Crie um arquivo em `routesPublic/`
2. Exporte um Router como default:

```typescript
// routesPublic/minhaNovaRota.ts
import { Router } from 'express';

const router = Router();

router.get('/minha-rota', (req, res) => {
  res.json({ message: 'Minha nova rota pública!' });
});

export default router; // ✅ IMPORTANTE: export default
```

### **Para Rotas Privadas:**
1. Crie um arquivo em `routesPrivate/`
2. Use os middlewares de autenticação/autorização:

```typescript
// routesPrivate/minhaRotaPrivada.ts
import { Router } from 'express';
import { authenticated } from '../../middlewares/authenticated';
import { profissionalOnly } from '../../middlewares/authorized';

const router = Router();

router.get('/dados-sensíveis', authenticated, profissionalOnly, (req, res) => {
  res.json({ message: 'Dados apenas para profissionais!' });
});

export default router; // ✅ IMPORTANTE: export default
```

## 🌐 URLs Resultantes

### **Rotas Públicas:**
- `POST /api/login` ← `routesPublic/routes.ts`
- `POST /api/register` ← `routesPublic/routes.ts`
- `GET /api/minha-rota` ← `routesPublic/minhaNovaRota.ts`

### **Rotas Privadas:**
- `POST /api/private/cadastrar-crianca` ← `routesPrivate/cadastrarCrianca.ts`
- `GET /api/private/dados-sensíveis` ← `routesPrivate/minhaRotaPrivada.ts`

## 🔍 Logs do Sistema

Quando o servidor iniciar, você verá:

```
✅ Rota pública carregada: routes.ts
✅ Rota pública carregada: minhaNovaRota.ts
🔒 Rota privada carregada: cadastrarCrianca.ts
🔒 Rota privada carregada: minhaRotaPrivada.ts
🚀 Sistema de rotas configurado com sucesso!
```

## ⚠️ Regras Importantes

1. **Sempre use `export default router`** nos arquivos de rota
2. **Rotas públicas** = sem autenticação (login, register)
3. **Rotas privadas** = com autenticação (CRUD de dados)
4. **Não edite os arquivos `index.ts`** das pastas de rotas
5. **Reinicie o servidor** após adicionar novas rotas

## 🛡️ Segurança

- **Rotas públicas**: Acessíveis por qualquer pessoa
- **Rotas privadas**: Protegidas automaticamente pelo prefixo `/private/`
- **Use middlewares**: `authenticated`, `profissionalOnly`, `responsavelOnly`

## 🚀 Exemplo Completo

**Nova rota privada para listar crianças:**

```typescript
// routesPrivate/listarCriancas.ts
import { Router } from 'express';
import { authenticated } from '../../middlewares/authenticated';
import { anyAuthenticated } from '../../middlewares/authorized';

const router = Router();

router.get('/criancas', authenticated, anyAuthenticated, async (req, res) => {
  // Lógica para listar crianças
  res.json({ criancas: [] });
});

export default router;
```

**URL resultante:** `GET /api/private/criancas`

---

🎉 **Agora você nunca mais precisa importar rotas manualmente no server.ts!**
