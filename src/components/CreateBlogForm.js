import { useState } from "react";
const CreateBlogForm = ({ handleBlogPost }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (event) => {
    event.preventDefault();
    const newBlogObj = {
      title,
      author,
      url,
    };
    handleBlogPost(newBlogObj);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title: {""}
          <input
            id="blogTitle"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author: {""}
          <input
            id="blogAuthor"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL: {""}
          <input
            id="blogUrl"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button id="createBtn">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
