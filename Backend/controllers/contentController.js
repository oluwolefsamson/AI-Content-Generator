const axios = require("axios");
const GeneratedContent = require("../models/GeneratedContent");

// Generate dynamic content using Hugging Face API
const generateDynamicContent = async (req, res) => {
  const { input } = req.body;

  // Validate input
  if (!input) {
    return res
      .status(400)
      .json({ success: false, message: "Input is required." });
  }

  try {
    // Call Hugging Face API
    const apiResponse = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      { inputs: input },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`, // Use environment variable for the token
        },
      }
    );

    // Extract generated text
    const generatedText = apiResponse.data[0]?.generated_text;

    if (!generatedText) {
      throw new Error("No text generated.");
    }

    // Save to MongoDB
    const newContent = new GeneratedContent({ input, content: generatedText });
    await newContent.save();

    res.status(200).json({
      success: true,
      data: generatedText,
    });
  } catch (error) {
    console.error("Error generating content:", error.message);

    const errorResponse = error.response?.data || {
      message: error.message,
    };

    res.status(500).json({
      success: false,
      message: "Failed to generate content.",
      error: errorResponse,
    });
  }
};

// Get all generated content
const getAllGeneratedContent = async (req, res) => {
  try {
    const contents = await GeneratedContent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contents });
  } catch (error) {
    console.error("Error fetching content:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch content.",
    });
  }
};

module.exports = { generateDynamicContent, getAllGeneratedContent };
