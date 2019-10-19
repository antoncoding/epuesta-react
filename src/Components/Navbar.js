import { Component } from 'react'
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class MyNavBar extends Component {

  render() {
    return (
      <Navbar sticky="top" bg='light' expand='lg'>
        <Navbar.Brand href='#home'> Epuesta </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Matches</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            Signed in as: {this.props.account}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
