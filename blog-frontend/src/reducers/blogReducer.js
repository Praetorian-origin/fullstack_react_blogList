
import blogService from '../services/blogs'


const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG': {
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  case 'LIKE_BLOG': {
    const id = action.data.id
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  }
  case 'ADD_COMMENT': {
    console.log('yes????')
    const id = action.data.id
    const comment = action.data.comment

    const blogToChange = state.find(blog => blog.id === id)
    // blogToChange.comments.push(comment.comment)

    const changedBlog = {
      ...blogToChange,
    }
    changedBlog.comments.push(comment.comment)
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  }
  default:
    return state
  }
}

export const likeBlog = (blog) => {
  const blogToChange = { ...blog }
  blogToChange.likes = blog.likes + 1
  return async dispatch => {
    await blogService.update(blog.id, blogToChange)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: blog.id }
    })
  }
}


export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      await blogService.addComment(blog.id, comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: {
          id: blog.id,
          comment
        }
      })
    } catch (exception) {
      throw exception
    }
  }

}


export const createBlog = (data) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(data)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    }
    catch (error) {
      throw error.response.data.error
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.destroy(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: { id }
      })
    } catch (exception) {
      throw exception
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer