import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.css';

const ModalWindow = ({ isOpen, children }) => (
  <div className={classNames(styles.modalDarkLayer, isOpen ? styles.open : undefined)}>
    <div className={styles.modalDarkLayer} />
    {children}
  </div>
);

export default ModalWindow;
