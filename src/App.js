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
      { address: "0x7faaa0e5a0bf07a0cc993de05bc224c6791cec79"},
      { address: "0xce35e04641f5ce816507fe3f4c79076abdbf4c64"},
    ],
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
