import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPosts, deletePosts } from "./redux/features/postSlice";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAdd = () => {
    if (title && content) {
      dispatch(addPosts({ title, content }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(90deg, #74ebd5, #ACB6E5)",
      }}
    >
      <div className="container">
        <h1 className="text-center mb-5 text-white">Mini Blog</h1>

        <div
          className="card mb-5 shadow"
          style={{ backgroundColor: "#ffffffcc" }}
        >
          <div className="card-body">
            <h5 className="card-title mb-3">Create a New Post</h5>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Content..."
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAdd}>
              Add Post
            </button>
          </div>
        </div>

        {/* List of Posts */}
        <div className="row">
          {posts.length === 0 ? (
            <p className="text-center text-light">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="col-md-6 mb-4">
                <div
                  className="card h-100 shadow"
                  style={{ backgroundColor: "#ffffffcc" }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text flex-grow-1">{post.content}</p>
                    <button
                      className="btn btn-outline-danger mt-2 align-self-start"
                      onClick={() => dispatch(deletePosts(post._id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
