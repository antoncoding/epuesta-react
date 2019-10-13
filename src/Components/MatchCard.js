import { Component } from 'react'
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import VerificationModal from './VerifyModal'
import Web3 from 'web3'
import abi from '../abi'

const web3 = new Web3(Web3.givenProvider)
export default class Match extends Component {
  state = {
    home: '',
    away: '',
    contract: undefined,
    verified: false,
  }

  async checkMatchStatus() {
    const contract = new web3.eth.Contract(abi, this.props.match.address)
    const homeVerified = await contract.methods.awayTeamVerified().call()
    const awayVerified = await contract.methods.homeTeamVerified().call()
    const home = await contract.methods.homeTeam().call()
    const away = await contract.methods.awayTeam().call()
    const verified = homeVerified && awayVerified
    this.setState({ home, away, verified, homeVerified, awayVerified, contract })
  }

  render() {
    this.checkMatchStatus()
    const badges = this.state.verified ? (
      <Badge variant='success'> Verified </Badge>
    ) : (
      <VerificationModal
        account={this.props.account}
        contract={this.state.contract}
        homeVerified={this.state.homeVerified}
        awayVerified={this.state.awayVerified}
      />
    )
    // : <Badge variant='dark'> Not verified </Badge>

    return (
      <Card style={{ width: 'max', margin: 10 }}>
        <Card.Body>
          <Card.Title>
            {this.state.home} vs {this.state.away}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {this.props.match.address} {badges}
          </Card.Subtitle>
          <Card.Text>{this.props.match.time}</Card.Text>
          <Button variant='primary'>Go Bet</Button>
        </Card.Body>
      </Card>
    )
  }
}
