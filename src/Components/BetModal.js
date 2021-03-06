import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default class BetButton extends Component {
  state = {
    betAmount: 0,
    show: false,
    homeRatio: 0,
    tieRatio: 100,
    awayRatio: 0,
  }

  async loadBetInfo() {
    let totalPool = await this.props.contract.methods.totalPool().call()
    const homePool = await this.props.contract.methods.typePool(0).call()
    const awayPool = await this.props.contract.methods.typePool(1).call()
    totalPool = totalPool === 0 ? 1 : totalPool
    const homeRatio = (homePool / totalPool) * 100
    const awayRatio = (awayPool / totalPool) * 100
    const tieRatio = 100 - homeRatio - awayRatio
    this.setState({ homeRatio, awayRatio, tieRatio })
  }

  componentWillMount() {
    this.loadBetInfo()
  }

  render() {
    this.loadBetInfo()
    return (
      <>
        <Button variant='dark' onClick={() => this.setState({ show: true })}>
          Bet
        </Button>

        <Modal size='lg' show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Container>Place a bet</Container>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>

            <ProgressBar style={{margin:30}}>
                <ProgressBar animated variant='info' now={this.state.homeRatio} key={1} />
                <ProgressBar animated variant='warning' now={this.state.tieRatio} key={2} />
                <ProgressBar animated variant='success' now={this.state.awayRatio} key={3} />
              </ProgressBar>

              <Row style={{margin:20}}>
                Amount of Tokens
                <input
                  value={this.state.betAmount}
                  onChange={event => {
                    this.setState({ betAmount: event.target.value })
                  }}
                ></input>
              </Row>

              

              <Button
                onClick={() => {
                  this.props.contract.methods.bet(1, this.state.betAmount).send({ from: this.props.account })
                }}
              >
                Place Bet
              </Button>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => this.setState({ show: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
