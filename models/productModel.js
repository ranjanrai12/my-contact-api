const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the product name"],
    },
    description: {
      type: String,
      required: [true, "Please add the description"],
    },
    price: {
      type: String,
      required: [true, "Please add the price"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
