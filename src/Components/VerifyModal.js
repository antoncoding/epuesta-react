import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export default class VerificationBadge extends Component {
  state = {
    show: false,
    progress: 0,
  }
  render() {
    let homeVerifyButton = this.props.homeVerified ? (
      <Button variant='outline-secondary' disabled>
        Verify Home Team
      </Button>
    ) : (
      <Button
        variant='secondary'
        onClick={() => {
          this.props.contract.methods.verifyHomeTeam().send({ from: this.props.account })
        }}
      >
        Verify Home Team
      </Button>
    )

    let awayVerifyButton = this.props.awayVerified ? (
      <Button variant='outline-secondary' disabled>
        Verify Away Team
      </Button>
    ) : (
      <Button
        variant='secondary'
        onClick={() => {
          this.props.contract.methods.verifyAwayTeam().send({ from: this.props.account })
        }}
      >
        Verify Away Team
      </Button>
    )

    return (
      <>
        <Badge variant='dark' onClick={() => this.setState({ show: true })}>
          Unverified
        </Badge>

        <Modal size='lg' show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Container>Match Data Verification</Container>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>Click the following buttons to verify teams data with ChainLink Oracle.</Col>
              </Row>
              <Row style={{marginTop:30}} >
                <Col>
                  <h5> {this.props.home} </h5>
                </Col>
                <Col>
                  <h5> {this.props.away} </h5>
                </Col>
              </Row>
              <Row>
                <Col> {homeVerifyButton} </Col>
                <Col> {awayVerifyButton} </Col>
              </Row>
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
