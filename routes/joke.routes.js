const express = require('express');
const router = express.Router();
const { handleGetRandomJoke, handleGetJokesByType, handlegetJokeById, handleCreateNewJoke, handleUpdateJoke, handlePartialUpdateJoke, handleDeleteJoke } = require('../controllers/joke.controller');

//GET a random joke
router.get('/random', handleGetRandomJoke);

//GEt all jokes by type
router.get('/filter', handleGetJokesByType)

//GET a joke by id
router.get('/:id', handlegetJokeById);

//POST a new joke
router.post('/', handleCreateNewJoke);

//PUT a joke
router.put('/:id', handleUpdateJoke);

//PATCH a joke
router.patch('/:id', handlePartialUpdateJoke);

//DELETE or update a joke
router.delete('/:id', handleDeleteJoke);

module.exports = router;