import React from 'react';

import Icon from '../Icon/main.js';

import styles from '../../styles/SideBar.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarOpen: true,
    }

    this.inputOpenFile = React.createRef();
  }


  handleMenuIconClick() {
    this.setState({
      sideBarOpen: true,
    });
  }

  handleCrossIconClick() {
    this.setState({
      sideBarOpen: false,
    });
  }

  handleButtonClick(e) {
    this.inputOpenFile.current.click();
  }

  render() {

    const { sideBarOpen } = this.state;

    const classes = cx({
      'side-bar': true,
      'side-bar--open': !!sideBarOpen,
    });

    return (
      <div className={classes}>
        <div classname={styles['side-bar__input']}>
          <input type='text' />
        </div>
        <div className={styles['side-bar__button']}>
          <input type='submit' onClick={(e) => this.handleButtonClick(e)} value='Load contracts from URI' />
        </div>
        <div className={styles['side-bar__icon']}>
        {sideBarOpen 
          ? <button onClick={() => this.handleCrossIconClick()}><Icon iconName='Cross' /></button>
          : <button onClick={() => this.handleMenuIconClick()}><Icon iconName='Menu' /></button>
        }
        </div>
      </div>
    )
  }
}

SideBar.displayName = 'SideBar';

export default SideBar;