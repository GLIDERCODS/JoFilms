const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  images: {
    type: String, // Assuming you store image URLs
    required: true,
  },
  // Add any other fields relevant to the portfolio

});

module.exports = mongoose.model("Portfolio", portfolioSchema);
