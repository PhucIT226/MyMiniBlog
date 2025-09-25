const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.BASE_URL;

app.use(express.json());
app.use(cors());
connection();

app.use("/api/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
