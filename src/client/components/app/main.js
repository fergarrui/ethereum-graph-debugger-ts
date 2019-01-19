import React from 'react';

import { connect } from 'react-redux';

import TopNavBar from '../TopNavBar/main.js';
import Tab from '../Tab/main.js';
import TabPanel from '../Tab/TabPanel/main.js';
import TabMenuItem from '../Tab/TabMenuItem/main.js';
import Modal from '../Modal/main.js';

import styles from '../../styles/App.scss';

const mapStateToProps = state => {
  return {
    modalOpen: state.showModal,
  }
}

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      parameter: '',
      fetchRequestStatus: undefined,
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
  }

  handleRequestFail() {
    this.setState({
      fetchRequestStatus: 'fail',
    });
  }

  render() {

    const { fetchRequestStatus, contracts } = this.state;
    const { children, modalOpen } = this.props;

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
            <Tab data={contracts} onMenuItemIconClick={this.handleMenuItemIconClick}>
              {children}
            </Tab>        
          }
          {fetchRequestStatus === 'fail' &&
          <div>error</div>
          }
        </div>
        <div className={styles['app__modal']}>
          {
            modalOpen && <Modal />
          }
        </div>
      </div>
    );
  }
}

const App = connect(mapStateToProps)(ConnectedApp);

App.displayName = 'App';

export default App;