const express = require("express");
const {
  generateDynamicContent,
  getAllGeneratedContent,
} = require("../controllers/contentController");

const router = express.Router();

// Route to generate content
router.post("/generate", generateDynamicContent);

// Route to get all generated content
router.get("/", getAllGeneratedContent);

module.exports = router;
