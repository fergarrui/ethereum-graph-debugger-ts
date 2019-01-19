import React from 'react';

import { connect } from 'react-redux';
import { closeModal } from '../Store/Actions.js';

import Icon from '../Icon/main.js';

import styles from '../../styles/Modal.scss';

const mapDispatchToProps = dispatch => {
  return {
    closeAppModal: () => dispatch(closeModal())
  }
}
 
const ConnectedModal = ({ closeAppModal }) => {

  return (
    <div className={styles['modal']}>
      <div className={styles['modal__main']}>
        <div className={styles['modal__main__button']}>
          <div onClick={closeAppModal}>
            <Icon iconName='Cross' />
          </div>
        </div>
        <div className={styles['modal__main__input']}>
          <input type='text' placeholder='Insert...' />
        </div>
      </div>
    </div>
  )
}

const Modal = connect(null, mapDispatchToProps)(ConnectedModal);

Modal.displayName = 'Modal';

export default Modal;
