import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const UserBlogs = (props) => {

  if (props.blogs === undefined || !props.blogs.length) {
    return null
  }

  return (
    <>
      <h1>Added blogs</h1>
      <h2>{props.blogs[0].user.name}</h2>
      <ul>
        {props.blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>)}
      </ul>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const blogs = state.blogs.filter(blog =>
    blog.user.id === ownProps.userId
  )

  return {
    blogs
  }
}

export default connect(mapStateToProps, null)(UserBlogs)