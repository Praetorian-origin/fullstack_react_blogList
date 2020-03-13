import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/index'
import { Form, Button } from 'react-bootstrap'
// notification reducer there


// const BlogForm = (props) => {
const BlogForm = (props) => {



  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  const newTitleInput = { ...newTitle }
  delete newTitleInput.setValue

  const newAuthorInput = { ...newAuthor }
  delete newAuthorInput.setValue


  const newUrlInput = { ...newUrl }
  delete newUrlInput.setValue


  const addBlog = async (event) => {
    event.preventDefault()
    //blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
    }
    try {
      await props.createBlog(newBlog)
      props.setNotification('Succesfully created blog', 'sucess', 5)
      newTitle.setValue('')
      newAuthor.setValue('')
      newUrl.setValue('')
      props.blogFormRef.current.toggleVisibility()
    }
    catch (error) {
      props.setNotification(error, 'danger', 10)
    }
  }







  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          {...newTitleInput}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author: </Form.Label>
        <Form.Control
          {...newAuthorInput}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL : </Form.Label>
        <Form.Control
          {...newUrlInput}
        />
      </Form.Group>
      <div className="text-center">
        <Button type="submit">create</Button>
      </div>
    </Form>)
}

const mapDispatchToProps = {
  createBlog, setNotification
}

const mapStateToProps = (state) => {
  return state.user
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)

