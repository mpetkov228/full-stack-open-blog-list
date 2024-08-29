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

  for (const blog in initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});



after(async () => {
  await mongoose.connection.close();
});