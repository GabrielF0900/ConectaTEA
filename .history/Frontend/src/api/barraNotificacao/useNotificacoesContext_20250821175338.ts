import { useContext } from 'react';
import { NotificacoesContext } from './NotificacoesProvider';

// Hook para usar o contexto
export const useNotificacoesContext = () => {
  const context = useContext(NotificacoesContext);
  if (!context) {
    throw new Error('useNotificacoesContext deve ser usado dentro de NotificacoesProvider');
  }
  return context;
};
