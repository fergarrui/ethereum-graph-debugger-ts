import React from 'react';

import Icon from '../Icon/main.js';

import styles from '../../styles/MessageComp.scss';

const MessageComp = ({ message, onMessageButtonClick }) => (
  <div className={styles['message-comp']}>
    <div className={styles['message-comp__main']}>
      <div className={styles['message-comp__main__text']}>
        <h1>{message}</h1>
      </div>
      <div className={styles['message-comp__main__button']}>
      {
        message === 'Loading...' 
        ?  <Icon iconName='Spinner' />
        :  <button onClick={onMessageButtonClick}><span>Close</span></button>
      }
      </div>
    </div>
  </div>
)

MessageComp.displayName = 'MessageComp';

export default MessageComp;