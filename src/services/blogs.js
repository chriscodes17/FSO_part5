import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlogObj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlogObj, config);
  return response.data;
};

const updateLike = async (blogObj, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObj);
  return response.data;
};

const removeBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, setToken, createBlog, updateLike, removeBlog };
