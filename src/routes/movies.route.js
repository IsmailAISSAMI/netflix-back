const express = require('express');
const router = express.Router();
const movie = require('../controllers/movie.controller');

router.get('/movie/:id', movie.getMovie);
router.get('/getMovies/', movie.getMovies);
router.post('/createMovie', movie.createMovie);
router.post('/edit/:id', movie.updateMovie);
router.delete('/delete/:id', movie.removeOne);

module.exports = router;