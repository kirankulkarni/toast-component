import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  const removeToast = React.useCallback((id) => {
    setToasts((changeToasts) => {
      return changeToasts.filter((toast) => toast.id !== id);
    });
  }, []);

  function handleFormSubmission(event) {
    event.preventDefault();
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
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toastsData={toasts} />
      <form onSubmit={handleFormSubmission}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor='message'
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id='message'
                className={styles.messageInput}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <fieldset>
              <div
                className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                {VARIANT_OPTIONS.map((option) => (
                  <label key={option} htmlFor={`variant-${option}`}>
                    <input
                      id={`variant-${option}`}
                      type='radio'
                      name='variant'
                      value={option}
                      checked={variant === option}
                      onChange={(event) => {
                        setVariant(event.target.value);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
