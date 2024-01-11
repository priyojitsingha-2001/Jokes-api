const express = require('express');
const mongoose = require('mongoose');
const jokeRouter = require('./routes/joke.routes')
require('dotenv').config()

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

const app = express();

app.use(express.json());// parsing JSON bodies
app.use(express.urlencoded({ extended: true }));// parsing URL-encoded bodies

//connecting to database
mongoose.connect(`${dbUrl}/jokesdb`)
    .then(() => {
        console.log("Connected to db");
        app.listen(port, () => console.log("Server running at PORT:3000"));
    })
    .catch(err => console.log(err.message));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to jokeapi" });
});

app.use('/jokes', jokeRouter);