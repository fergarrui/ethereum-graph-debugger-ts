import React from 'react';

import styles from '../../styles/Button.scss';

const Button = ({ text, onClick }) => {
  return(
    <button onClick={onClick} className={styles['button']}>
      <span>{text}</span>
    </button>
  );
}

Button.displayName = 'Button';

export default Button;