import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

// import Blog from './Blog'
const BlogList = (props) => {



  return (
    <>
    <h1>Blog List</h1>
    <Table stripped="true">

      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {props.blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1).map(blog =>
          <tr key={blog.id} >
            <td>
              <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>
              {blog.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    </>

  )
}

const mapStateToProps = (state) => {

  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, null)(BlogList)