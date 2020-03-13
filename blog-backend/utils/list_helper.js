
const _ = require('lodash')


const sumOfBlogsLikes = (blogs) => {
  if (blogs) {
    return blogs.reduce((sum, item) => {
      return sum + item.likes
    }, 0)
  }
  else {
    return 0
  }
}


const favoriteBlog = (blogs) => {
  if(blogs) {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
  }
  return null
}


const mostBlogs = (blogs) => {
  const amountBlogs_by_author =
  _.chain(blogs).groupBy('author')
    .map((value, key) => ({ author: key, blogs: value.length }))
    .value()

  return amountBlogs_by_author.reduce((max, blog) => {

    return blog.blogs > max.blogs ? blog : max
  })
}


const mostLikes = (blogs) => {
  const amountLikes_by_author =
  _.chain(blogs).groupBy('author')
    .map((value, key) => ({ author: key, likes: value.reduce((sum, item) => {
      return sum + item.likes
    }, 0) }))
    .value()

  return amountLikes_by_author.reduce((max, authorLikes) => {
    return authorLikes.likes > max.likes ? authorLikes : max
  })

}
module.exports = {
  sumOfBlogsLikes, favoriteBlog, mostBlogs, mostLikes
}
