import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
  blogs : blogReducer,
  user: loginReducer,
  notification : notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
