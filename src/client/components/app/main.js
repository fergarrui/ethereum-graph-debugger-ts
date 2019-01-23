import React from 'react';
import { connect } from 'react-redux';

import { showLoadingMessage, showErrorMessage, hideLoadingMessage } from '../Store/Actions.js';

import TopNavBar from '../TopNavBar/main.js';
import Tab from '../Tab/main.js';
import MessageComp from '../MessageComp/main.js';

import styles from '../../styles/App.scss';

const mapStateToProps = state => {
  return {
    showLoadingMessage: state.toggleLoadingMessage,
    showErrorMessage: state.toggleErrorMessage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadingMessageOn: () => dispatch(showLoadingMessage()),
    loadingMessageOff: () => dispatch(hideLoadingMessage()),
    errorMessageOn: () => dispatch(showErrorMessage())
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
      .catch(err => this.handleRequestFail(err))
      ;
  }

  handleRequestPending() {
    this.props.loadingMessageOn();
  }

  handleRequestSuccess(response) {
    this.setState({
      fetchRequestStatus: 'success',
      contracts: response,
    });

    this.props.loadingMessageOff();
  }

  handleRequestFail() {
    this.props.loadingMessageOff();
    this.props.errorMessageOn();
  }

  handleMessageButtonClick() {
    this.setState({
      messageVisible: false,
    });
  }

  render() {

    const { fetchRequestStatus, contracts } = this.state;
    const { children, showLoadingMessage, showErrorMessage } = this.props;

    return (
      <div className={styles['app']}>
        <div classname={styles['app__navigation']}>
          <TopNavBar
            onInputChange={(e) => this.handleInputChange(e)}
            onInputSubmit={() => this.handleInputSubmit()}
          />
        </div>
        <div className={styles['app__tabs']}>
          { showLoadingMessage &&
            <MessageComp message='Loading...' />
          }
          {fetchRequestStatus === 'success' && 
          <Tab data={contracts} onMenuItemIconClick={this.handleMenuItemIconClick}>
            {children}
          </Tab>        
          }
          { showErrorMessage &&
            <MessageComp 
              message="Sorry, couldn't load contracts"
              onMessageButtonClick={() => this.handleMessageButtonClick()}
             />
          }
        </div>
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

App.displayName = 'App';

export default App;