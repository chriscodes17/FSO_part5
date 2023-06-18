import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, handleLike, user, handleBlogDelete }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          user={user}
          handleBlogDelete={handleBlogDelete}
        />
      ))}
    </div>
  );
};

Blogs.prototype = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
};

export default Blogs;
