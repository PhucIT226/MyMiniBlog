const Blog = require("../model/blogModel");

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const postBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await new Blog({ title, content });
    await newPost.save();
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.json(200);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getBlog,
  postBlog,
  deleteBlog,
};
