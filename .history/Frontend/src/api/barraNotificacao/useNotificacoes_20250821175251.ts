import { useState, useCallback } from 'react';
import type { Notification, NotificationType } from './BarraDeNotificacao';

// Hook para gerenciar notificações
export const useNotificacoes = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Função para adicionar uma notificação
  const adicionarNotificacao = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    options?: {
      duration?: number;
      actions?: Array<{
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary';
      }>;
    }
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const newNotification: Notification = {
      id,
      type,
      title,
      message,
      duration: options?.duration,
      actions: options?.actions
    };

    setNotifications(prev => [...prev, newNotification]);
    return id;
  }, []);

  // Função para remover uma notificação
  const removerNotificacao = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Função para limpar todas as notificações
  const limparNotificacoes = useCallback(() => {
    setNotifications([]);
  }, []);

  // Funções de conveniência para cada tipo
  const notificarSucesso = useCallback((title: string, message: string, options?: { duration?: number; actions?: Array<{ label: string; onClick: () => void; variant?: 'primary' | 'secondary'; }> }) => {
    return adicionarNotificacao('success', title, message, options);
  }, [adicionarNotificacao]);

  const notificarErro = useCallback((title: string, message: string, options?: { duration?: number; actions?: Array<{ label: string; onClick: () => void; variant?: 'primary' | 'secondary'; }> }) => {
    return adicionarNotificacao('error', title, message, options);
  }, [adicionarNotificacao]);

  const notificarAlerta = useCallback((title: string, message: string, options?: { duration?: number; actions?: Array<{ label: string; onClick: () => void; variant?: 'primary' | 'secondary'; }> }) => {
    return adicionarNotificacao('warning', title, message, options);
  }, [adicionarNotificacao]);

  const notificarInfo = useCallback((title: string, message: string, options?: { duration?: number; actions?: Array<{ label: string; onClick: () => void; variant?: 'primary' | 'secondary'; }> }) => {
    return adicionarNotificacao('info', title, message, options);
  }, [adicionarNotificacao]);

  return {
    notifications,
    adicionarNotificacao,
    removerNotificacao,
    limparNotificacoes,
    notificarSucesso,
    notificarErro,
    notificarAlerta,
    notificarInfo
  };
};

// Utilitários para notificações rápidas sem hook
export const notificacoes = {
  sucesso: (title: string, message: string) => {
    // Esta será uma implementação global via context ou evento
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: { type: 'success', title, message }
    }));
  },
  erro: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: { type: 'error', title, message }
    }));
  },
  alerta: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: { type: 'warning', title, message }
    }));
  },
  info: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: { type: 'info', title, message }
    }));
  }
};
