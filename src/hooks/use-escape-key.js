import React from 'react';

function useEscapeKey(handleEscapeKeyFn) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        handleEscapeKeyFn(event);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleEscapeKeyFn]);
}

export default useEscapeKey;
