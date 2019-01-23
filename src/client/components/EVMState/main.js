import React from 'react';
import { connect } from 'react-redux';

import styles from '../../styles/EVMState.scss';

const mapStateToProps = state => {
  return {
    evm: state.selectEVMState,
  }
}

const ConnectedEVMState = ({ evm }) => {

  console.log(evm)
  console.log(evm.storage);

  return (
    <div className={styles['evm-state']}>
      <div className={styles['evm-state__item']}>
        <span>{`gas: ${evm.gas} gasCost: ${evm.gasCost}`}</span>
      </div>
      <div className={styles['evm-state__item']}>
        <div className={styles['evm-state__item__title']}>
          <h4>Stack</h4>
        </div>
        <div className={styles['evm-state__item__content']}>
          <span>{evm.stack}</span>
        </div>
      </div>
      <div className={styles['evm-state__item']}>
        <div className={styles['evm-state__item__title']}>
          <h4>Memory</h4>
        </div>
        <div className={styles['evm-state__item__content']}>
          <span>{evm.memory}</span>
        </div>
      </div>
      <div className={styles['evm-state__item']}>
        <div className={styles['evm-state__item__title']}>
          <h4>{`Storage`}</h4>
        </div>
        <div className={styles['evm-state__item__content']}>
          <span>{JSON.stringify(evm.storage)}</span>
        </div>
      </div>
    </div>
  )
}


const EVMState = connect(mapStateToProps)(ConnectedEVMState);

EVMState.displayName = 'EVMState';

export default EVMState;

