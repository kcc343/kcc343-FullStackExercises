const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
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
  const response = await api.get('/api/blogs')
  const initialLength = response.body.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const responseAfter = await api.get('/api/blogs')
  const newLength = responseAfter.body.length
  expect(newLength).toBe(initialLength + 1)
})

afterAll(() => {
  mongoose.connection.close()
})