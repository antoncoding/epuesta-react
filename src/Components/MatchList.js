import Match from './MatchCard'
import React from 'react'

export default class MatchList extends React.Component {
  render() {
    let matches
    if (this.props.matches) {
      matches = this.props.matches.map(match => {
        return <Match match={match}></Match>
      })
    }
    return <div>{matches}</div>
  }
}
