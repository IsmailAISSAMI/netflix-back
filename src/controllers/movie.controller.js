const Movie = require("../models/movie.model");

exports.createMovie = (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    image: req.body.image,
    trailer: req.body.trailer,
    maturityRating: req.body.maturityRating,
    language: req.body.language,
    duration: req.body.duration,
    description: req.body.description,
    releaseDate: req.body.releaseDate,
    director: req.body.director,
    scriptwriter: req.body.scriptwriter,
    distribution: req.body.distribution,
    categories: req.body.categories,
  });

  movie
    .save()
    .then((data) => {
      res.send({ movie: data });
    })
    .catch((err) => {
      console.error(error);
      res.status(500).send({
        error: 500,
        message: err.message || "[X] Some error occurred while adding a new movie!",
      });
    });
};

exports.getMovie = (req, res) => {
  Movie.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Movie with id ${req.params.id} was not found !` });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.getMovies = (req, res) => {
  Movie.find()
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Movie with id ${req.params.id} was not found !` });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.updateMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.movie.id, req.body, { new: true })
    .then((data) => {
      res.send({ movie: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.removeOne = (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Movie with id ${req.params.id} was not found !` });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};
