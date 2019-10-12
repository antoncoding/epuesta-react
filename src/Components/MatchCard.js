import { Component } from 'react'
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class Match extends Component {
  render() {
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title> {this.props.match.home} vs {this.props.match.away}</Card.Title>
          <Card.Text>
            {this.props.match.time}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    )
  }
}
