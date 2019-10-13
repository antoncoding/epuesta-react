import React from 'react'
import Web3 from 'web3'
import MyNavBar from './Components/Navbar'
import MatchList from './Components/MatchList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const web3 = new Web3(Web3.givenProvider)

export default class App extends React.Component {
  state = {
    account: '',
    network: 'ropsten',
    matches: [
      { address: "0x729f2e72cffdf4649cb54516cc688f8af31e5e7f", time: 'Tomorrow', league: 'UEFA'},
      // { home: 'AKA', away: 'BBC', time: 'Next Week', league: 'UEFA', verified: false },
    ],
  }

  async loadMetaMask() {
    await window.ethereum.enable()
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    // const contract = new web3.eth.Contract(abi, "0x729f2e72cffdf4649cb54516cc688f8af31e5e7f")
    this.setState({ account: accounts[0], network })
  }

  componentDidMount() {
    this.loadMetaMask()
  }
  render() {
    return (
      <div>
        <MyNavBar account={this.state.account} />
        <Container>
          <Row className='justify-content-md-center'>
            <Col lg={true}>
              <MatchList account={this.state.account} matches={this.state.matches}></MatchList>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
