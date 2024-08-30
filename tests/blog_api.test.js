const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Elden Ring Review',
    author: 'John Eldenring',
    url: 'https://gamereviews.com',
    likes: 44
  },
  {
    title: 'JS and You',
    author: 'Jane Smith',
    url: 'https://programmeinjs.com',
    likes: 13
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('returns blogs as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blog posts have "id" property', async () => {
  const blogs = await api.get('/api/blogs');
  const blogToTest = blogs.body[0];
  assert(blogToTest.id);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Integration testing',
    author: 'Bob Gray',
    url: 'https://tester.com',
    likes: 27
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const response = await api.get('/api/blogs');
  const titles = response.body.map(blog => blog.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(titles.includes('Integration testing'));
});

after(async () => {
  await mongoose.connection.close();
});