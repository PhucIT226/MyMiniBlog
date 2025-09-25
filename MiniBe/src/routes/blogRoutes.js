const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

router.get("/getBlog", blogController.getBlog);
router.post("/postBlog", blogController.postBlog);
router.delete("/deleteBlog/:id", blogController.deleteBlog);

module.exports = router;
