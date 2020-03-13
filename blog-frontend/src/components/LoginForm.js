import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'


const LoginForm = (props) => {

  const username = useField('')
  const password = useField('')

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = { username: username.value, password: password.value }

    try {
      const user = await props.login(
        credentials
      )
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      props.setNotification('Logged in', 'sucess', 5)
    } catch (exception) {
      props.setNotification('Wrong Crendentials', 'danger', 10)
    }
  }



  const usernameInput = { ...username }
  delete usernameInput.setValue

  const passwordInput = { ...password }
  delete passwordInput.setValue

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control data-cy="login"
            {...usernameInput}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control data-cy="password"
            {...passwordInput}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>


    </div>
  )
}


const mapDispatchToProps = {
  login, setNotification
}

export default connect(null, mapDispatchToProps)(LoginForm)