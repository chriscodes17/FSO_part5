import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateBlogForm from "./components/CreateBlogForm";
import NotificationMessage from "./components/NotificationMessage";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogResponseArray = await blogService.getAll();
      const compareLikes = (a, b) => {
        return b.likes - a.likes;
      };
      blogResponseArray.sort(compareLikes); //highest likes first
      setBlogs(blogResponseArray);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      handleMessage({ error: true, message: error.response.data.error });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleBlogPost = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility();
      const savedBlog = await blogService.createBlog(blogObj);
      setBlogs(blogs.concat({ ...savedBlog, user: { name: user.name, id: user.id } }));
      handleMessage({
        error: false,
        message: `A new blog - ${savedBlog.title} by ${savedBlog.author}`,
      });
    } catch (error) {
      handleMessage({ error: true, message: error.response.data.error });
    }
  };

  const handleBlogDelete = async (blogObj) => {
    if (window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`)) {
      blogService.removeBlog(blogObj.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogObj.id));
    }
    return;
  };

  const handleLike = async (blogObj) => {
    try {
      const blogRequestObj = {
        user: blogObj.user.id,
        likes: blogObj.likes,
        author: blogObj.author,
        title: blogObj.title,
        url: blogObj.url,
      };
      const updatedBlog = await blogService.updateLike(blogRequestObj, blogObj.id);
      setBlogs(
        blogs.map((blog) =>
          blog.id !== updatedBlog.id
            ? blog
            : {
                ...updatedBlog,
                user: { name: blogObj.user.name, id: blogObj.user.id },
              }
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessage = (messageObj) => {
    setNotificationMessage(messageObj);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };
  return (
    <div>
      {notificationMessage && <NotificationMessage messageObj={notificationMessage} />}
      {!user && <Login handleLogin={handleLogin} />}
      {user && (
        <div>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <CreateBlogForm handleBlogPost={handleBlogPost} />
          </Togglable>
          <h2>Blogs - Welcome {user.name}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <Blogs
            blogs={blogs}
            handleLike={handleLike}
            user={user}
            handleBlogDelete={handleBlogDelete}
          />
        </div>
      )}
    </div>
  );
};

export default App;
