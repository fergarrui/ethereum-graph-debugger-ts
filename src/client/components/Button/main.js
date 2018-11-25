import React from 'react';

import styles from '../../styles/Button.scss';

const Button = ({ text }) => {
  return(
    <button className={styles['button']}>
      <span>{text}</span>
    </button>
  );
}

Button.displayName = 'Button';

export default Button;