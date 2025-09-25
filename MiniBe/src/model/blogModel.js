const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
