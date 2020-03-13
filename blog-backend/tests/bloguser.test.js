const mongoose = require('mongoose')
const helper = require('../utils/userhelper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')



beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})



describe('user modifications and creations', () => {


  test('can\'t add user if password missing', async () => {

    const userCount = await helper.countofUsers()
    const newUser = {
      name: 'Hello',
      username: 'Dupont'
    }
    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const newUserCount = await helper.countofUsers()
    expect(newUserCount === userCount)
  })


  test('can\'t add user if username already exists', async () => {
    //username root already exists, declared in userhelper
    const userCount = await helper.countofUsers()

    const newUser = {
      name: 'master',
      password: 'eorrtorit',
      username: 'root'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newUserCount = await helper.countofUsers()
    expect(newUserCount === userCount)

  })


  test('can\'t add user if username is less than 3 characters', async () => {

    const userCount = await helper.countofUsers()
    const newUser = {
      username: 'aa',
      password: 'ozerkor',
      name: 'zeozpeoz'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newUserCount = await helper.countofUsers()
    expect(newUserCount === userCount)


  })


  test('test user creation with all requirements fulfilled', async () => {
    const userCount = await helper.countofUsers()
    const newUser = {
      username: 'aaa',
      password: 'ozerkor',
      name: 'zeozpeoz'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const newUserCount = await helper.countofUsers()
    expect(newUserCount === userCount + 1)

    const response = await api.get('/api/users')

    const contents = response.body.map(r => r.username)
    expect(contents).toContain('aaa')
  })

})


describe('Login', () => {

  test('can login to an existing user with good password', async () => {
    const credentials = {
      username: 'root',
      password: 'erzropgreopgje'
    }


    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)

    expect(response.token !== undefined)
  })


  test('cannot login to an existing user with bad password', async () => {
    const credentials = {
      username: 'root',
      password: 'aaaaaaaaaa'
    }



    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)

    expect(response.token === undefined)
  })

})
describe('blog create, update and delete testing with/without user credentials', () => {


  test('can\'t add blog post without being logged', async () => {

    const initialBlogCount = await Blog.count({})
    const newBlog = {
      url: 'http://www.ruby.com',
      title: 'Ruby, with clojure the best languages ever'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const afterBlogCount = await Blog.count({})
    expect(initialBlogCount === afterBlogCount)

  })


  test('While being logged, blog created is linked to user', async () => {

    const initialBlogCount = await Blog.count({})
    const credentials = {
      username: 'root',
      password: 'erzropgreopgje'
    }


    const responseLogin = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)


    const newBlog = {
      url: 'http://www.ruby.com',
      title: 'Ruby, with clojure the best languages ever'
    }
    const responseAddBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${responseLogin.body.token}`)
      .send(newBlog)
      .expect(201)


    const afterBlogCount = await Blog.count({})
    expect(initialBlogCount + 1 === afterBlogCount)

    const userLogged = await User.findOne({ username: responseLogin.body.username.toString() })
    expect(responseAddBlog.body.user.toString() === userLogged._id.toString())

  })


  test('If logged as not owner of note, can\'t delete note', async () => {

    // first login as root to create a blog
    const credentials = {
      username: 'root',
      password: 'erzropgreopgje'
    }


    const responseLogin = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)


    const newBlog = {
      url: 'http://www.ruby.com',
      title: 'Ruby, with clojure the best languages ever'
    }
    const responseAddBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${responseLogin.body.token}`)
      .send(newBlog)
    // login as another user

    const credentials2 = {
      username: 'blackwhite',
      password: 'erzropgreo74854je'
    }

    const responseLogin2 = await api
      .post('/api/login')
      .send(credentials2)
      .expect(200)


// to do

})










afterAll(() => {
  mongoose.connection.close()
})