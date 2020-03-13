const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




//GET FOR LISTING BLOGS
blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))

})

// POST FOR CREATING BLOG POSTS
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (!blog.likes) {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
    response.status(201).json(savedBlog.toJSON())

  } catch (exception) {

    next(exception)
  }
})


// POST FOR CREATING COMMENTS
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  console.log(body)
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  if (!body.comment) {
    return response.status(403).json({ error: 'no comment' })
  }
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const blog = await Blog.findById(request.params.id)
    blog.comments.push(body.comment)
    await blog.save()
    response.status(200).json(blog)

  } catch (exception) {
    next(exception)
  }

})



// DELETE FOR DELETE POSTS
blogsRouter.delete('/:id', async (request, response, next) => {

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)
    if (!blog.user.toString() === user.id.toString()) {
      return response.status(403).json({ error: 'only user that owns that post can delete it' })
    }
    await blog.delete()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})




// PUT FOR UPDATING POSTS
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  // const token = getTokenFrom(request)
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(decodedToken.id)

    const updatedBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }


    // const blogToUpdate = await Blog.findById(request.params.id)
    // if (!blogToUpdate.user.toString() === user.id.toString()) {
    //   return response.status(403).json({ error: 'only user that owns that post can update it' })
    // }
    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.status(200).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
