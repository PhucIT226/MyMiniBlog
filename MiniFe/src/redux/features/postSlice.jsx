import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await axios.get("http://localhost:8080/api/blog/getBlog");
  return res.data;
});
export const addPosts = createAsyncThunk("posts/add", async (post) => {
  const res = await axios.post("http://localhost:8080/api/blog/postBlog", post);
  return res.data;
});
export const deletePosts = createAsyncThunk("posts/delete", async (id) => {
  await axios.delete(`http://localhost:8080/api/blog/deleteBlog/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post._id !== action.payload);
      });
  },
});
export default postsSlice.reducer;
