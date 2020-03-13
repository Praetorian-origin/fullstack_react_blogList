import React from 'react'
import { render, fireEvent } from '@testing-library/react' // highlight-line
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'

// 5.15
test('only the name and the author of the blog post are shown by default, when clicking blog, displays other information', () => {
  const blog = {
    title: 'some blog',
    author: 'some author',
    url: 'some url',
    likes: 2,
    user: { username: 'nemesis' }
  }


  const component = render(
    <Blog blog={blog} />
  )

  const blogDetails = component.container.querySelector('.blogDetails')
  expect(blogDetails).toHaveStyle('display: none')

  const text= `${blog.title}, written by ${blog.author}`
  const clickableDiv = component.getByText(text)
  fireEvent.click(clickableDiv)
  expect(blogDetails).toHaveStyle('display: block')

})
