import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <div className="text-center">
          <Button variant="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className="text-center" style={{ margin: '10px  0px' }}>
          <Button variant="danger" onClick={toggleVisibility}>cancel</Button>
        </div>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable