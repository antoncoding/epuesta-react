import React from 'react'
import Web3 from 'web3'
import MyNavBar from './Components/Navbar'
import Button from 'react-bootstrap/Button'
const web3 = new Web3(Web3.givenProvider)

export default class App extends React.Component {
  state = {
    account: '',
    network: 'ropsten',
  }

  async loadMetaMask() {
    await window.ethereum.enable()
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0], network })
  }

  componentDidMount() {
    this.loadMetaMask()
  }
  render() {
    return (
      <div style={{ margin: 10 }}>
        <MyNavBar />
        <div className='title' style={{ margin: 20 }}>
          
          <p>Your account: {this.state.account}</p>
          <Button> Cool </Button>
        </div>
      </div>
    )
  }
}
