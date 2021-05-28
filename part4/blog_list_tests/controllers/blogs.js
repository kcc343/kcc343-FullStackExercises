const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) {
      response.status(400).end()
    } else {
      const blog = new Blog(request.body)
      const savedBlog = await blog.save()

      response.status(201)
      response.json(savedBlog.toJSON())
    }
})

module.exports = blogRouter