import Match from './MatchCard'
import React from 'react'
import Container from 'react-bootstrap/Container'

export default class MatchList extends React.Component {
  render() {
    let matches
    if (this.props.matches) {
      matches = this.props.matches.map(match => {
        return <Match account={this.props.account} key={match.home + match.away} match={match}></Match>
      })
    }
    return (
      <Container>
        <h2 style={{ margin: 20 }}>Available Matches</h2>
        {matches}
      </Container>
    )
  }
}
