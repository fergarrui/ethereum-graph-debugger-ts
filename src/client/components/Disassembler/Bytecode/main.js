import React from 'react';

import styles from '../../../styles/Bytecode.scss';

const Bytecode = ({ bytecode }) => (
  <div className={styles['bytecode']}>
    <p>{bytecode}</p>
  </div>
)

Bytecode.displayName = 'ByteCode';

export default Bytecode;