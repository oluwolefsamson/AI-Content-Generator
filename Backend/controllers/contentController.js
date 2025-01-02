const axios = require("axios");
const GeneratedContent = require("../models/GeneratedContent");

// Generate dynamic content using Hugging Face API
const generateDynamicContent = async (req, res) => {
  const { specialty } = req.body;

  // Validate specialty
  if (!specialty) {
    return res.status(400).json({
      success: false,
      message: "Specialty is required.",
    });
  }

  const specialties = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Cybersecurity",
    "UI/UX Design",
    "Graphics Design",
  ];

  if (!specialties.includes(specialty)) {
    return res.status(400).json({
      success: false,
      message: "Invalid specialty provided.",
    });
  }

  try {
    // Structured prompt for better content generation with randomness
    const randomTopics = [
      "trends",
      "challenges",
      "best practices",
      "emerging technologies",
      "key tools",
      "future of",
      "impact on industry",
      "tech",
      "designs",
      "development",
      "data",
      "security",
      "innovation",
      "solutions",
    ];

    // Randomly select one of the topics for variation
    const randomTopic =
      randomTopics[Math.floor(Math.random() * randomTopics.length)];
    const specialtyPrompt = `Generate a short, 150-word paragraph about ${specialty} with a focus on ${randomTopic}. Please ensure the content ends at the first full stop (period). Keep the language clear, professional, and inspiring. Avoid jargon and aim for a complete thought within a single sentence.`;

    // Call Hugging Face API
    const apiResponse = await axios.post(
      `${process.env.VITE_HUGGINGFACE_MODEL_URL}`,
      { inputs: specialtyPrompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        },
      }
    );

    const generatedText = apiResponse.data[0]?.generated_text;

    if (!generatedText) {
      throw new Error("No content generated by the API.");
    }

    // Remove the prompt from the generated content
    const contentWithoutPrompt = generatedText
      .replace(specialtyPrompt, "")
      .trim();

    // Now, stop at the first period
    const stopAtPeriod = contentWithoutPrompt.split(".")[0] + ".";

    // Post-process to clean up unwanted parts
    const cleanedText = stopAtPeriod
      .replace(/[^a-zA-Z0-9 . , ']/g, "") // Remove special characters
      .trim(); // Ensure no leading/trailing spaces

    // Save to MongoDB
    const newContent = new GeneratedContent({
      specialty,
      content: cleanedText,
    });
    await newContent.save();

    // Only return the generated content (without showing the prompt)
    res.status(200).json({
      success: true,
      data: cleanedText, // Only send back the generated content
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
