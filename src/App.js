import React from 'react';
import Web3 from 'web3'

export default class App extends React.Component {
  state = {
    account: '',
    network: 'ropsten'
  }

  async loadBlockChain() {
    const web3 = new Web3(Web3.givenProvider)
    await window.ethereum.enable()
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0], network })
  }

  componentDidMount() {
    this.loadBlockChain()
  }
  render() {
    return (
      <div>
        <p>Your account: {this.state.account}</p>
      </div>
    );
  }
}