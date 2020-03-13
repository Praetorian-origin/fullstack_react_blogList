const mongoose = require('mongoose')
const helper = require('../utils/bloghelper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('number of blogs returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('unique identifier of blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')

  response.body.forEach(element => {
    expect(element.id).toBeDefined()
  })
})


test('blog post is created', async () => {
  const newBlog = {
    title: 'Clojure for the brave',
    author: 'Ragnar',
    url: 'vallaha.com',
    likes: 500
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(contents).toContain('Clojure for the brave')
})


test('if likes missing from post request, default to 0', async () => {

  const newBlog = {
    title: 'Lisp',
    author: 'Markavel',
    url: 'listgames.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')
  const contents = response.body

  const blogGenerated = contents.filter(content => content.title === 'Lisp')

  expect(blogGenerated[0].likes).toBe(0)
})


test('if title and url properties are missing, the backend shoould respond with 400 bad request', async () => {
  const newBlog = {
    author:'Jackelin le grand'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})




