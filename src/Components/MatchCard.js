import { Component } from 'react'
import React from 'react'
import Card from 'react-bootstrap/Card'
import Switch from 'react-switch'
import Badge from 'react-bootstrap/Badge'
import VerificationBadge from './VerifyModal'
import BetButton from './BetModal'
import Web3 from 'web3'
import matchABI from '../abis/match'
import tokenABI from '../abis/erc20'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const web3 = new Web3(Web3.givenProvider)
export default class Match extends Component {
  constructor(){
    super();
    this.state = {
      home: '',
      away: '',
      contract: undefined,
      verified: false,
      enabled: false,
      tokenContract: undefined
    }
    this.setAllowance = this.setAllowance.bind(this);
  }
  

  async checkMatchStatus() {
    const homeVerified = await this.state.contract.methods.homeTeamVerified().call()
    const awayVerified = await this.state.contract.methods.awayTeamVerified().call()
    const home = await this.state.contract.methods.homeTeam().call()
    const away = await this.state.contract.methods.awayTeam().call()
    const verified = homeVerified && awayVerified
    const token = await this.state.contract.methods.betToken().call()
    const tokenContract = new web3.eth.Contract(tokenABI, token)
    const allowance = await tokenContract.methods.allowance(this.props.account, this.props.match.address).call()
    const enabled = allowance > 0
    this.setState({ home, away, verified, homeVerified, awayVerified, enabled, tokenContract })
  }

  async setAllowance(enable) {
    const amount = enable ? '0xfc9e0eefe9f3a5101b7c025b217c03c95dbf9bb4f2d1d46db238e305af104103' : 0;
    await this.state.tokenContract.methods.approve(this.props.match.address, amount).send({ from: this.props.account })
  }

  componentWillMount() {
    const contract = new web3.eth.Contract(matchABI, this.props.match.address)
    this.setState({ contract })
  }


  render() {
    this.checkMatchStatus()
    const badges = this.state.verified ? (
      <Badge variant='success'> Verified </Badge>
    ) : (
      <VerificationBadge
        home={this.state.home}
        away={this.state.away}
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
            <Container style={{margin:20}} >
              <Row><Switch onChange={this.setAllowance} checked={this.state.enabled} /></Row>
              <Row>{this.props.match.address} {badges}</Row>
            </Container>
          </Card.Subtitle>
          <Card.Text>
            <Container>
              <BetButton contract={this.state.contract} account={this.props.account} />
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
