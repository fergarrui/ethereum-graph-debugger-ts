import React from 'react';

import DebugTransactionComp from '../../DebugTransactionComp/main.js';
import DisassembleComp from '../../DisassembleComp/main.js';
import ControlFlowGraphComp from '../../ControlFlowGraphComp/main.js';

import styles from '../../../styles/Tab/InnerTabPanel.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const InnerTabPanel = ({ type, active, contractName, contractCode, contractPath, cfg, operations, trace }) => {

  const tabPanelClasses = cx({
    'inner-tab-panel': true,
    'inner-tab-panel--active': !!active,
  });

  return (
    <div className={tabPanelClasses}>
      {type === 'Debug Transaction' && 
        <DebugTransactionComp 
          contractPath={contractPath} 
          contractName={contractName} 
          cfg={cfg} 
          operations={operations} 
          trace={trace}
        />
      }
      {type === 'Disassemble' && <DisassembleComp />}
      {type === 'Control Flow Graph' &&
        <ControlFlowGraphComp 
          contractPath={contractPath} 
          contractName={contractName} 
          contractCode={contractCode}
          cfg={cfg}
          operations={operations} 
        />
      }
    </div>
  );
}

InnerTabPanel.displayName = 'InnerTabPanel';

export default InnerTabPanel;
