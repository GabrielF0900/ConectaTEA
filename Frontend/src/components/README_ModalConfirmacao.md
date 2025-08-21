# Sistema de Modais de Confirmação - ConectaTEA

## Visão Geral

Este sistema substitui os `window.confirm()` nativos do navegador por modais estilizados e consistentes com o design do ConectaTEA.

## Componentes

### 1. ModalConfirmacao.tsx
Componente principal que renderiza o modal de confirmação.

**Localização**: `src/components/ModalConfirmacao.tsx`

**Props**:
- `isOpen`: boolean - Controla se o modal está visível
- `titulo`: string - Título do modal
- `mensagem`: string - Mensagem a ser exibida (suporta quebras de linha com `\n`)
- `textoBotaoConfirmar`: string - Texto do botão de confirmação (padrão: "Confirmar")
- `textoBotaoCancelar`: string - Texto do botão de cancelamento (padrão: "Cancelar")
- `tipoConfirmacao`: 'danger' | 'warning' | 'info' - Tipo visual do modal (padrão: 'danger')
- `onConfirmar`: function - Callback executado ao confirmar
- `onCancelar`: function - Callback executado ao cancelar

### 2. useConfirmacao.ts
Hook personalizado para gerenciar o estado dos modais de confirmação.

**Localização**: `src/hooks/useConfirmacao.ts`

**Retorna**:
- `confirmacao`: objeto com estado do modal
- `mostrarConfirmacao`: função para exibir o modal
- `fecharConfirmacao`: função para fechar o modal

## Como Usar

### 1. Importar os recursos necessários

```tsx
import { useConfirmacao } from '../../../hooks/useConfirmacao';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
```

### 2. Inicializar o hook no componente

```tsx
const { confirmacao, mostrarConfirmacao } = useConfirmacao();
```

### 3. Usar a função mostrarConfirmacao

```tsx
const handleExcluir = () => {
  mostrarConfirmacao(
    {
      titulo: 'Confirmar Exclusão',
      mensagem: `Tem certeza que deseja excluir "${item.nome}"?\n\nEsta ação não pode ser desfeita.`,
      textoBotaoConfirmar: 'Excluir',
      textoBotaoCancelar: 'Cancelar',
      tipoConfirmacao: 'danger'
    },
    () => {
      // Ação a ser executada quando confirmada
      executarExclusao();
    }
  );
};
```

### 4. Adicionar o componente ModalConfirmacao no JSX

```tsx
return (
  <div>
    {/* Seu conteúdo aqui */}
    
    {/* Modal de Confirmação */}
    <ModalConfirmacao
      isOpen={confirmacao.isOpen}
      titulo={confirmacao.titulo}
      mensagem={confirmacao.mensagem}
      textoBotaoConfirmar={confirmacao.textoBotaoConfirmar}
      textoBotaoCancelar={confirmacao.textoBotaoCancelar}
      tipoConfirmacao={confirmacao.tipoConfirmacao}
      onConfirmar={confirmacao.onConfirmar}
      onCancelar={confirmacao.onCancelar}
    />
  </div>
);
```

## Tipos de Confirmação

### Danger (Padrão)
- **Cor**: Vermelho
- **Uso**: Ações destrutivas como exclusões
- **Ícone**: Triângulo com exclamação

### Warning
- **Cor**: Amarelo
- **Uso**: Ações que requerem atenção especial
- **Ícone**: Triângulo com exclamação

### Info
- **Cor**: Azul
- **Uso**: Confirmações informativas
- **Ícone**: Círculo com "i"

## Características

### ✅ Benefícios
- **Consistência visual** com o design do ConectaTEA
- **Responsivo** - funciona em todos os tamanhos de tela
- **Acessível** - suporte a navegação por teclado
- **Customizável** - textos e tipos visuais personalizáveis
- **Portal rendering** - renderizado no `document.body` para evitar problemas de z-index

### 🔧 Funcionalidades
- **Auto-focus** no botão de cancelar para segurança
- **Overlay clicável** para fechar o modal
- **Escape key** para cancelar (funcionalidade nativa do browser)
- **Animações suaves** de entrada e saída
- **Suporte a quebras de linha** na mensagem

## Migração do window.confirm()

### Antes (window.confirm)
```tsx
const handleExcluir = () => {
  const confirmacao = window.confirm('Tem certeza?');
  if (confirmacao) {
    executarExclusao();
  }
};
```

### Depois (ModalConfirmacao)
```tsx
const { confirmacao, mostrarConfirmacao } = useConfirmacao();

const handleExcluir = () => {
  mostrarConfirmacao(
    {
      titulo: 'Confirmar Ação',
      mensagem: 'Tem certeza?',
      tipoConfirmacao: 'danger'
    },
    () => executarExclusao()
  );
};

// No JSX
<ModalConfirmacao {...confirmacao} />
```

## Arquivos Modificados

### Páginas que usam o sistema:
- `src/pages/Profissional/CadastrarCriancas/CadastrarCriancas.tsx`
- `src/pages/Profissional/CadastrarCriancas/LayoutCriancaCadastrada.tsx`

### Arquivos criados:
- `src/components/ModalConfirmacao.tsx`
- `src/hooks/useConfirmacao.ts`

## Estilização

O componente usa **Tailwind CSS** para estilização e está totalmente integrado com o sistema de design do ConectaTEA.

### Classes principais:
- Background: `bg-white` com `shadow-xl`
- Overlay: `bg-black bg-opacity-50`
- Botões: Cores baseadas no tipo de confirmação
- Z-index: `z-[9999]` para garantir que apareça sobre todo o conteúdo

---

**Desenvolvido para o ConectaTEA** 🟢
