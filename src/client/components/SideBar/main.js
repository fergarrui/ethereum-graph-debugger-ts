import React from 'react';

import Icon from '../Icon/main.js';
import Input from '../Input/main.js';
import Tab from '../Tab/main.js';
import TabPanel from '../Tab/TabPanel/main.js';

import styles from '../../styles/SideBar.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarOpen: true,
      inputValue: '',
      parameter: '',
      fetchRequestStatus: undefined,
      contracts: [],
    }

    this.handleRequestPending = this.handleRequestPending.bind(this);
    this.handleRequestSuccess = this.handleRequestSuccess.bind(this);
    this.handleRequestFail = this.handleRequestFail.bind(this);
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

    const { sideBarOpen, inputValue, fetchRequestStatus, contracts } = this.state;

    const classes = cx({
      'side-bar': true,
      'side-bar--open': !!sideBarOpen,
    });

    return (
      <div className={classes}>
        <div className={styles['side-bar__input']}>
          <Input 
            onChange={(e) => this.handleInputChange(e)}
            onSubmit={() => this.handleInputSubmit()} 
          />
        </div>
        <div className={styles['side-bar__icon']}>
        {sideBarOpen 
          ? <button onClick={() => this.handleCrossIconClick()}><Icon iconName='Cross' /></button>
          : <button onClick={() => this.handleMenuIconClick()}><Icon iconName='Menu' /></button>
        }
        </div>
        <div className={styles['side-bar__body']}>
          {fetchRequestStatus === 'pending' &&
            <div>pending</div>
          }
          {fetchRequestStatus === 'success' && 
            <div className={styles['side-bar__body__tabs']}>
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
            </div>         
          }
          {fetchRequestStatus === 'fail' &&
          <div>error</div>
        }
        </div>
      </div>
    )
  }
}

SideBar.displayName = 'SideBar';

export default SideBar;