import { useState, useCallback } from 'react';

interface ConfirmacaoOptions {
  titulo: string;
  mensagem: string;
  textoBotaoConfirmar?: string;
  textoBotaoCancelar?: string;
  tipoConfirmacao?: 'danger' | 'warning' | 'info';
}

interface ConfirmacaoState extends ConfirmacaoOptions {
  isOpen: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export const useConfirmacao = () => {
  const [confirmacao, setConfirmacao] = useState<ConfirmacaoState>({
    isOpen: false,
    titulo: '',
    mensagem: '',
    textoBotaoConfirmar: 'Confirmar',
    textoBotaoCancelar: 'Cancelar',
    tipoConfirmacao: 'danger',
    onConfirmar: () => {},
    onCancelar: () => {}
  });

  const mostrarConfirmacao = useCallback((
    options: ConfirmacaoOptions,
    onConfirmar: () => void
  ) => {
    return new Promise<boolean>((resolve) => {
      setConfirmacao({
        ...options,
        isOpen: true,
        onConfirmar: () => {
          setConfirmacao(prev => ({ ...prev, isOpen: false }));
          onConfirmar();
          resolve(true);
        },
        onCancelar: () => {
          setConfirmacao(prev => ({ ...prev, isOpen: false }));
          resolve(false);
        }
      });
    });
  }, []);

  const fecharConfirmacao = useCallback(() => {
    setConfirmacao(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    confirmacao,
    mostrarConfirmacao,
    fecharConfirmacao
  };
};

export default useConfirmacao;
