const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'Ruby on Rails',
    author: 'Dimitri',
    url: 'http//www.ruby.com',
    likes: '2'
  },
  {
    title: 'PHP',
    author: 'Kevin',
    url: 'http//www.php.com',
    likes: '0'
  }
]

const nonExistingId = async () => {

  const blog = new Blog({
    title: 'Cobol',
    author: 'jacqueline',
    url: 'http//www.soeurtherese.com',
    likes: '0' })


  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}



module.exports = { initialBlogs, nonExistingId, blogsInDb }