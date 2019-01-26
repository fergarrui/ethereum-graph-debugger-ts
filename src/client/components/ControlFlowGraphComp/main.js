import React from 'react';

import Graph from '../Graph/main.js';

import styles from '../../styles/ControlFlowGraphComp.scss';

const ControlFlowGraphComp = ({ contractName, contractPath, cfg, operations }) => {
  return (
    <div className={styles['control-flow-graph-comp']}>
        <Graph 
          graphType="cfg" 
          graphId={contractName} 
          contractPath={contractPath} 
          cfg={cfg} 
          operations={operations}
        />
    </div>
  );
}

ControlFlowGraphComp.displayName = 'ControlFlowGraphComp';

export default ControlFlowGraphComp;
