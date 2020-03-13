// import React, { useState, useEffect } from 'react'
import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import BlogCountPerUser from './components/BlogCountPerUser'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'
import NavigationBar from './components/NavigationBar'
// import { Button } from 'react-bootstrap'
import PrivateRoute from './PrivateRoute'
import {
  Switch,
  Router,
  Route, Redirect
} from 'react-router-dom'

import history from './history'
import './app.css'

const App = (props) => {


  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {

    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    props.initializeLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const loginForm = () => {
  //   const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  //   const showWhenVisible = { display: loginVisible ? '' : 'none' }

  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <Button onClick={() => setLoginVisible(true)}>log in</Button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         <LoginForm />
  //         <Button variant="danger" onClick={() => setLoginVisible(false)}>cancel</Button>
  //       </div>
  //     </div>
  //   )
  // }



  const blogFormRef = React.createRef()

  if(props.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>


      <Router history={history}>
        <Notification />



        <NavigationBar />
        <div className='container'>

          <Switch>


            <PrivateRoute exact path="/users" component={BlogCountPerUser} />
            <PrivateRoute exact path='/users/:id' component={({ match }) => <UserBlogs userId={match.params.id} />} />
            <PrivateRoute exact path='/blogs/:id' component={({ match }) => <BlogView blogId={match.params.id} />} />

            <PrivateRoute exact path='/' component={() =>
              <>
                <BlogList />
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
              </>
            } />
            <Route exact path="/login" render={() => !props.user ? <LoginForm /> : <Redirect to="/" />} />
            <Redirect from='*' to ="/"/>
          </Switch>



        </div>

      </Router>

      {/* <Router>
        <Notification />



        <NavigationBar />
        <div className='container'>

          {props.user === null ? loginForm() :
            <>
              <Route exact path="/" render={() =>
                <>
                  <BlogList />
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                </>

              } />
              <Route exact path="/users" render={() => <BlogCountPerUser />} />
              <Route exact path="/users/:id" render={({ match }) => <UserBlogs userId={match.params.id} />} />
              <Route exact path="/blogs/:id" render={({ match }) => <BlogView blogId={match.params.id} />} />

            </>}
        </div>
      </Router> */}


    </div>
  )


}

const mapStateToProps = (state) => {
  if (typeof state.user.user !== 'undefined') {
    return {
      user: state.user.user,
      loading : state.user.loading
    }
  }
  return {
    user: null,
    loading : state.user.loading
  }
}

const mapDispatchToProps = {
  setNotification, initializeLogin, initializeBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
