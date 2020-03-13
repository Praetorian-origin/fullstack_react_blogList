import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  withRouter
} from 'react-router-dom'
import { useField } from '../hooks/index'
import { addComment } from '../reducers/blogReducer'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
const BlogViewNoHistory = (props) => {

  const remove = async (id) => {

    if (window.confirm(`Do you really want to delete '${props.blog.title}' ?`)) {

      try {
        await props.deleteBlog(id) // props.deleteBlog(id)
        props.setNotification(`Deleted ${props.blog.title}`, 5)
        props.history.push('/')
      }
      catch (exception) {
        props.setNotification(exception, 10)
      }
    }
  }

  const like = async (blog) => {

    try {
      await props.likeBlog(blog)
      props.setNotification(`Liked ${blog.title}`, 'success', 5)
    }
    catch (exception) {
      props.setNotification(exception.response.data.error, 'danger', 10)
    }


  }

  const newComment = useField('text')
  const newCommentInput = { ...newComment }
  delete newCommentInput.setValue


  const addCommentHandler = async () => {
    const newCommentText = { comment: newComment.value }
    if (newCommentText.comment) {
      try {
        await props.addComment(props.blog, newCommentText)
        props.setNotification('Added comment', 'success', 5)
      }
      catch (exception) {
        props.setNotification(exception.response.data.error, 'danger', 10)
      }

    }
  }


  if (props.blog === undefined) {
    return null
  }
  return (
    <div>
      <p className='blog'><strong>{props.blog.title}</strong>, written by {props.blog.author}</p>

      <p>Link to the blog: {<a href={props.blog.url}>{props.blog.url}</a>}</p>

      <p>Likes: <strong>{props.blog.likes}</strong></p>

      <Button variant="success" onClick={() => like(props.blog)}>Like</Button>

      <p>Added by {props.blog.user.username}</p>

      {props.user.username === props.blog.user.username ? <Button variant="danger" onClick={() => remove(props.blog.id)}>Delete</Button> : null}

      <h3>Comments :</h3>
      <InputGroup>
        <FormControl
          {...newCommentInput}
        />
        <InputGroup.Append>
          <Button variant="primary" onClick={addCommentHandler}>add comment</Button>
        </InputGroup.Append>
      </InputGroup>

      <ul>
        {props.blog.comments.map((comment, index) => {
          return (<li key={index}>{comment}</li>)
        })}
      </ul>

    </div>


  )
}
const BlogView = withRouter(BlogViewNoHistory)




const mapDispatchToProps = {
  deleteBlog, likeBlog, setNotification, addComment
}
const mapStateToProps = (state, ownProps) => {
  const blog = state.blogs.find(blog => ownProps.blogId === blog.id)

  return {
    blog,
    user: state.user.user
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(BlogView)