import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await axios.get(`${API_URL}/blog/getBlog`);
  return res.data;
});
export const addPosts = createAsyncThunk("posts/add", async (post) => {
  const res = await axios.post(`${API_URL}/blog/postBlog`, post);
  return res.data;
});
export const deletePosts = createAsyncThunk("posts/delete", async (id) => {
  await axios.delete(`${API_URL}/blog/deleteBlog/${id}`);
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
