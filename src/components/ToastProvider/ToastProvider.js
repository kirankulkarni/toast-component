import React from 'react';
import useEscapeKey from '../../hooks/use-escape-key';

export const ToasterContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const removeToast = React.useCallback((id) => {
    setToasts((changeToasts) => {
      return changeToasts.filter((toast) => toast.id !== id);
    });
  }, []);

  const addToast = React.useCallback(
    ({ variant, message }) => {
      const id = crypto.randomUUID();
      const handleToastDismiss = () => removeToast(id);
      const newToast = {
        id,
        variant,
        message,
        handleToastDismiss,
      };
      const newToasts = [...toasts, newToast];
      setToasts(newToasts);
    },
    [toasts, removeToast]
  );

  const clearAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(clearAllToasts);

  const value = React.useMemo(() => {
    return { toasts, addToast };
  }, [toasts, addToast]);

  return (
    <ToasterContext.Provider value={value}>
      {children}
    </ToasterContext.Provider>
  );
}

export default ToastProvider;
