const Joke = require('../models/joke.model');

module.exports = {
    handleGetRandomJoke: async (req, res) => {
        try {
            const response = await Joke.find({});
            const data = response.map(joke => joke.toJSON());
            const random = Math.floor(Math.random() * data.length);
            res.json(data[random]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    handleGetJokesByType: async (req, res) => {
        try {
            const jokeType = req.query.type;
            //validation    
            if (!jokeType)
                return res.status(400).json({ error: "Missing type parameter in the request" });
            const jokes = await Joke.find({ "jokeType": jokeType });
            res.json(jokes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    handlegetJokeById: async (req, res) => {
        try {
            const joke = await Joke.findById(req.params.id);
            if (!joke) return res.status(404).json({ error: "Joke not found" });
            res.json(joke);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    handleCreateNewJoke: async (req, res) => {
        try {
            const newJoke = new Joke({
                jokeText: req.body.jokeText,
                jokeType: req.body.jokeType
            });
            const joke = await newJoke.save();
            res.json(joke);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    handleUpdateJoke: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            const jokeToUpdate = await Joke.findById(id);
            if (!jokeToUpdate)
                return res.status(404).json({ message: "Joke not found" });
            jokeToUpdate.set(newData);
            const updatedJoke = await jokeToUpdate.save();
            res.json(updatedJoke);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    handlePartialUpdateJoke: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            const jokeToUpdate = await Joke.findById(id);
            if (!jokeToUpdate)
                return res.status(404).json({ error: 'Joke not found' });
            Object.assign(jokeToUpdate, newData);// Merge properties from newData into jokeToUpdate
            const updatedJoke = await jokeToUpdate.save();
            res.json(updatedJoke);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    handleDeleteJoke: async (req, res) => {
        try {
            const joke = await Joke.findById(req.params.id);
            if (!joke)
                return res.status(404).json({ error: 'Joke not found' });
            const deletedJoke = await Joke.deleteOne({ _id: `${req.params.id}` });
            res.json(deletedJoke);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


}