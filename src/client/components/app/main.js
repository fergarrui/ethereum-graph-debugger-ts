import React from 'react';

import TopNavBar from '../TopNavBar/main.js';
import Tab from '../Tab/main.js';
import MessageComp from '../MessageComp/main.js';

import styles from '../../styles/App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      parameter: '',
      fetchRequestStatus: undefined,
      messageVisible: false,
      contracts: [],
    }

    this.handleMenuItemIconClick = this.handleMenuItemIconClick.bind(this);
  }

  handleMenuItemIconClick(index) {
    const { contracts } = this.state;
    const newTabs = contracts.filter((item, i) => i !== index);

    this.setState({
      contracts: newTabs,
    });
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
      .catch(err => this.handleRequestFail(err))
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
  }

  handleRequestFail() {
    this.setState({
      fetchRequestStatus: 'fail',
      messageVisible: true,
    });
  }

  handleMessageButtonClick() {
    this.setState({
      messageVisible: false,
    });
  }

  render() {

    const { fetchRequestStatus, contracts, messageVisible } = this.state;
    const { children } = this.props;

    return (
      <div className={styles['app']}>
        <div classname={styles['app__navigation']}>
          <TopNavBar
            onInputChange={(e) => this.handleInputChange(e)}
            onInputSubmit={() => this.handleInputSubmit()}
          />
        </div>
        <div className={styles['app__tabs']}>
        <div className={styles['app__tabs__loading']}>
          {fetchRequestStatus === 'pending' &&
            <MessageComp message='Loading...' />
          }
        </div>
        <div className={styles['app__tabs__success']}>
          {fetchRequestStatus === 'success' && 
          <Tab data={contracts} onMenuItemIconClick={this.handleMenuItemIconClick}>
            {children}
          </Tab>        
          }
        </div>
        <div className={styles['app__tab__error']}>
          {fetchRequestStatus === 'fail' && messageVisible &&
            <MessageComp 
              message="Sorry, couldn't load contracts"
              onMessageButtonClick={() => this.handleMessageButtonClick()}
             />
          }
        </div>
        </div>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;