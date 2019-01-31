import React from 'react';

import classnames from 'classnames/bind';

import styles from '../../styles/SettingsBar.scss';

const cx = classnames.bind(styles);


const SettingsBar = ({ active, onButtonClick }) => {

  const handleInputChange = (event) => {    
    const { name, value } = event.target; 

    localStorage.setItem(name, value);
  }

  const handleKeyUp = (event) => {
    if(event.keyCode !== 13) {
      return;
    }
    onButtonClick();
  }

  const settingsBarClasses = cx({
    'settings-bar': true,
    'settings-bar--active': !!active
  });

    return (
      <div className={settingsBarClasses}>
        <div className={styles['settings-bar__item']}>
          <input
            name='host' 
            placeholder={localStorage.getItem('host') || 'Blockchain host (default: 127.0.0.1:8545)'}  
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
           />
        </div>
        <div className={styles['settings-bar__item']}>
          <input
            name='protocol' 
            placeholder={localStorage.getItem('protocol') ||'Blockchain protocol (default: http)'} 
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
           />
        </div>
        <div className={styles['settings-bar__item']}>
          <input
            name='username'
            placeholder={localStorage.getItem('username') || 'Blockchain basic auth username'} 
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
           />
        </div>
        <div className={styles['settings-bar__item']}>
          <input
            name='password' 
            placeholder={localStorage.getItem('password') || 'Blockchain basic auth password'} 
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
           />
        </div>
        <div className={styles['settings-bar__item']}>
          <button onClick={onButtonClick}><span>Save and Close</span></button>
        </div>
      </div>
    )
}

SettingsBar.displayName = 'SettingsBar';

export default SettingsBar;