import React from 'react';
import SimpleStorage from 'react-simple-storage';

import Input from '../Input/main.js';

import classnames from 'classnames/bind';

import styles from '../../styles/SettingsSidebar.scss';

const cx = classnames.bind(styles);

class SettingsSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      host: '',
      protocol: '',
      username: '',
      password: '',
    }
  }

  handleInputChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value,
    });
  }

  handleKeyUp(event) {
    if(event.keyCode !== 13) {
      return;
    }

    this.props.onButtonClick();
  }

  render() {
    const { active, onButtonClick } = this.props;

    const sidebarClasses = cx({
      'settings-sidebar': true,
      'settings-sidebar--active': !!active
    });
  
    return (
      <div className={sidebarClasses}>
        <SimpleStorage parent={this} />
        <div className={styles['settings-sidebar__item']}>
          <input
            name='host' 
            placeholder='Blockchain host (default: 127.0.0.1:8545)' 
            onChange={(e) => this.handleInputChange(e)}
            onKeyUp={(e) => this.handleKeyUp(e)}
           />
        </div>
        <div className={styles['settings-sidebar__item']}>
          <input
            name='protocol' 
            placeholder='Blockchain protocol (default: http)' 
            onChange={(e) => this.handleInputChange(e)}
            onKeyUp={(e) => this.handleKeyUp(e)}
           />
        </div>
        <div className={styles['settings-sidebar__item']}>
          <input
            name='username'
            placeholder='Blockchain basic auth username' 
            onChange={(e) => this.handleInputChange(e)}
            onKeyUp={(e) => this.handleKeyUp(e)}
           />
        </div>
        <div className={styles['settings-sidebar__item']}>
          <input
            name='password' 
            placeholder='Blockchain basic auth password' 
            onChange={(e) => this.handleInputChange(e)}
            onKeyUp={(e) => this.handleKeyUp(e)}
           />
        </div>
        <div className={styles['settings-sidebar__item']}>
          <button onClick={onButtonClick}><span></span>Save and Close</button>
        </div>
      </div>
    )
  } 
}

SettingsSidebar.displayName = 'SettingsSidebar';

export default SettingsSidebar;