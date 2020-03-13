import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const _ = require('lodash')
const BlogCountPerUser = (props) => {


  const amountOfBlogsPerUser = _.chain(props.blogs).groupBy('user.id').map((value, key) => (
    { user_id: key, blogs : value.length })).value()


    console.log(amountOfBlogsPerUser)
  return (
    <>
      <h1>Users</h1>
      <Table stripped="true">
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>


          {amountOfBlogsPerUser.map(blogPerUser => {
            return (<tr key={blogPerUser.user_id}>
              <td><Link to={`/users/${blogPerUser.user_id}`}>{props.blogs.find(blog => { return (blog.user.id === blogPerUser.user_id)}).user.username}</Link></td>
              <td>{blogPerUser.blogs}</td>
            </tr>)
          })}
        </tbody>
      </Table>
    </>


  )
}

const mapStateToProps = (state) => {

  return {
    blogs: state.blogs
  }
}
export default connect(mapStateToProps, null)(BlogCountPerUser)