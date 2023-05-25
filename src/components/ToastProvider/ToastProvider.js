import React from 'react';

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

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
