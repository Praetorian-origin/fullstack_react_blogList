import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = { user: null, logged_in: false, loading: true }, action) => {
  switch (action.type) {
  case 'LOGGED_IN':
    return { user: action.data, logged_in: true, loading: false }
  case 'LOGGED_OUT':
    return { user: null, logged_in: false, loading: false }
  default:
    return state
  }
}

export const login = (data) => {
  return async dispatch => {
    try {
      const user = await loginService.login(data)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGGED_IN',
        data: user
      })
    }
    catch (exception) {
      throw exception
    }
  }
}

export const logout = () => {
  localStorage.removeItem('loggedBlogAppUser')
  return async dispatch => {
    dispatch({
      type: 'LOGGED_OUT'
    })
  }
}


export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGGED_IN',
        data: user
      })
    }
    else {
      dispatch({
        type: 'LOGGED_OUT',
      })
    }

  }
}


export default reducer