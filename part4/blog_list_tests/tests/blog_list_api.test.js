const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/blog_helper')

const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlog) {
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id property', async () => {
  const blogs = await helper.blogsInDb()
  for (let blog of blogs) {
    expect(blog.id).toBeDefined()
  }
})

test('blogs can receive POST request', async () => {
  const newBlog = {
    title: "March comes in Like a Lion",
    author: "Chika Umino",
    url: "https://myanimelist.net/anime/31646/3-gatsu_no_Lion",
    likes: 40
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const responseAfter = await helper.blogsInDb()
  expect(responseAfter).toHaveLength(helper.initialBlog.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})