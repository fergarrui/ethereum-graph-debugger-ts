import React from 'react';

import Button from '../../../../../Button/main.js';

import styles from '../../../../../../styles/ControlFlowGraphComp.scss';

class ControlFlowGraphComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['control-flow-graph-comp']} name={name}>
        <div className={styles['control-flow-graph-comp__header']}>
          <Button text='Fetch Data' />
        </div>
        <div className={styles['control-flow-graph-comp__body']}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
      </div>
    );
  }
}

ControlFlowGraphComp.displayName = 'ControlFlowGraphComp';

export default ControlFlowGraphComp;
