import React from 'react';

import TopNavBar from '../TopNavBar/main.js';
import Tab from '../Tab/main.js';
import TabPanel from '../Tab/TabPanel/main.js';

import styles from '../../styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      parameter: '',
      fetchRequestStatus: undefined,
      contracts: [],
    }
  }

  handleInputChange(event) {

    const { value } = event.target;

    this.setState({
      inputValue: value,
      parameter: value,
    });
  }

  handleInputSubmit() {
    const { inputValue, parameter } = this.state;

    this.setState({
      parameter: inputValue,
    });

    this.fetchData(parameter);
  }

  fetchData(parameter) {
    this.handleRequestPending();

    fetch(`http://localhost:9090/files/${encodeURIComponent(parameter)}?extension=sol`)
      .then(res => res.json())
      .then(data => this.handleRequestSuccess(data))
      .catch(err => this.handleRequestFail)
      ;
  }

  handleRequestPending() {
    this.setState({
      fetchRequestStatus: 'pending',
    });
  }

  handleRequestSuccess(response) {
    this.setState({
      fetchRequestStatus: 'success',
      contracts: response,
    });

    console.log(this.state.contracts);
  }

  handleRequestFail() {
    this.setState({
      fetchRequestStatus: 'fail',
    });
  }

  render() {

    const { fetchRequestStatus, contracts } = this.state;

    return (
      <div className={styles['app']}>
        <div classname={styles['app__navigation']}>
          <TopNavBar
            onInputChange={(e) => this.handleInputChange(e)}
            onInputSubmit={() => this.handleInputSubmit()}
          />
        </div>
        <div className={styles['app__tabs']}>
          {fetchRequestStatus === 'pending' &&
          <div>pending</div>
          }
          {fetchRequestStatus === 'success' && 
            <Tab>
            {contracts.map((item, index) => {
              return (
                <TabPanel 
                  key={index}
                  code={item.code}
                  name={item.name}
                />
              )
            })}
            </Tab>        
          }
          {fetchRequestStatus === 'fail' &&
          <div>error</div>
          }
        </div>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;