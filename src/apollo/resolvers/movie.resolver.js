const Movie = require("../../models/movie.model");

module.exports = {
  Query: {
    getMovie(parent, args, context) {
      return Movie.findById(args.id).populate("categories");
    },
    getMovies: () => {
      return Movie.find().populate("categories");
    },
  },
  Mutation: {
    createMovie(parent, args) {
      const newMovie = new Movie({
        title: args.title,
        image: args.image,
        trailer: args.trailer,
        maturityRating: args.maturityRating,
        language: args.language,
        duration: args.duration,
        description: args.description,
        releaseDate: args.releaseDate,
        director: args.director,
        distribution: args.distribution,
        scriptwriter: args.scriptwriter,
        categories: args.categories,
      });
      return newMovie.save();
    },
    updateMovie(
      parent,
      {
        id,
        title,
        description,
        image,
        trailer,
        maturityRating,
        language,
        releaseDate,
        duration,
        director,
        distribution,
        scriptwriter,
        categories,
      }
    ) {
      return Movie.findByIdAndUpdate(id, {
        title: title,
        image: image,
        trailer: trailer,
        description: description,
        maturityRating: maturityRating,
        language: language,
        releaseDate: releaseDate,
        duration: duration,
        director: director,
        distribution: distribution,
        scriptwriter: scriptwriter,
        categories: categories,
      });
    },
  },
};
