import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {

  const notification = props.notification
  if (notification.content) {
    return (
      <Alert variant={notification.messageType}>
        {notification.content}
      </Alert>
    )
  }
  else {
    return (<></>)
  }
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)