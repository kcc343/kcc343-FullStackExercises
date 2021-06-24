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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  const newNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(newNote);
})

module.exports = blogRouter