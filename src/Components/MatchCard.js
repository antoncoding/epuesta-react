import { Component } from 'react'
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import VerificationBadge from './VerifyModal'
import Web3 from 'web3'
import abi from '../abi'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    const homeVerified = await contract.methods.homeTeamVerified().call()
    const awayVerified = await contract.methods.awayTeamVerified().call()
    const home = await contract.methods.homeTeam().call()
    const away = await contract.methods.awayTeam().call()
    const verified = homeVerified && awayVerified

    const token = await contract.methods.betToken().call();

    this.setState({ home, away, verified, homeVerified, awayVerified, contract, token })
  }

  render() {
    this.checkMatchStatus()
    const badges = this.state.verified ? (
      <Badge variant='success'> Verified </Badge>
    ) : (
      <VerificationBadge
        home = {this.state.home}
        away = {this.state.away}
        account={this.props.account}
        contract={this.state.contract}
        homeVerified={this.state.homeVerified}
        awayVerified={this.state.awayVerified}
      />
    )

    return (
      <Card style={{ width: 'max', margin: 10 }}>
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col xs>{this.state.home}</Col>
                <Col xs style={{ textAlign: 'center' }}>
                  vs
                </Col>
                <Col>{this.state.away}</Col>
              </Row>
            </Container>
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            <Container>
              {this.props.match.address} {badges}
            </Container>
          </Card.Subtitle>
          <Card.Text>
            <Container>
            {/* {this.props.match.time} */}
            <Button variant='primary'>Go Bet</Button>
            </Container>
          </Card.Text>
          
        </Card.Body>
      </Card>
    )
  }
}
