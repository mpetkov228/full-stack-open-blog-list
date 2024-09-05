const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

test('returns users as JSON', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('succeeds with valid data', async () => {
  const newUser = {
    username: 'testuser',
    name: 'test',
    password: 'testuser'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await api.get('/api/users');
  const usernames = usersAtEnd.body.map(user => user.username);

  assert.strictEqual(usersAtEnd.body.length, helper.initialUsers.length + 1);
  assert(usernames.includes(newUser.username));
});

test('fails with invalid data', async () => {
  const newUser = {
    username: 'me',
    name: 'test',
    password: 'password'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await api.get('/api/users');
  assert.strictEqual(usersAtEnd.body.length, helper.initialUsers.length);
});

test('fails with duplicate username', async () => {
  const duplicateUser = helper.initialUsers[0];

  await api
    .post('/api/users')
    .send(duplicateUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await api.get('/api/users');
  assert.strictEqual(usersAtEnd.body.length, helper.initialUsers.length);
});

after(async () => {
  await mongoose.connection.close();
});