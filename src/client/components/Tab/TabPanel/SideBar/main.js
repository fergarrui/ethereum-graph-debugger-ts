import React from 'react';

import styles from '../../../../styles/SideBar.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFirstItemClick() {
    console.log('i m clicked');
  }

  handleSecondItemClick() {
    console.log('me too');
  }

  render() {
    return(
      <div className={styles['side-bar']}>
        <div className={styles['side-bar__item']}>
          <div onClick={() => this.handleFirstItemClick()}><span>ByteCode</span></div>
        </div>
        <div className={styles['side-bar__item']}>
          <div onClick={() => this.handleSecondItemClick()}><span>Disassemble</span></div>
        </div>
      </div>
    )
  }
}

SideBar.displayName = 'SideBar';

export default SideBar;