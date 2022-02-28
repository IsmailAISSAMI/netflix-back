const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  image: String,
  trailer: String,
  maturityRating: Number,
  language: String,
  duration: String,
  description: String,
  releaseDate: String,
  director: String,
  scriptwriter: String,
  distribution: String,
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
