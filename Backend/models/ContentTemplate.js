const mongoose = require("mongoose");

const contentTemplateSchema = new mongoose.Schema({
  specialty: {
    type: String,
    required: true,
    enum: ["Healthcare", "Technology", "Education", "Finance", "Other"],
  },
  template: {
    type: String,
    required: true, // Content template with placeholders like {username}, {organization}
  },
});

module.exports = mongoose.model("ContentTemplate", contentTemplateSchema);
