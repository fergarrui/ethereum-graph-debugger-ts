import React from 'react';

import SideBar from '../SideBar/main.js';

import styles from '../../styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['app']}>
        <SideBar />
      </div>
    );
  }
}

App.displayName = 'App';

export default App;