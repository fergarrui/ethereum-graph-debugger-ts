import React from 'react';

import Icon from '../Icon/main.js';
import Input from '../Input/main.js';

import styles from '../../styles/Modal.scss';

const Modal =  ({ onIconClick, onInputChange, onInputSubmit }) => {

  return (
    <div className={styles['modal']}>
      <div className={styles['modal__main']}>
        <div className={styles['modal__main__button']}>
          <button onClick={onIconClick}>
            <Icon iconName='Cross' />
          </button>
        </div>
        <div className={styles['modal__main__input']}>
          <Input 
            placeholder='Transaction hash'
            value='Debug'
            onChange={onInputChange}
            onSubmit={onInputSubmit}
          />
        </div>
      </div>
    </div>
  )
} 

Modal.displayName = 'Modal';

export default Modal;
