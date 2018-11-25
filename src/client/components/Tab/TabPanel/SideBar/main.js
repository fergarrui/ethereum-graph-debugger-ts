import React from 'react';

import styles from '../../../../styles/SideBar.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFirstItemClick() {
    console.log('i m clicked');

    this.props.onByteCodeClick();
  }

  handleSecondItemClick() {
    console.log('me too');

    this.props.onDisassembleClick();
  }

  render() {
    return(
      <div className={styles['side-bar']}>
        <div className={styles['side-bar__item']} onClick={() => this.handleFirstItemClick()}>
          <span>ByteCode</span>
        </div>
        <div className={styles['side-bar__item']} onClick={() => this.handleSecondItemClick()}>
          <span>Disassemble</span>
        </div>
      </div>
    )
  }
}

SideBar.displayName = 'SideBar';

export default SideBar;