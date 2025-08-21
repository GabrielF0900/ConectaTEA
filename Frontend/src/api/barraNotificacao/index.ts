// Exportações principais do sistema de notificações
export { default as BarraDeNotificacao } from './BarraDeNotificacao';
export { default as NotificacoesProvider } from './NotificacoesProvider';
export { useNotificacoes } from './useNotificacoes';
export { useNotificacoesContext } from './useNotificacoesContext';

// Exportar tipos
export type { Notification, NotificationType } from './BarraDeNotificacao';
export type { NotificacoesContextType } from './NotificacoesProvider';

// Utilitário global para notificações rápidas
export { notificacoes } from './useNotificacoes';
