const Blog = require('../models/blog');

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

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'secret'
  },
  {
    username: 'myuser',
    name: 'me',
    password: 'password'
  }
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'placeholder',
    author: 'placeholder',
    url: 'placeholder'
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId
};