# 📋 Exemplo de Requisição - Cadastrar Criança

## URL:
```
POST http://localhost:3000/api/private/cadastrar-crianca
```

## Headers:
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT
```

## Body JSON (seguindo o layout do formulário):

```json
{
  "fullName": "Ana Silva Santos",
  "birthDate": "15/05/2018",
  "gender": "Feminino",
  "diagnosis": "TEA Leve",
  "responsible": {
    "name": "Maria Silva Santos",
    "phone": "(11) 99999-9999",
    "email": "maria.santos@email.com",
    "address": "Rua das Flores, 123 - São Paulo, SP"
  },
  "notes": "Criança muito comunicativa, gosta de atividades lúdicas. Tem sensibilidade a ruídos altos. Medicamentos: não utiliza no momento."
}
```

## Campos do Formulário:

### Informações Básicas:
- ✅ **Nome Completo** (obrigatório): `fullName`
- ✅ **Idade**: Calculada automaticamente pela data de nascimento
- ✅ **Data de Nascimento** (obrigatório): `birthDate` (formato dd/mm/aaaa)
- ✅ **Gênero** (obrigatório): `gender` (Masculino, Feminino, Outro)
- ✅ **Diagnóstico** (obrigatório): `diagnosis`

### Informações do Responsável:
- ✅ **Nome do Responsável** (obrigatório): `responsible.name`
- ✅ **Telefone** (obrigatório): `responsible.phone` (formato: (11) 99999-9999)
- ✅ **E-mail** (opcional): `responsible.email`
- ✅ **Endereço** (opcional): `responsible.address`

### Informações Adicionais:
- ✅ **Observações** (opcional): `notes`

## Validações Implementadas:

1. ✅ **Campos Obrigatórios**: Nome, Data de Nascimento, Gênero, Diagnóstico, Nome do Responsável, Telefone
2. ✅ **Data de Nascimento**: Formato dd/mm/aaaa, não pode ser futura
3. ✅ **Idade**: Calculada automaticamente, deve estar entre 0-18 anos
4. ✅ **Gênero**: Deve ser "Masculino", "Feminino" ou "Outro"
5. ✅ **Telefone**: Formato brasileiro (11) 99999-9999
6. ✅ **E-mail**: Validação básica de formato (se fornecido)

## Resposta de Sucesso:

```json
{
  "message": "Criança cadastrada com sucesso!",
  "crianca": {
    "id": 1,
    "nome": "Ana Silva Santos",
    "idade": 7,
    "data_nascimento": "15/05/2018",
    "genero": "Feminino",
    "diagnostico": "TEA Leve",
    "observacoes": "Criança muito comunicativa...",
    "responsavel": {
      "id": 2,
      "nome": "Maria Silva Santos",
      "telefone": "(11) 99999-9999",
      "email": "maria.santos@email.com"
    }
  }
}
```

## Possíveis Erros:

- **400**: Campos obrigatórios faltando
- **400**: Data de nascimento inválida
- **400**: Gênero inválido
- **400**: Telefone em formato incorreto
- **401**: Token JWT inválido ou expirado
- **403**: Usuário não é profissional
- **500**: Erro interno do servidor
