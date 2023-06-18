import { useState } from "react";

const Blog = ({ blog, handleLike, user, handleBlogDelete }) => {
  const [isVisible, setIsVisible] = useState(false);

  const blogStyle = {
    width: 375,
    padding: 8,
    marginTop: 10,
    border: "solid",
    borderWidth: 1,
  };

  const isVisibleStyle = {
    display: isVisible ? "" : "none",
  };
  return (
    <div style={blogStyle} className="blog">
      <div className="blogHeader">
        {blog.title} - {blog.author}{" "}
      </div>
      <button className="viewBtn" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "hide" : "view"}
      </button>
      <div style={isVisibleStyle} id="togglable">
        <p>{blog.url}</p>
        <p id="likesText">
          Likes: {blog.likes} <button id="likeBtn" onClick={() => handleLike(blog)}>Like</button>
        </p>
        <p>posted by: {blog.user.name}</p>
        {user.id === blog.user.id ? (
          <button onClick={() => handleBlogDelete(blog)}>Delete</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
