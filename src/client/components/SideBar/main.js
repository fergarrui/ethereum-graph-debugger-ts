import React from 'react';

//import Button from '../../Button/main.js';
import styles from '../../styles/SideBar.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleItemClick(type) {

    this.props.onClick(type);
  }

  render() {
    return(
      <div className={styles['side-bar']}>
        <div className={styles['side-bar__item']} onClick={() => this.handleItemClick('Debug Transaction')}>
          <span>Debug Transaction</span>
        </div>
        <div className={styles['side-bar__item']} onClick={() => this.handleItemClick('Disassemble')}>
          <span>Disassemble</span>
        </div>
        <div className={styles['side-bar__item']} onClick={() => this.handleItemClick('Control Flow Graph')}>
          <span>Control Flow Graph</span>
        </div>
      </div>
    )
  }
}

SideBar.displayName = 'SideBar';

export default SideBar;
