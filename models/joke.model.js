const mongoose = require('mongoose');
const jokesSchema = new mongoose.Schema({
    jokeText: {
        type: String,
        required: true
    },
    jokeType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Joke', jokesSchema);