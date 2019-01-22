import React from 'react';

import styles from '../../styles/SideBar.scss';

class SideBar extends React.Component {

  handleClick(type) {
    this.props.onClick(type);
  }

  render() {

    const { onDebugTransactionClick } = this.props;

    return (
      <div className={styles['side-bar']}>
        <div className={styles['side-bar__item']} onClick={(onDebugTransactionClick)}>
          <span>Debug Transaction</span>
        </div>
        <div className={styles['side-bar__item']} onClick={() => this.handleClick('Disassemble')}>
          <span>Disassemble</span>
        </div>
        <div className={styles['side-bar__item']} onClick={() => this.handleClick('Control Flow Graph')}>
          <span>Control Flow Graph</span>
        </div>
      </div>
    )
  }
}

SideBar.displayName = 'SideBar';

export default SideBar;
