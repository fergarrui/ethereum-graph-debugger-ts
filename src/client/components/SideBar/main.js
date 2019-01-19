import React from 'react';

import { connect } from 'react-redux';

import { openModal } from '../Store/Actions.js';

import styles from '../../styles/SideBar.scss';

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(openModal()),
  }
}

class ConnectedSideBar extends React.Component {

  handleClick(type) {
    this.props.onClick(type);
  }

  handleDebugTransactionClick() {
    this.props.openModal();
  }

  render() {

    const { openModal } = this.props;

    return (
      <div className={styles['side-bar']}>
        <div className={styles['side-bar__item']} onClick={() => this.handleDebugTransactionClick()}>
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

const SideBar = connect(null, mapDispatchToProps)(ConnectedSideBar);

SideBar.displayName = 'SideBar';

export default SideBar;
