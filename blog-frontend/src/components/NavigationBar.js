import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  withRouter
} from 'react-router-dom'


const NavigationBarWithoutHistory = (props) => {


  const handleLogout = () => {
    props.logout()
    props.setNotification('logged out', 'success', 5)
    props.history.push('/')
  }



  return (

    <Navbar bg="light" expand="lg">

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link as={Link} to="/users">Users</Nav.Link>
          <Nav.Link as={Link} to="/">Blogs</Nav.Link>
          {props.user ? <Navbar.Text> logged in {<Button size="sm" onClick={handleLogout}>logout</Button>}</Navbar.Text> : null}

        </Nav>

      </Navbar.Collapse>
    </Navbar>
  )
}


const NavigationBar = withRouter(NavigationBarWithoutHistory)


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = { logout, setNotification }

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)