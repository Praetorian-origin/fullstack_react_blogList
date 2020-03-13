import React from 'react'
import {
  Route, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, user, ...rest }) => {

  return (
    <Route {...rest} render={(props) => {

      return (
        user
          ? <Component  {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
      )
    }} />
  )
}
const mapStateToProps = (state) => {
  if (typeof state.user.user !== 'undefined') {
    return {
      user: state.user.user
    }
  }
  return {
    user: state.user
  }
}


export default withRouter(connect(mapStateToProps, null)(PrivateRoute))