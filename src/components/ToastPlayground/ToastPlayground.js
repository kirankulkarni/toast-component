import React from 'react';

import Button from '../Button';
import Toast from '../Toast';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [varient, setVarient] = React.useState(VARIANT_OPTIONS[0]);
  const [isToastVisible, setToastVisible] = React.useState(false);

  const handleToastDismiss = React.useCallback(() => {
    setToastVisible(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>
      {isToastVisible && (
        <Toast
          varient={varient}
          message={message}
          handleToastDismiss={handleToastDismiss}
        />
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setToastVisible(true);
        }}
      >
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
                  <label key={option} htmlFor={`varient-${option}`}>
                    <input
                      id={`varient-${option}`}
                      type='radio'
                      name='variant'
                      value={option}
                      checked={varient === option}
                      onChange={(event) => {
                        setVarient(event.target.value);
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
