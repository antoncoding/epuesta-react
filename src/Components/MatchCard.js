import { Component } from 'react'
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

export default class Match extends Component {
  render() {
    let badges = this.props.match.verified ? <Badge variant='success'> Verified </Badge> : <Badge variant='dark'> Not verified </Badge>

    return (
      <Card style={{ width: 'max', margin: 10 }}>
        <Card.Body>
          <Card.Title>
            {this.props.match.home} vs {this.props.match.away}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'> {this.props.match.league} { badges }</Card.Subtitle>
          <Card.Text>{this.props.match.time}</Card.Text>
          <Button variant='primary'>Go Bet</Button>
        </Card.Body>
      </Card>
    )
  }
}
