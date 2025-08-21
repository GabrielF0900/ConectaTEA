import React, { createContext, useContext, useEffect } from 'react';
import BarraDeNotificacao from './BarraDeNotificacao';
import { useNotificacoes } from './useNotificacoes';
import type { NotificationType } from './BarraDeNotificacao';

// Tipo para opções de notificação
interface NotificationOptions {
  duration?: number;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

// Context para as notificações
interface NotificacoesContextType {
  notificarSucesso: (title: string, message: string, options?: NotificationOptions) => string;
  notificarErro: (title: string, message: string, options?: NotificationOptions) => string;
  notificarAlerta: (title: string, message: string, options?: NotificationOptions) => string;
  notificarInfo: (title: string, message: string, options?: NotificationOptions) => string;
  removerNotificacao: (id: string) => void;
  limparNotificacoes: () => void;
}

const NotificacoesContext = createContext<NotificacoesContextType | undefined>(undefined);

// Exportar o contexto para uso em outros arquivos
export { NotificacoesContext };

// Hook para usar o contexto
export const useNotificacoesContext = () => {
  const context = useContext(NotificacoesContext);
  if (!context) {
    throw new Error('useNotificacoesContext deve ser usado dentro de NotificacoesProvider');
  }
  return context;
};

// Provider das notificações
interface NotificacoesProviderProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const NotificacoesProvider: React.FC<NotificacoesProviderProps> = ({ 
  children, 
  position = 'top-right' 
}) => {
  const {
    notifications,
    removerNotificacao,
    limparNotificacoes,
    notificarSucesso,
    notificarErro,
    notificarAlerta,
    notificarInfo,
    adicionarNotificacao
  } = useNotificacoes();

  // Escutar eventos globais de notificação
  useEffect(() => {
    const handleGlobalNotification = (event: CustomEvent) => {
      const { type, title, message, options } = event.detail;
      adicionarNotificacao(type as NotificationType, title, message, options);
    };

    window.addEventListener('showNotification', handleGlobalNotification as EventListener);
    
    return () => {
      window.removeEventListener('showNotification', handleGlobalNotification as EventListener);
    };
  }, [adicionarNotificacao]);

  const contextValue: NotificacoesContextType = {
    notificarSucesso,
    notificarErro,
    notificarAlerta,
    notificarInfo,
    removerNotificacao,
    limparNotificacoes
  };

  return (
    <NotificacoesContext.Provider value={contextValue}>
      {children}
      <BarraDeNotificacao
        notifications={notifications}
        onRemove={removerNotificacao}
        position={position}
      />
    </NotificacoesContext.Provider>
  );
};

export default NotificacoesProvider;
