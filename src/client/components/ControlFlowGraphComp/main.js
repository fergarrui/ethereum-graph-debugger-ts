import React from 'react';

import Graph from '../Graph/main.js';

import styles from '../../styles/ControlFlowGraphComp.scss';

class ControlFlowGraphComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['control-flow-graph-comp']} name={name}>
        <div className={styles['control-flow-graph-comp__body']}>
        <Graph />
       </div>
      </div>
    );
  }
}

ControlFlowGraphComp.displayName = 'ControlFlowGraphComp';

export default ControlFlowGraphComp;
