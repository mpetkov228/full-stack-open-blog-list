const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return;
  }

  let currentFavorite = blogs[0];

  blogs.forEach(blog => {
    if (blog.likes > currentFavorite.likes) {
      currentFavorite = blog;
    }
  });

  return {
    title: currentFavorite.title,
    author: currentFavorite.author,
    likes: currentFavorite.likes
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return;
  }

  const authors = {};
  blogs.forEach(blog => {
    if (!authors[blog.author]) {
      authors[blog.author] = 1;
    } else {
      authors[blog.author]++;
    }
  });

  const sortedAuthors = Object.entries(authors).sort((a, b) => b[1] - a[1]);

  return {
    author: sortedAuthors[0][0],
    blogs: sortedAuthors[0][1]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};