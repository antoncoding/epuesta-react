import React from 'react'
import Web3 from 'web3'
import MyNavBar from './Components/Navbar'
import MatchList from './Components/MatchList'
const web3 = new Web3(Web3.givenProvider)

export default class App extends React.Component {
  state = {
    account: '',
    network: 'ropsten',
    matches: [
      { home: 'RM', away: 'BCE' },
      { home: 'AKA', away: 'BBC' }
    ]
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
      <div>
        <MyNavBar account={this.state.account} />
        <div className='title' style={{ margin: 20 }}>
          <MatchList matches={this.state.matches} ></MatchList>
        </div>
      </div>
    )
  }
}
