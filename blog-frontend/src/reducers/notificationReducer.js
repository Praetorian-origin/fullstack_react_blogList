const notificationReducer = (state = { content: '', messageType: '' }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'HIDE_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = (content, messageType, duration) => {
  return async dispatch => {
    dispatch(
      {
        type: 'SET_NOTIFICATION',
        data: { content, messageType }
      })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        data: { content: '', messageType: '' },
        messageType: null

      })
    }, duration * 1000)
  }
}



export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: null
  }
}


export default notificationReducer