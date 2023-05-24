import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToasterContext } from '../ToastProvider';

function ToastShelf() {
  const { toasts } = React.useContext(ToasterContext);
  console.log(toasts);
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            variant={toast.variant}
            handleToastDismiss={toast.handleToastDismiss}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
